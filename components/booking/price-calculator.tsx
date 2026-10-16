import { AdditionalFees, DeliveryFees, PackageType } from "@/lib/types"
import { isLocationBasedPackage, isPerOutfitPackage } from "@/lib/packages"

interface PriceCalculatorProps {
  selectedPackage: PackageType | null
  deliveryFees: DeliveryFees
  additionalFees: AdditionalFees
  numberOfOutfits: number
  locationType: string
  location: string
  additionalOptions: string[]
}

export default function PriceCalculator({
  selectedPackage,
  deliveryFees,
  additionalFees,
  numberOfOutfits,
  locationType,
  location,
  additionalOptions
}: PriceCalculatorProps) {
  if (!selectedPackage) return null

  const getLogisticsFee = (location: string) => {
    switch (location) {
      case "mainland":
        return deliveryFees["outdoor-mainland"]
      case "ikoyi-lekki":
        return deliveryFees["outdoor-ikoyi-lekki"]
      case "lekki2-ajah":
        return deliveryFees["outdoor-lekki2-ajah"]
      default:
        return 0
    }
  }

  const getHomeServiceFee = (location: string) => {
    switch (location) {
      case "mainland":
        return deliveryFees["home-mainland"]
      case "vi-ikoyi":
        return deliveryFees["home-vi-ikoyi"]
      case "lekki-lekki2":
        return deliveryFees["home-lekki-lekki2"]
      default:
        return 0
    }
  }

  const getAdditionalOptionPrice = (option: string): { label: string; price: number } => {
    if (option === "express") return { label: "Express Service", price: additionalFees.express }
    if (option === "express-delivery") return { label: "Express Delivery", price: additionalFees["express-delivery"] }
    if (option === "extra-selections") return { label: "Extra Image Selection", price: additionalFees["extra-selections"] }
    if (option === "lateness-fee") return { label: "Lateness Fee", price: additionalFees["lateness-fee"] }
    if (option === "photobook-30") return { label: "Photobook 30 pages", price: additionalFees["photobook-30"] }
    if (option === "photobook-40") return { label: "Photobook 40 pages", price: additionalFees["photobook-40"] }
    if (option === "frame") return { label: "Large Fibre Frame", price: additionalFees.frame }
    if (option === "flash-drive") return { label: "Extra Flash Drive", price: additionalFees["flash-drive"] }
    if (option === "drone") return { label: "Drone Coverage", price: additionalFees.drone }
    return { label: option, price: 0 }
  }

  const calculateAdditionalOptionsCost = (options: string[]) => {
    return options.map(option => getAdditionalOptionPrice(option))
  }

  const isLocationBased = isLocationBasedPackage(selectedPackage.id)
  const isPerOutfit = isPerOutfitPackage(selectedPackage.id)

  const isEventPackage = selectedPackage.id.startsWith("event-")

  const basePrice = isPerOutfit
    ? selectedPackage.price * numberOfOutfits 
    : selectedPackage.price

  const locationFee = (isLocationBased && locationType === "outdoor")
    ? getLogisticsFee(location)
    : (isLocationBased && locationType === "home")
    ? getHomeServiceFee(location)
    : (isEventPackage && location)
    ? getLogisticsFee(location)
    : 0

  const additionalOptionsDetails = calculateAdditionalOptionsCost(additionalOptions)
  const additionalCost = additionalOptionsDetails.reduce((sum, option) => sum + option.price, 0)
  const totalPrice = basePrice + locationFee + additionalCost

  return (
    <div className="bg-accent/5 p-4 rounded-lg space-y-2">
      <h3 className="font-medium mb-2">Price Breakdown</h3>
      <div className="text-sm space-y-1">
        {isPerOutfit ? (
          <p>Base Price ({numberOfOutfits} {numberOfOutfits === 1 ? 'outfit' : 'outfits'}): ₦{basePrice.toLocaleString()}</p>
        ) : (
          <p>Base Price: ₦{basePrice.toLocaleString()}</p>
        )}
        {locationFee > 0 && (
          <p>
            {isLocationBased
              ? (locationType === "outdoor" ? "Logistics Fee" : "Home Service Fee")
              : "Logistics Fee"
            }: ₦{locationFee.toLocaleString()}
          </p>
        )}
        {additionalOptionsDetails.length > 0 && (
          <>
            <p className="font-medium mt-2">Additional Options:</p>
            <div className="pl-4 space-y-1">
              {additionalOptionsDetails.map((option, index) => (
                <p key={index}>
                  {option.label}: ₦{option.price.toLocaleString()}
                </p>
              ))}
            </div>
          </>
        )}
        <div className="pt-2 border-t border-accent/20">
          <p className="font-medium text-lg">
            Total Cost: ₦{totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
