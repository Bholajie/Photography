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