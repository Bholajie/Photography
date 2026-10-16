import { NextResponse } from "next/server"
import { z } from "zod"
import {
  DEFAULT_ADDITIONAL_FEES,
  DEFAULT_DELIVERY_FEES,
  type AdditionalFees,
  type DeliveryFees,
} from "@/lib/types"
import { getDefaultPackages } from "@/lib/packages"
import { getPricingConfig, updatePricingConfig } from "@/lib/pricing"
import { isValidPricingAdminToken, PRICING_ADMIN_COOKIE } from "@/lib/pricing-auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const pricingUpdateSchema = z.object({
  packagePrices: z.record(z.string(), z.number().int().min(0).max(100_000_000)).optional(),
  deliveryFees: z.record(z.string(), z.number().int().min(0).max(100_000_000)).optional(),
  additionalFees: z.record(z.string(), z.number().int().min(0).max(100_000_000)).optional(),
}).refine((value) => value.packagePrices || value.deliveryFees || value.additionalFees, {
  message: "At least one pricing section is required",
})

const packageIds = new Set(getDefaultPackages().map((pkg) => pkg.id))
const deliveryFeeIds = new Set(Object.keys(DEFAULT_DELIVERY_FEES))
const additionalFeeIds = new Set(Object.keys(DEFAULT_ADDITIONAL_FEES))

function hasOnlyKnownKeys(values: Record<string, number>, allowedKeys: Set<string>) {
  return Object.keys(values).every((key) => allowedKeys.has(key))
}

function isAdmin(request: Request) {
  const token = request.headers.get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${PRICING_ADMIN_COOKIE}=`))
    ?.slice(PRICING_ADMIN_COOKIE.length + 1)

  return isValidPricingAdminToken(token)
}

export async function GET() {
  const pricing = await getPricingConfig()
  return NextResponse.json(pricing, {
    headers: { "Cache-Control": "no-store" },
  })
}

export async function PUT(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "You are not authorized to update pricing." }, { status: 401 })
  }

  try {
    const body = await request.json()
    const result = pricingUpdateSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid pricing data", details: result.error.flatten() },
        { status: 400 }
      )
    }

    const {
      packagePrices = {},
      deliveryFees: submittedDeliveryFees = {},
      additionalFees: submittedAdditionalFees = {},
    } = result.data
    if (
      !hasOnlyKnownKeys(packagePrices, packageIds) ||
      !hasOnlyKnownKeys(submittedDeliveryFees, deliveryFeeIds) ||
      !hasOnlyKnownKeys(submittedAdditionalFees, additionalFeeIds)
    ) {
      return NextResponse.json({ error: "Pricing contains an unknown package or delivery area." }, { status: 400 })
    }

    const current = await getPricingConfig()
    const currentPackagePrices = Object.fromEntries(current.packages.map((pkg) => [pkg.id, pkg.price]))
    const mergedDeliveryFees = {
      ...current.deliveryFees,
      ...submittedDeliveryFees,
    } as DeliveryFees
    const mergedAdditionalFees = {
      ...current.additionalFees,
      ...submittedAdditionalFees,
    } as AdditionalFees

    const pricing = await updatePricingConfig({
      packagePrices: { ...currentPackagePrices, ...packagePrices },
      deliveryFees: mergedDeliveryFees,
      additionalFees: mergedAdditionalFees,
    })

    return NextResponse.json(pricing, {
      headers: { "Cache-Control": "no-store" },
    })
  } catch (error) {
    console.error("Pricing update error:", error)
    return NextResponse.json({ error: "Unable to save pricing right now." }, { status: 500 })
  }
}
