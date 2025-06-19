import { GalleryCategoryType, GalleryType } from "./types";

// This would be replaced with MongoDB data in a real implementation
export async function getGalleryCategories(): Promise<GalleryCategoryType[]> {
  return [
    {
      id: "fashion",
      slug: "fashion",
      name: "Fashion Collection",
      description: "Professional fashion photography showcasing style and elegance.",
      coverImage: "/images/FashionCollection/SHEY5991.jpg"
    },
    {
      id: "celebrity",
      slug: "celebrity",
      name: "Celebrity Portraits",
      description: "Exclusive celebrity portrait photography capturing star power.",
      coverImage: "/images/CelebrityPortraits/SHEY6090.jpg"
    },
    {
      id: "convocation",
      slug: "convocation",
      name: "Convocation",
      description: "Memorable graduation photography capturing academic achievements.",
      coverImage: "/images/Convocation/SHEY6382.jpg"
    },
    {
      id: "birthday",
      slug: "birthday",
      name: "Birthday Portrait",
      description: "Special birthday portrait sessions celebrating milestones.",
      coverImage: "/images/BirthdayPortrait/SHEY7690.jpg"
    },
    {
      id: "family",
      slug: "family",
      name: "Family Portrait",
      description: "Heartwarming family portraits capturing precious moments.",
      coverImage: "/images/FamilyPortrait/SHEY7165.jpg"
    },
    {
      id: "maternity",
      slug: "maternity",
      name: "Maternity",
      description: "Beautiful maternity photography celebrating motherhood.",
      coverImage: "/images/Maternity/SHEY1801.jpg"
    },
    {
      id: "wedding-portraits",
      slug: "wedding-portraits",
      name: "Wedding Portraits",
      description: "Timeless wedding portraits capturing the joy and love of your special day.",
      coverImage: "/images/WeddingPortraits/SHEY9212_(2)1.jpg"
    },
    {
      id: "pre-wedding-portraits",
      slug: "pre-wedding-portraits",
      name: "Pre Wedding Portraits",
      description: "Romantic pre-wedding portraits to celebrate your journey together.",
      coverImage: "/images/PreWeddingPortraits/SHEY1616.jpg"
    },
    {
      id: "events-candids",
      slug: "events-candids",
      name: "Events Candids",
      description: "Candid event photography capturing genuine moments and emotions.",
      coverImage: "/images/EventsCandids/SHEY2656.jpg"
    }
  ];
}

