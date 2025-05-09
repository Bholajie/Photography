import { PackageType } from "./types";

// This would be replaced with MongoDB data in a real implementation
export async function getPackages(): Promise<PackageType[]> {
  return [
    {
      id: "basic",
      name: "Essential",
      price: 299,
      priceSuffix: "/session",
      duration: "1 hour",
      shortDescription: "Perfect for individuals or couples",
      features: [
        "1-hour photo session",
        "1 location",
        "Professional editing",
        "15 digital images",
        "Online gallery",
        "Print release"
      ],
      image: "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg"
    },
    {
      id: "standard",
      name: "Premium",
      price: 499,
      priceSuffix: "/session",
      duration: "2 hours",
      shortDescription: "Ideal for families or extended sessions",
      features: [
        "2-hour photo session",
        "2 locations",
        "Professional editing",
        "30 digital images",
        "Online gallery",
        "Print release",
        "5 professional prints"
      ],
      image: "https://images.pexels.com/photos/16170/pexels-photo.jpg"
    },
    {
      id: "deluxe",
      name: "Luxury",
      price: 899,
      priceSuffix: "/session",
      duration: "4 hours",
      shortDescription: "Complete package for special occasions",
      features: [
        "4-hour photo session",
        "Multiple locations",
        "Professional editing",
        "All digital images (50+)",
        "Online gallery",
        "Print release",
        "10 professional prints",
        "Custom photo album"
      ],
      image: "https://images.pexels.com/photos/3726314/pexels-photo-3726314.jpeg"
    }
  ];
}