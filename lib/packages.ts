import { PackageType } from "./types";

// This would be replaced with MongoDB data in a real implementation
export async function getPackages(): Promise<PackageType[]> {
  return [
    // Portrait Packages
    {
      id: "portrait",
      name: "Portrait Session",
      price: 85000,
      priceSuffix: " per outfit",
      duration: "2 Working days",
      shortDescription: "Professional portrait photography at SHEYILOR STUDIO (Available between 9am - 5pm)",
      features: [
        "Location: SHEYILOR STUDIO",
        "4 images per outfit",
        "Professional editing",
        "2 working days delivery",
        "Online gallery",
        "Available between 9am - 5pm",
        "Logistics fee applies based on location"
      ],
      image: "/images/CelebrityPortraits/SHEY6090.jpg"
    },
    {
      id: "family-portrait",
      name: "Family/Group Portrait",
      price: 105000,
      priceSuffix: " per outfit",
      duration: "2 Working days",
      shortDescription: "Perfect for family and group portraits at SHEYILOR STUDIO (Available between 9am - 5pm)",
      features: [
        "Location: SHEYILOR STUDIO",
        "5 images total per outfit",
        "Professional editing",
        "2 working days delivery",
        "Online gallery",
        "Available between 9am - 5pm",
        "Logistics fee applies based on location"
      ],
      image: "/images/FamilyPortrait/SHEY7165.jpg"
    },
    {
      id: "fashion-collection",
      name: "Fashion Collection Shoot",
      price: 25000,
      priceSuffix: " per outfit",
      duration: "2 Working days",
      shortDescription: "Professional fashion photography for 10+ outfits at client's location",
      features: [
        "Location: Client's location",
        "3 images per outfit",
        "Minimum 10 outfits",
        "Professional editing",
        "2 working days delivery",
        "Extra images: ₦10,000 per extra",
        "Online gallery",
        "Logistics fee applies based on location"
      ],
      image: "/images/FashionCollection/SHEY5991.jpg"
    },
    // Event Photography Packages
    {
      id: "event-quarter",
      name: "Quarter Day Event",
      price: 300000,
      priceSuffix: " (Less Logistics)",
      duration: "4 Working days",
      shortDescription: "1-4 hours of event coverage (Available between 8am - 7pm)",
      features: [
        "Location: Client's location",
        "100-120 images",
        "4 working days delivery",
        "Available between 8am - 7pm",
        "Online gallery",
        "Logistics fee applies based on location"
      ],
      image: "/images/EventsCandids/SHEY2656.jpg"
    },
    {
      id: "event-half",
      name: "Half Day Event",
      price: 450000,
      priceSuffix: " (Less Logistics)",
      duration: "4 Working days",
      shortDescription: "6 hours of event coverage (Available between 8am - 7pm)",
      features: [
        "Location: Client's location",
        "150-200 images",
        "4 professional retouched images",
        "4 working days delivery",
        "Available between 8am - 7pm",
        "Online gallery",
        "Logistics fee applies based on location"
      ],
      image: "/images/EventsCandids/SHEY0859.jpg"
    },
    {
      id: "event-full",
      name: "Full Day Event",
      price: 600000,
      priceSuffix: " (Less Logistics)",
      duration: "4 Working days",
      shortDescription: "8 hours of event coverage (Available between 8am - 7pm)",
      features: [
        "Location: Client's location",
        "200-300 images",
        "8 professional retouched images",
        "4 working days delivery",
        "Available between 8am - 7pm",
        "Online gallery",
        "Logistics fee applies based on location"
      ],
      image: "/images/EventsCandids/SHEY2940.jpg"
    },
    // Event Photo + Video Packages
    {
      id: "event-video-basic",
      name: "Basic Photo + Video",
      price: 500000,
      priceSuffix: " (Less Logistics)",
      duration: "4 Working days",
      shortDescription: "1-4 hours of photo and video coverage",
      features: [
        "Location: Client's location",
        "100-120 images",
        "HD Video Coverage (All event)",
        "5 minutes Video trailer",
        "Fully Captioned and Edited",
        "Delivered in a flash drive",
        "Logistics fee applies based on location"
      ],
      image: "/images/EventsCandids/SHEY6136.jpg"
    },
    {
      id: "event-video-classic",
      name: "Classic Photo + Video",
      price: 650000,
      priceSuffix: " (Less Logistics)",
      duration: "4 Working days",
      shortDescription: "5-6 hours of photo and video coverage",
      features: [
        "Location: Client's location",
        "100-120 images",
        "8 professional retouched images",
        "HD Video Coverage (All event)",
        "5 minutes Video trailer",
        "Fully Captioned and Edited",
        "Delivered in a flash drive",
        "Logistics fee applies based on location"
      ],
      image: "/images/EventsCandids/SHEY8454.jpg"
    },
    {
      id: "event-video-deluxe",
      name: "Deluxe Photo + Video",
      price: 700000,
      priceSuffix: " (Less Logistics)",
      duration: "4 Working days",
      shortDescription: "7-8 hours of photo and video coverage",
      features: [
        "Location: Client's location",
        "200-220 images",
        "8 professional retouched images",
        "HD Video Coverage (All event)",
        "5 minutes Video trailer",
        "Fully Captioned and Edited",
        "Delivered in a flash drive",
        "Logistics fee applies based on location"
      ],
      image: "/images/EventsCandids/SHEY2656.jpg"
    },
    // Training Programs
    {
      id: "training-full",
      name: "6 Weeks Full Photography Training",
      price: 350000,
      priceSuffix: "",
      duration: "6 Weeks",
      shortDescription: "Complete photography training program",
      features: [
        "Photography Basics & Techniques",
        "Photo Editing & High-End Retouching",
        "Branding & Instagram Packaging",
        "Field Experience (Practical Shoots)",
        "Perfect for building a photography business"
      ],
      image: "/images/FashionCollection/SHEY1418.jpg"
    },
    {
      id: "training-intensive",
      name: "4 Weeks Intensive Training",
      price: 250000,
      priceSuffix: "",
      duration: "4 Weeks",
      shortDescription: "Intensive photography training program",
      features: [
        "Photography Basics",
        "Camera Handling Techniques",
        "Photo Editing",
        "Field Experience (On-location practice)",
        "Ideal for beginners"
      ],
      image: "/images/FashionCollection/SHEY4400.jpg"
    },
    {
      id: "training-editing",
      name: "2-Day Editing Masterclass",
      price: 75000,
      priceSuffix: "",
      duration: "2 Days",
      shortDescription: "Professional photo editing training",
      features: [
        "High-End Retouching Workflow",
        "Editing Tips & Tricks",
        "Professional Results",
        "Perfect for upgrading retouching skills"
      ],
      image: "/images/FashionCollection/SHEY7480.jpg"
    },
    {
      id: "training-lighting",
      name: "2-Day Lighting Masterclass",
      price: 150000,
      priceSuffix: "",
      duration: "2 Days",
      shortDescription: "1-on-1 lighting training program",
      features: [
        "Personal Lighting Coaching",
        "In-depth Lighting Techniques",
        "Setup Breakdown",
        "Tailored for mastering lighting control"
      ],
      image: "/images/FashionCollection/SHEY6044.jpg"
    },
    {
      id: "convocation",
      name: "Convocation Session",
      price: 50000,
      priceSuffix: " per outfit",
      duration: "2 Working days",
      shortDescription: "Professional convocation photography at SHEYILOR STUDIO",
      features: [
        "Location: SHEYILOR STUDIO",
        "4 images per outfit",
        "Professional editing",
        "2 working days delivery",
        "Online gallery",
        "Available between 9am - 5pm",
        "Logistics fee applies based on location"
      ],
      image: "/images/Convocation/SHEY6382.jpg"
    }
  ];
}