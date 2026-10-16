export interface GalleryCategoryType {
  id: string
  slug: string
  name: string
  description: string
  coverImage: string
}

export interface GalleryImageType {
  id: string
  url: string
  alt?: string
  caption?: string
  aspectRatio: "square" | "portrait" | "landscape"
}

export interface GalleryType {
  id: string
  slug: string
  name: string
  description: string
  images: GalleryImageType[]
}

export interface PackageType {
  id: string
  name: string
  price: number
  priceSuffix: string
  duration: string
  shortDescription: string
  features: string[]
  image: string
}

export type DeliveryFeeId =
  | "outdoor-mainland"
  | "outdoor-ikoyi-lekki"
  | "outdoor-lekki2-ajah"
  | "home-mainland"
  | "home-vi-ikoyi"
  | "home-lekki-lekki2"

export type DeliveryFees = Record<DeliveryFeeId, number>

export type AdditionalFeeId =
  | "express"
  | "express-delivery"
  | "extra-selections"
  | "lateness-fee"
  | "photobook-30"
  | "photobook-40"
  | "frame"
  | "flash-drive"
  | "drone"

export type AdditionalFees = Record<AdditionalFeeId, number>

export interface PricingConfig {
  packages: PackageType[]
  deliveryFees: DeliveryFees
  additionalFees: AdditionalFees
  updatedAt?: string
}

export const DEFAULT_DELIVERY_FEES: DeliveryFees = {
  "outdoor-mainland": 40000,
  "outdoor-ikoyi-lekki": 50000,
  "outdoor-lekki2-ajah": 70000,
  "home-mainland": 70000,
  "home-vi-ikoyi": 85000,
  "home-lekki-lekki2": 105000,
}

export const DEFAULT_ADDITIONAL_FEES: AdditionalFees = {
  express: 35000,
  "express-delivery": 15000,
  "extra-selections": 15000,
  "lateness-fee": 10000,
  "photobook-30": 150000,
  "photobook-40": 180000,
  frame: 35000,
  "flash-drive": 15000,
  drone: 100000,
}