// This would be replaced with MongoDB data in a real implementation
export async function getGalleryByCategory(slug: string): Promise<GalleryType | null> {
  const galleries: Record<string, GalleryType> = {
    portrait: {
      id: "portrait",
      slug: "portrait",
      name: "Portrait",
      description: "Authentic portrait photography that captures the essence and personality of each individual.",
      images: [
        {
          id: "portrait-1",
          url: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg",
          alt: "Professional portrait of woman in natural light",
          caption: "Natural light portrait session",
          aspectRatio: "portrait"
        },
        {
          id: "portrait-2",
          url: "https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg",
          alt: "Portrait of young woman with flowers",
          aspectRatio: "portrait"
        },
        {
          id: "portrait-3",
          url: "https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg",
          alt: "Black and white portrait",
          caption: "Dramatic studio lighting",
          aspectRatio: "portrait"
        },
        {
          id: "portrait-4",
          url: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
          alt: "Portrait in urban setting",
          aspectRatio: "landscape"
        },
        {
          id: "portrait-5",
          url: "https://images.pexels.com/photos/1832959/pexels-photo-1832959.jpeg",
          alt: "Outdoor senior portrait",
          aspectRatio: "portrait"
        },
        {
          id: "portrait-6",
          url: "https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg",
          alt: "Business professional portrait",
          aspectRatio: "square"
        }
      ]
    },
    wedding: {
      id: "wedding",
      slug: "wedding",
      name: "Wedding",
      description: "Timeless wedding photography capturing the joy, emotion, and unique moments of your special day.",
      images: [
        {
          id: "wedding-1",
          url: "https://images.pexels.com/photos/1488312/pexels-photo-1488312.jpeg",
          alt: "Bride and groom portrait",
          caption: "Sunset ceremony at coastal venue",
          aspectRatio: "landscape"
        },
        {
          id: "wedding-2",
          url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
          alt: "Wedding ceremony",
          aspectRatio: "landscape"
        },
        {
          id: "wedding-3",
          url: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg",
          alt: "Wedding rings close-up",
          aspectRatio: "square"
        },
        {
          id: "wedding-4",
          url: "https://images.pexels.com/photos/1303862/pexels-photo-1303862.jpeg",
          alt: "Bride preparation",
          caption: "Candid moments before the ceremony",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-5",
          url: "https://images.pexels.com/photos/3347221/pexels-photo-3347221.jpeg",
          alt: "First dance",
          aspectRatio: "landscape"
        },
        {
          id: "wedding-6",
          url: "https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg",
          alt: "Wedding party group photo",
          aspectRatio: "landscape"
        }
      ]
    },
    lifestyle: {
      id: "lifestyle",
      slug: "lifestyle",
      name: "Lifestyle",
      description: "Authentic lifestyle photography that tells your unique story in natural, everyday settings.",
      images: [
        {
          id: "lifestyle-1",
          url: "https://images.pexels.com/photos/3808057/pexels-photo-3808057.jpeg",
          alt: "Family walking on beach",
          caption: "Golden hour family session",
          aspectRatio: "landscape"
        },
        {
          id: "lifestyle-2",
          url: "https://images.pexels.com/photos/1647214/pexels-photo-1647214.jpeg",
          alt: "Couple in urban setting",
          aspectRatio: "portrait"
        },
        {
          id: "lifestyle-3",
          url: "https://images.pexels.com/photos/1772475/pexels-photo-1772475.jpeg",
          alt: "Family at home",
          aspectRatio: "landscape"
        },
        {
          id: "lifestyle-4",
          url: "https://images.pexels.com/photos/698907/pexels-photo-698907.jpeg",
          alt: "Mother and baby",
          caption: "Newborn lifestyle session",
          aspectRatio: "portrait"
        },
        {
          id: "lifestyle-5",
          url: "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg",
          alt: "Friends gathering",
          aspectRatio: "landscape"
        },
        {
          id: "lifestyle-6",
          url: "https://images.pexels.com/photos/1449667/pexels-photo-1449667.jpeg",
          alt: "Children playing outdoors",
          aspectRatio: "square"
        }
      ]
    },
    events: {
      id: "events",
      slug: "events",
      name: "Events",
      description: "Dynamic event photography capturing the energy and key moments of corporate events, celebrations, and gatherings.",
      images: [
        {
          id: "events-1",
          url: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
          alt: "Corporate event",
          caption: "Annual company gala",
          aspectRatio: "landscape"
        },
        {
          id: "events-2",
          url: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg",
          alt: "Conference keynote",
          aspectRatio: "landscape"
        },
        {
          id: "events-3",
          url: "https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg",
          alt: "Birthday celebration",
          aspectRatio: "landscape"
        },
        {
          id: "events-4",
          url: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
          alt: "Concert photography",
          caption: "Live music event coverage",
          aspectRatio: "landscape"
        },
        {
          id: "events-5",
          url: "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg",
          alt: "Award ceremony",
          aspectRatio: "landscape"
        },
        {
          id: "events-6",
          url: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
          alt: "Festival photography",
          aspectRatio: "portrait"
        }
      ]
    },
    fashion: {
      id: "fashion",
      slug: "fashion",
      name: "Fashion Collection",
      description: "Professional fashion photography showcasing style and elegance.",
      images: [
        {
          id: "fashion-1",
          url: "/images/FashionCollection/SHEY3591.jpg",
          alt: "SHEY3591",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-2",
          url: "/images/FashionCollection/SHEY0840.jpg",
          alt: "SHEY0840",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-3",
          url: "/images/FashionCollection/SHEY1566.jpg",
          alt: "SHEY1566",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-4",
          url: "/images/FashionCollection/SHEY0238.jpg",
          alt: "SHEY0238",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-5",
          url: "/images/FashionCollection/SHEY0007.jpg",
          alt: "SHEY0007",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-6",
          url: "/images/FashionCollection/SHEY1767.jpg",
          alt: "SHEY1767",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-7",
          url: "/images/FashionCollection/SHEY3778.jpg",
          alt: "SHEY3778",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-8",
          url: "/images/FashionCollection/SHEY1176.jpg",
          alt: "SHEY1176",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-9",
          url: "/images/FashionCollection/SHEY5942.jpg",
          alt: "SHEY5942",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-10",
          url: "/images/FashionCollection/SHEY0425.jpg",
          alt: "SHEY0425",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-11",
          url: "/images/FashionCollection/SHEY5750.jpg",
          alt: "SHEY5750",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-12",
          url: "/images/FashionCollection/SHEY2455.jpg",
          alt: "SHEY2455",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-13",
          url: "/images/FashionCollection/SHEY1394.jpg",
          alt: "SHEY1394",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-14",
          url: "/images/FashionCollection/SHEY0826.jpg",
          alt: "SHEY0826",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-15",
          url: "/images/FashionCollection/SHEY2768.jpg",
          alt: "SHEY2768",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-16",
          url: "/images/FashionCollection/SHEY0581.jpg",
          alt: "SHEY0581",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-17",
          url: "/images/FashionCollection/SHEY6979.jpg",
          alt: "SHEY6979",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-18",
          url: "/images/FashionCollection/SHEY2089.jpg",
          alt: "SHEY2089",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-19",
          url: "/images/FashionCollection/SHEY0604.jpg",
          alt: "SHEY0604",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-20",
          url: "/images/FashionCollection/SHEY0881.jpg",
          alt: "SHEY0881",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-21",
          url: "/images/FashionCollection/SHEY6555.jpg",
          alt: "SHEY6555",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-22",
          url: "/images/FashionCollection/SHEY3872.jpg",
          alt: "SHEY3872",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-23",
          url: "/images/FashionCollection/SHEY5274.jpg",
          alt: "SHEY5274",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-24",
          url: "/images/FashionCollection/SHEY4621.jpg",
          alt: "SHEY4621",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-25",
          url: "/images/FashionCollection/SHEY2867.jpg",
          alt: "SHEY2867",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-26",
          url: "/images/FashionCollection/SHEY4374.jpg",
          alt: "SHEY4374",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-27",
          url: "/images/FashionCollection/SHEY7480.jpg",
          alt: "SHEY7480",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-28",
          url: "/images/FashionCollection/SHEY5991.jpg",
          alt: "SHEY5991",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-29",
          url: "/images/FashionCollection/SHEY6044.jpg",
          alt: "SHEY6044",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-30",
          url: "/images/FashionCollection/SHEY2500.jpg",
          alt: "SHEY2500",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-31",
          url: "/images/FashionCollection/SHEY4400.jpg",
          alt: "SHEY4400",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-32",
          url: "/images/FashionCollection/SHEY1418.jpg",
          alt: "SHEY1418",
          aspectRatio: "portrait"
        }
      ]
    },
    celebrity: {
      id: "celebrity",
      slug: "celebrity",
      name: "Celebrity Portraits",
      description: "Exclusive celebrity portrait photography capturing star power.",
      images: [
        {
          id: "celebrity-1",
          url: "/images/CelebrityPortraits/IMG_0400.JPEG",
          alt: "IMG_0400",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-2",
          url: "/images/CelebrityPortraits/IMG_0308.JPEG",
          alt: "IMG_0308",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-3",
          url: "/images/CelebrityPortraits/IMG_0339.JPEG",
          alt: "IMG_0339",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-4",
          url: "/images/CelebrityPortraits/IMG_0136.JPEG",
          alt: "IMG_0136",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-5",
          url: "/images/CelebrityPortraits/IMG_0423.JPEG",
          alt: "IMG_0423",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-6",
          url: "/images/CelebrityPortraits/IMG_0246.JPEG",
          alt: "IMG_0246",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-7",
          url: "/images/CelebrityPortraits/SHEY5799.JPEG",
          alt: "SHEY5799",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-8",
          url: "/images/CelebrityPortraits/IMG_0056.JPEG",
          alt: "IMG_0056",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-9",
          url: "/images/CelebrityPortraits/IMG_0395.JPEG",
          alt: "IMG_0395",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-10",
          url: "/images/CelebrityPortraits/IMG_2187.JPG",
          alt: "IMG_2187",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-11",
          url: "/images/CelebrityPortraits/SHEY5856.JPEG",
          alt: "SHEY5856",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-12",
          url: "/images/CelebrityPortraits/SHEY5805.JPEG",
          alt: "SHEY5805",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-13",
          url: "/images/CelebrityPortraits/IMG_0146.JPEG",
          alt: "IMG_0146",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-14",
          url: "/images/CelebrityPortraits/IMG_0094.JPEG",
          alt: "IMG_0094",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-15",
          url: "/images/CelebrityPortraits/IMG_0144.JPEG",
          alt: "IMG_0144",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-16",
          url: "/images/CelebrityPortraits/SHEY6128.JPEG",
          alt: "SHEY6128",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-17",
          url: "/images/CelebrityPortraits/SHEY6359.jpg",
          alt: "SHEY6359",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-18",
          url: "/images/CelebrityPortraits/SHEY6406.jpg",
          alt: "SHEY6406",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-19",
          url: "/images/CelebrityPortraits/SHEY6496.jpg",
          alt: "SHEY6496",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-20",
          url: "/images/CelebrityPortraits/SHEY65821-topaz.jpg",
          alt: "SHEY65821-topaz",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-21",
          url: "/images/CelebrityPortraits/SHEY6596.jpg",
          alt: "SHEY6596",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-22",
          url: "/images/CelebrityPortraits/SHEY6684.jpg",
          alt: "SHEY6684",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-23",
          url: "/images/CelebrityPortraits/SHEY0113.jpg",
          alt: "SHEY0113",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-24",
          url: "/images/CelebrityPortraits/SHEY0199.jpg",
          alt: "SHEY0199",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-25",
          url: "/images/CelebrityPortraits/SHEY0582.jpg",
          alt: "SHEY0582",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-26",
          url: "/images/CelebrityPortraits/SHEY6090.jpg",
          alt: "SHEY6090",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-27",
          url: "/images/CelebrityPortraits/IMG_0420.JPEG",
          alt: "IMG_0420",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-28",
          url: "/images/CelebrityPortraits/IMG_0336.JPEG",
          alt: "IMG_0336",
          aspectRatio: "portrait"
        }
      ]
    },
    convocation: {
      id: "convocation",
      slug: "convocation",
      name: "Convocation",
      description: "Memorable graduation photography capturing academic achievements.",
      images: [
        {
          id: "convocation-1",
          url: "/images/Convocation/SHEY0049.jpg",
          alt: "SHEY0049",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-2",
          url: "/images/Convocation/SHEY0136.jpg",
          alt: "SHEY0136",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-3",
          url: "/images/Convocation/SHEY3280.jpg",
          alt: "SHEY3280",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-4",
          url: "/images/Convocation/SHEY3374.jpg",
          alt: "SHEY3374",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-5",
          url: "/images/Convocation/SHEY0400.jpg",
          alt: "SHEY0400",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-6",
          url: "/images/Convocation/SHEY3251.jpg",
          alt: "SHEY3251",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-7",
          url: "/images/Convocation/SHEY6494.jpg",
          alt: "SHEY6494",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-8",
          url: "/images/Convocation/SHEY6672.jpg",
          alt: "SHEY6672",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-9",
          url: "/images/Convocation/SHEY6682.jpg",
          alt: "SHEY6682",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-10",
          url: "/images/Convocation/SHEY6789.jpg",
          alt: "SHEY6789",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-11",
          url: "/images/Convocation/SHEY6845.jpg",
          alt: "SHEY6845",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-12",
          url: "/images/Convocation/SHEY6497.jpg",
          alt: "SHEY6497",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-13",
          url: "/images/Convocation/SHEY6055.jpg",
          alt: "SHEY6055",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-14",
          url: "/images/Convocation/SHEY6161.jpg",
          alt: "SHEY6161",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-15",
          url: "/images/Convocation/SHEY6330.jpg",
          alt: "SHEY6330",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-16",
          url: "/images/Convocation/SHEY6790.jpg",
          alt: "SHEY6790",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-17",
          url: "/images/Convocation/IMG_7605.jpg",
          alt: "IMG_7605",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-18",
          url: "/images/Convocation/SHEY2459.jpg",
          alt: "SHEY2459",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-19",
          url: "/images/Convocation/SHEY2882-copy.jpg",
          alt: "SHEY2882-copy",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-20",
          url: "/images/Convocation/SHEY7259.jpg",
          alt: "SHEY7259",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-21",
          url: "/images/Convocation/SHEY2352.jpg",
          alt: "SHEY2352",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-22",
          url: "/images/Convocation/SHEY2214.jpg",
          alt: "SHEY2214",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-23",
          url: "/images/Convocation/SHEY6584.jpg",
          alt: "SHEY6584",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-24",
          url: "/images/Convocation/SHEY3329.jpg",
          alt: "SHEY3329",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-25",
          url: "/images/Convocation/SHEY6382.jpg",
          alt: "SHEY6382",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-26",
          url: "/images/Convocation/SHEY0057.jpg",
          alt: "SHEY0057",
          aspectRatio: "portrait"
        }
      ]
    },
    birthday: {
      id: "birthday",
      slug: "birthday",
      name: "Birthday Portrait",
      description: "Special birthday portrait sessions celebrating milestones.",
      images: [
        {
          id: "birthday-1",
          url: "/images/BirthdayPortrait/SHEY1636.jpg",
          alt: "SHEY1636",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-2",
          url: "/images/BirthdayPortrait/SHEY7577.jpg",
          alt: "SHEY7577",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-3",
          url: "/images/BirthdayPortrait/SHEY2839.jpg",
          alt: "SHEY2839",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-4",
          url: "/images/BirthdayPortrait/SHEY7289.jpg",
          alt: "SHEY7289",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-5",
          url: "/images/BirthdayPortrait/SHEY03211.jpg",
          alt: "SHEY03211",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-6",
          url: "/images/BirthdayPortrait/SHEY65821-topaz.jpg",
          alt: "SHEY65821-topaz",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-7",
          url: "/images/BirthdayPortrait/SHEY0136.jpg",
          alt: "SHEY0136",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-8",
          url: "/images/BirthdayPortrait/SHEY6701.jpg",
          alt: "SHEY6701",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-9",
          url: "/images/BirthdayPortrait/SHEY0582.jpg",
          alt: "SHEY0582",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-10",
          url: "/images/BirthdayPortrait/SHEY0245.jpg",
          alt: "SHEY0245",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-11",
          url: "/images/BirthdayPortrait/SHEY1231.jpg",
          alt: "SHEY1231",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-12",
          url: "/images/BirthdayPortrait/SHEY9415.jpg",
          alt: "SHEY9415",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-13",
          url: "/images/BirthdayPortrait/SHEY0193.jpg",
          alt: "SHEY0193",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-14",
          url: "/images/BirthdayPortrait/SHEY2964.jpg",
          alt: "SHEY2964",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-15",
          url: "/images/BirthdayPortrait/IMG_7399.jpg",
          alt: "IMG_7399",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-16",
          url: "/images/BirthdayPortrait/SHEY0608.jpg",
          alt: "SHEY0608",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-17",
          url: "/images/BirthdayPortrait/SHEY0588.jpg",
          alt: "SHEY0588",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-18",
          url: "/images/BirthdayPortrait/SHEY00091.jpg",
          alt: "SHEY00091",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-19",
          url: "/images/BirthdayPortrait/SHEY2643.jpg",
          alt: "SHEY2643",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-20",
          url: "/images/BirthdayPortrait/SHEY9463.jpg",
          alt: "SHEY9463",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-21",
          url: "/images/BirthdayPortrait/SHEY7690.jpg",
          alt: "SHEY7690",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-22",
          url: "/images/BirthdayPortrait/SHEY0578.jpg",
          alt: "SHEY0578",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-23",
          url: "/images/BirthdayPortrait/SHEY7452.jpg",
          alt: "SHEY7452",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-24",
          url: "/images/BirthdayPortrait/IMG_2152.JPG",
          alt: "IMG_2152",
          aspectRatio: "portrait"
        }
      ]
    },
    family: {
      id: "family",
      slug: "family",
      name: "Family Portrait",
      description: "Heartwarming family portraits capturing precious moments.",
      images: [
        {
          id: "family-1",
          url: "/images/FamilyPortrait/SHEY0039.jpg",
          alt: "SHEY0039",
          aspectRatio: "portrait"
        },
        {
          id: "family-2",
          url: "/images/FamilyPortrait/SHEY6572.jpg",
          alt: "SHEY6572",
          aspectRatio: "portrait"
        },
        {
          id: "family-3",
          url: "/images/FamilyPortrait/SHEY5086.jpg",
          alt: "SHEY5086",
          aspectRatio: "portrait"
        },
        {
          id: "family-4",
          url: "/images/FamilyPortrait/SHEY9703.jpg",
          alt: "SHEY9703",
          aspectRatio: "portrait"
        },
        {
          id: "family-5",
          url: "/images/FamilyPortrait/SHEY4851.jpg",
          alt: "SHEY4851",
          aspectRatio: "portrait"
        },
        {
          id: "family-6",
          url: "/images/FamilyPortrait/SHEY4920.jpg",
          alt: "SHEY4920",
          aspectRatio: "portrait"
        },
        {
          id: "family-7",
          url: "/images/FamilyPortrait/SHEY6514.jpg",
          alt: "SHEY6514",
          aspectRatio: "portrait"
        },
        {
          id: "family-8",
          url: "/images/FamilyPortrait/IMG_7082.jpg",
          alt: "IMG_7082",
          aspectRatio: "portrait"
        },
        {
          id: "family-9",
          url: "/images/FamilyPortrait/SHEY8765.jpg",
          alt: "SHEY8765",
          aspectRatio: "portrait"
        },
        {
          id: "family-10",
          url: "/images/FamilyPortrait/SHEY5332.jpg",
          alt: "SHEY5332",
          aspectRatio: "portrait"
        },
        {
          id: "family-11",
          url: "/images/FamilyPortrait/SHEY4712.jpg",
          alt: "SHEY4712",
          aspectRatio: "portrait"
        },
        {
          id: "family-12",
          url: "/images/FamilyPortrait/SHEY9751.jpg",
          alt: "SHEY9751",
          aspectRatio: "portrait"
        },
        {
          id: "family-13",
          url: "/images/FamilyPortrait/SHEY0498.jpg",
          alt: "SHEY0498",
          aspectRatio: "portrait"
        },
        {
          id: "family-14",
          url: "/images/FamilyPortrait/SHEY4649.jpg",
          alt: "SHEY4649",
          aspectRatio: "portrait"
        },
        {
          id: "family-15",
          url: "/images/FamilyPortrait/IMG_71161.jpg",
          alt: "IMG_71161",
          aspectRatio: "portrait"
        },
        {
          id: "family-16",
          url: "/images/FamilyPortrait/SHEY5096.jpg",
          alt: "SHEY5096",
          aspectRatio: "portrait"
        },
        {
          id: "family-17",
          url: "/images/FamilyPortrait/SHEY8371.jpg",
          alt: "SHEY8371",
          aspectRatio: "portrait"
        },
        {
          id: "family-18",
          url: "/images/FamilyPortrait/SHEY0514.jpg",
          alt: "SHEY0514",
          aspectRatio: "portrait"
        },
        {
          id: "family-19",
          url: "/images/FamilyPortrait/SHEY5190.jpg",
          alt: "SHEY5190",
          aspectRatio: "portrait"
        },
        {
          id: "family-20",
          url: "/images/FamilyPortrait/SHEY8797.jpg",
          alt: "SHEY8797",
          aspectRatio: "portrait"
        },
        {
          id: "family-21",
          url: "/images/FamilyPortrait/SHEY0016.jpg",
          alt: "SHEY0016",
          aspectRatio: "portrait"
        },
        {
          id: "family-22",
          url: "/images/FamilyPortrait/SHEY0129.jpg",
          alt: "SHEY0129",
          aspectRatio: "portrait"
        },
        {
          id: "family-23",
          url: "/images/FamilyPortrait/SHEY0170.jpg",
          alt: "SHEY0170",
          aspectRatio: "portrait"
        },
        {
          id: "family-24",
          url: "/images/FamilyPortrait/SHEY2810NORMAL.jpg",
          alt: "SHEY2810NORMAL",
          aspectRatio: "portrait"
        },
        {
          id: "family-25",
          url: "/images/FamilyPortrait/SHEY2850NORMAL.jpg",
          alt: "SHEY2850NORMAL",
          aspectRatio: "portrait"
        },
        {
          id: "family-26",
          url: "/images/FamilyPortrait/SHEY3102NORMAL.jpg",
          alt: "SHEY3102NORMAL",
          aspectRatio: "portrait"
        },
        {
          id: "family-27",
          url: "/images/FamilyPortrait/SHEY0209.jpg",
          alt: "SHEY0209",
          aspectRatio: "portrait"
        },
        {
          id: "family-28",
          url: "/images/FamilyPortrait/SHEY0197.jpg",
          alt: "SHEY0197",
          aspectRatio: "portrait"
        },
        {
          id: "family-29",
          url: "/images/FamilyPortrait/SHEY7330.jpg",
          alt: "SHEY7330",
          aspectRatio: "portrait"
        },
        {
          id: "family-30",
          url: "/images/FamilyPortrait/SHEY7165.jpg",
          alt: "SHEY7165",
          aspectRatio: "portrait"
        },
        {
          id: "family-31",
          url: "/images/FamilyPortrait/IMG_7116.jpg",
          alt: "IMG_7116",
          aspectRatio: "portrait"
        }
      ]
    },
    maternity: {
      id: "maternity",
      slug: "maternity",
      name: "Maternity",
      description: "Beautiful maternity photography celebrating motherhood.",
      images: [
        {
          id: "maternity-1",
          url: "/images/Maternity/SHEY69721.jpg",
          alt: "SHEY69721",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-2",
          url: "/images/Maternity/SHEY4553.jpg",
          alt: "SHEY4553",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-3",
          url: "/images/Maternity/SHEY9474.jpg",
          alt: "SHEY9474",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-4",
          url: "/images/Maternity/SHEY9767.jpg",
          alt: "SHEY9767",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-5",
          url: "/images/Maternity/SHEY7190.jpg",
          alt: "SHEY7190",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-6",
          url: "/images/Maternity/SHEY9594.jpg",
          alt: "SHEY9594",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-7",
          url: "/images/Maternity/SHEY1743.jpg",
          alt: "SHEY1743",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-8",
          url: "/images/Maternity/SHEY4721.jpg",
          alt: "SHEY4721",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-9",
          url: "/images/Maternity/SHEY7395.jpg",
          alt: "SHEY7395",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-10",
          url: "/images/Maternity/SHEY9848.jpg",
          alt: "SHEY9848",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-11",
          url: "/images/Maternity/SHEY1801.jpg",
          alt: "SHEY1801",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-12",
          url: "/images/Maternity/SHEY4597.jpg",
          alt: "SHEY4597",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-13",
          url: "/images/Maternity/SHEY69701.jpg",
          alt: "SHEY69701",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-14",
          url: "/images/Maternity/SHEY9790.jpg",
          alt: "SHEY9790",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-15",
          url: "/images/Maternity/SHEY4563.jpg",
          alt: "SHEY4563",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-16",
          url: "/images/Maternity/SHEY1717.jpg",
          alt: "SHEY1717",
          aspectRatio: "portrait"
        }
      ]
    },
    "wedding-portraits": {
      id: "wedding-portraits",
      slug: "wedding-portraits",
      name: "Wedding Portraits",
      description: "Timeless wedding portraits capturing the joy and love of your special day.",
      images: [
        {
          id: "wedding-portraits-1",
          url: "/images/WeddingPortraits/IMG_9518.JPEG",
          alt: "IMG_9518",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-2",
          url: "/images/WeddingPortraits/SHEY1262.jpg",
          alt: "SHEY1262",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-3",
          url: "/images/WeddingPortraits/IMG_1617.JPEG",
          alt: "IMG_1617",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-4",
          url: "/images/WeddingPortraits/SHEY1420.jpg",
          alt: "SHEY1420",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-5",
          url: "/images/WeddingPortraits/SHEY0099.jpg",
          alt: "SHEY0099",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-6",
          url: "/images/WeddingPortraits/SHEY9102.jpg",
          alt: "SHEY9102",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-7",
          url: "/images/WeddingPortraits/SHEY6366-Edit.jpg",
          alt: "SHEY6366-Edit",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-8",
          url: "/images/WeddingPortraits/SHEY0787.jpg",
          alt: "SHEY0787",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-9",
          url: "/images/WeddingPortraits/SHEY9045.jpg",
          alt: "SHEY9045",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-10",
          url: "/images/WeddingPortraits/SHEY0505NORMAL.jpg",
          alt: "SHEY0505NORMAL",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-11",
          url: "/images/WeddingPortraits/SHEY5205-Edit-Edit.jpg",
          alt: "SHEY5205-Edit-Edit",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-12",
          url: "/images/WeddingPortraits/SHEY0802.jpg",
          alt: "SHEY0802",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-13",
          url: "/images/WeddingPortraits/IMG_9523.JPEG",
          alt: "IMG_9523",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-14",
          url: "/images/WeddingPortraits/SHEY0572-Ev.jpg",
          alt: "SHEY0572-Ev",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-15",
          url: "/images/WeddingPortraits/SHEY0158.jpg",
          alt: "SHEY0158",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-16",
          url: "/images/WeddingPortraits/IMG_9152.jpg",
          alt: "IMG_9152",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-17",
          url: "/images/WeddingPortraits/SHEY0641-Edit.jpg",
          alt: "SHEY0641-Edit",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-18",
          url: "/images/WeddingPortraits/SHEY0472.jpg",
          alt: "SHEY0472",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-19",
          url: "/images/WeddingPortraits/SHEY6302.jpg",
          alt: "SHEY6302",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-20",
          url: "/images/WeddingPortraits/SHEY9125.jpg",
          alt: "SHEY9125",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-21",
          url: "/images/WeddingPortraits/IMG_0669.jpg",
          alt: "IMG_0669",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-22",
          url: "/images/WeddingPortraits/SHEY9212_(2)1.jpg",
          alt: "SHEY9212_(2)1",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-23",
          url: "/images/WeddingPortraits/SHEY3763.jpg",
          alt: "SHEY3763",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-24",
          url: "/images/WeddingPortraits/SHEY1609-Edit.jpg",
          alt: "SHEY1609-Edit",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-25",
          url: "/images/WeddingPortraits/SHEY0408.jpg",
          alt: "SHEY0408",
          aspectRatio: "portrait"
        }
      ]
    },
    "pre-wedding-portraits": {
      id: "pre-wedding-portraits",
      slug: "pre-wedding-portraits",
      name: "Pre Wedding Portraits",
      description: "Romantic pre-wedding portraits to celebrate your journey together.",
      images: [
        {
          id: "pre-wedding-portraits-1",
          url: "/images/PreWeddingPortraits/SHEY1616.jpg",
          alt: "Pre Wedding Portraits 1",
          aspectRatio: "portrait"
        },
        {
          id: "pre-wedding-portraits-2",
          url: "/images/PreWeddingPortraits/SHEY2383.jpg",
          alt: "Pre Wedding Portraits 2",
          aspectRatio: "portrait"
        },
        {
          id: "pre-wedding-portraits-3",
          url: "/images/PreWeddingPortraits/SHEY6996.jpg",
          alt: "Pre Wedding Portraits 3",
          aspectRatio: "portrait"
        },
        {
          id: "pre-wedding-portraits-4",
          url: "/images/PreWeddingPortraits/SHEY7098.jpg",
          alt: "Pre Wedding Portraits 4",
          aspectRatio: "portrait"
        }
      ]
    },
    "events-candids": {
      id: "events-candids",
      slug: "events-candids",
      name: "Events Candids",
      description: "Candid event photography capturing genuine moments and emotions.",
      images: [
        {
          id: "events-candids-1",
          url: "/images/EventsCandids/SHEY5847.jpg",
          alt: "SHEY5847",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-2",
          url: "/images/EventsCandids/SHEY5816.jpg",
          alt: "SHEY5816",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-3",
          url: "/images/EventsCandids/SHEY2561.jpg",
          alt: "SHEY2561",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-4",
          url: "/images/EventsCandids/SHEY5688.jpg",
          alt: "SHEY5688",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-5",
          url: "/images/EventsCandids/SHEY1386.jpg",
          alt: "SHEY1386",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-6",
          url: "/images/EventsCandids/SHEY5837.jpg",
          alt: "SHEY5837",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-7",
          url: "/images/EventsCandids/SHEY5605.jpg",
          alt: "SHEY5605",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-8",
          url: "/images/EventsCandids/SHEY5540.jpg",
          alt: "SHEY5540",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-9",
          url: "/images/EventsCandids/SHEY1401.jpg",
          alt: "SHEY1401",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-10",
          url: "/images/EventsCandids/SHEY5636.jpg",
          alt: "SHEY5636",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-11",
          url: "/images/EventsCandids/SHEY2719.jpg",
          alt: "SHEY2719",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-12",
          url: "/images/EventsCandids/SHEY2372.jpg",
          alt: "SHEY2372",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-13",
          url: "/images/EventsCandids/SHEY2559.jpg",
          alt: "SHEY2559",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-14",
          url: "/images/EventsCandids/SHEY2884.jpg",
          alt: "SHEY2884",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-15",
          url: "/images/EventsCandids/SHEY2711.jpg",
          alt: "SHEY2711",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-16",
          url: "/images/EventsCandids/IMG_1005.jpg",
          alt: "IMG_1005",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-17",
          url: "/images/EventsCandids/SHEY1964.jpg",
          alt: "SHEY1964",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-18",
          url: "/images/EventsCandids/SHEY2485.jpg",
          alt: "SHEY2485",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-19",
          url: "/images/EventsCandids/SHEY2512.jpg",
          alt: "SHEY2512",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-20",
          url: "/images/EventsCandids/SHEY2097.jpg",
          alt: "SHEY2097",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-21",
          url: "/images/EventsCandids/SHEY5745.jpg",
          alt: "SHEY5745",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-22",
          url: "/images/EventsCandids/SHEY2628.jpg",
          alt: "SHEY2628",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-23",
          url: "/images/EventsCandids/SHEY8454.jpg",
          alt: "SHEY8454",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-24",
          url: "/images/EventsCandids/SHEY6136.jpg",
          alt: "SHEY6136",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-25",
          url: "/images/EventsCandids/SHEY2940.jpg",
          alt: "SHEY2940",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-26",
          url: "/images/EventsCandids/SHEY2656.jpg",
          alt: "SHEY2656",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-27",
          url: "/images/EventsCandids/SHEY0859.jpg",
          alt: "SHEY0859",
          aspectRatio: "portrait"
        }
      ]
    }
  };
  
  return galleries[slug] || null;
}