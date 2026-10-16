import { MongoClient, type Db } from "mongodb"
import {
  DEFAULT_ADDITIONAL_FEES,
  DEFAULT_DELIVERY_FEES,
  type AdditionalFees,
  type DeliveryFees,
  type PackageType,
  type PricingConfig,
} from "./types"
import { getDefaultPackages } from "./packages"

const PRICING_DOCUMENT_KEY = "booking-pricing"
const PRICING_COLLECTION = "site_settings"

interface PricingRecord {
  key: string
  packagePrices?: Record<string, number>
  deliveryFees?: Partial<DeliveryFees>
  additionalFees?: Partial<AdditionalFees>
  updatedAt?: Date
}

declare global {
  // eslint-disable-next-line no-var
  var __photographyMongoClient: MongoClient | undefined
  // eslint-disable-next-line no-var
  var __photographyMongoClientPromise: Promise<MongoClient> | undefined
}

function getMongoUri() {
  return process.env.MONGODB_URI || process.env.mongo_url
}

async function getDatabase(): Promise<Db | null> {
  const uri = getMongoUri()
  if (!uri) return null

  if (!globalThis.__photographyMongoClientPromise) {
    globalThis.__photographyMongoClient = new MongoClient(uri)
    globalThis.__photographyMongoClientPromise = globalThis.__photographyMongoClient.connect()
  }

  const client = await globalThis.__photographyMongoClientPromise
  return client.db(process.env.MONGODB_DB || "sheyilor-photography")
}

function getDefaultPriceMap() {
  return Object.fromEntries(getDefaultPackages().map((pkg) => [pkg.id, pkg.price]))
}

function mergePricing(record?: PricingRecord | null): PricingConfig {
  const packagePrices = {
    ...getDefaultPriceMap(),
    ...(record?.packagePrices || {}),
  }

  const packages = getDefaultPackages().map((pkg) => ({
    ...pkg,
    price: packagePrices[pkg.id] ?? pkg.price,
  }))

  const deliveryFees = {
    ...DEFAULT_DELIVERY_FEES,
    ...(record?.deliveryFees || {}),
  } as DeliveryFees

  const additionalFees = {
    ...DEFAULT_ADDITIONAL_FEES,
    ...(record?.additionalFees || {}),
  } as AdditionalFees

  return {
    packages,
    deliveryFees,
    additionalFees,
    updatedAt: record?.updatedAt?.toISOString(),
  }
}

async function getPricingRecord() {
  const db = await getDatabase()
  if (!db) return null

  return db
    .collection<PricingRecord>(PRICING_COLLECTION)
    .findOne({ key: PRICING_DOCUMENT_KEY })
}

export async function getPricingConfig(): Promise<PricingConfig> {
  try {
    return mergePricing(await getPricingRecord())
  } catch (error) {
    // The public booking page should remain usable if MongoDB is temporarily
    // unavailable. Updates still fail loudly so an admin never gets a false
    // success response.
    console.error("Unable to load booking pricing from MongoDB:", error)
    return mergePricing()
  }
}

export async function updatePricingConfig(input: {
  packagePrices: Record<string, number>
  deliveryFees: DeliveryFees
  additionalFees: AdditionalFees
}): Promise<PricingConfig> {
  const db = await getDatabase()
  if (!db) {
    throw new Error("MongoDB is not configured. Set MONGODB_URI before saving prices.")
  }

  const current = mergePricing(await getPricingRecord())
  const packagePrices = Object.fromEntries(
    current.packages.map((pkg) => [pkg.id, input.packagePrices[pkg.id] ?? pkg.price])
  )

  await db.collection<PricingRecord>(PRICING_COLLECTION).updateOne(
    { key: PRICING_DOCUMENT_KEY },
    {
      $set: {
        packagePrices,
        deliveryFees: input.deliveryFees,
        additionalFees: input.additionalFees,
        updatedAt: new Date(),
      },
      $setOnInsert: { key: PRICING_DOCUMENT_KEY },
    },
    { upsert: true }
  )

  return mergePricing({
    key: PRICING_DOCUMENT_KEY,
    packagePrices,
    deliveryFees: input.deliveryFees,
    additionalFees: input.additionalFees,
    updatedAt: new Date(),
  })
}
