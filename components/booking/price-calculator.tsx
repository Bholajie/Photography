import { PackageType } from "@/lib/types"

interface PriceCalculatorProps {
  selectedPackage: PackageType | null
  numberOfOutfits: number
  locationType: string
  location: string
  additionalOptions: string[]
}

export default function PriceCalculator({
  selectedPackage,
  numberOfOutfits,
  locationType,
  location,
  additionalOptions
}: PriceCalculatorProps) {
  if (!selectedPackage) return null

  const getLogisticsFee = (location: string) => {
    switch (location) {
      case "mainland":
        return 25000
      case "ikoyi-lekki":
        return 35000
      case "lekki2-ajah":
        return 40000
      default:
        return 0
    }
  }

  const getHomeServiceFee = (location: string) => {
    switch (location) {
      case "mainland":
        return 55000
      case "vi-ikoyi":
        return 85000
      case "lekki-lekki2":
        return 105000
      default:
        return 0
    }
  }

  const getAdditionalOptionPrice = (option: string): { label: string; price: number } => {
    if (option.includes("express")) return { label: "Express Service", price: 20000 }
    if (option.includes("extra-selections")) return { label: "Extra Selections", price: 10000 }
    if (option.includes("photobook-30")) return { label: "Photobook 30 pages", price: 150000 }
    if (option.includes("photobook-40")) return { label: "Photobook 40 pages", price: 180000 }
    if (option.includes("frame")) return { label: "Large Frame", price: 35000 }
    if (option.includes("flash-drive")) return { label: "Extra Flash Drive", price: 10000 }
    if (option.includes("drone")) return { label: "Drone Coverage", price: 100000 }
    return { label: option, price: 0 }
  }

  const calculateAdditionalOptionsCost = (options: string[]) => {
    return options.map(option => getAdditionalOptionPrice(option))
  }

  const isOutfitBasedPackage = selectedPackage.id === "portrait" || 
    selectedPackage.id === "family-portrait" || 
    selectedPackage.id === "fashion-collection"

  const isEventPackage = selectedPackage.id.startsWith("event-")

  const basePrice = isOutfitBasedPackage 
    ? selectedPackage.price * numberOfOutfits 
    : selectedPackage.price

  const locationFee = isOutfitBasedPackage && locationType === "outdoor" 
    ? getLogisticsFee(location)
    : isOutfitBasedPackage && locationType === "home"
    ? getHomeServiceFee(location)
    : 0

  const additionalOptionsDetails = isEventPackage ? calculateAdditionalOptionsCost(additionalOptions) : []
  const additionalCost = additionalOptionsDetails.reduce((sum, option) => sum + option.price, 0)
  const totalPrice = basePrice + locationFee + additionalCost

  return (
    <div className="bg-accent/5 p-4 rounded-lg space-y-2">
      <h3 className="font-medium mb-2">Price Breakdown</h3>
      <div className="text-sm space-y-1">
        {isOutfitBasedPackage ? (
          <p>Base Price ({numberOfOutfits} {numberOfOutfits === 1 ? 'outfit' : 'outfits'}): ₦{basePrice.toLocaleString()}</p>
        ) : (
          <p>Base Price: ₦{basePrice.toLocaleString()}</p>
        )}
        {isOutfitBasedPackage && locationFee > 0 && (
          <p>{locationType === "outdoor" ? "Logistics Fee" : "Home Service Fee"}: ₦{locationFee.toLocaleString()}</p>
        )}
        {isEventPackage && additionalOptionsDetails.length > 0 && (
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
          <p className="font-medium">Total Cost: ₦{totalPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
} 