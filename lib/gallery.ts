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
          url: "/images/FashionCollection/SHEY5991.jpg",
          alt: "Fashion Collection 1",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-2",
          url: "/images/FashionCollection/SHEY1418.jpg",
          alt: "Fashion Collection 2",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-3",
          url: "/images/FashionCollection/SHEY4400.jpg",
          alt: "Fashion Collection 3",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-4",
          url: "/images/FashionCollection/SHEY7480.jpg",
          alt: "Fashion Collection 4",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-5",
          url: "/images/FashionCollection/SHEY6044.jpg",
          alt: "Fashion Collection 5",
          aspectRatio: "portrait"
        },
        {
          id: "fashion-6",
          url: "/images/FashionCollection/SHEY2500.jpg",
          alt: "Fashion Collection 6",
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
          url: "/images/CelebrityPortraits/SHEY6090.jpg",
          alt: "Celebrity Portrait 1",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-2",
          url: "/images/CelebrityPortraits/IMG_0336.JPEG",
          alt: "Celebrity Portrait 2",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-3",
          url: "/images/CelebrityPortraits/IMG_0094.JPEG",
          alt: "Celebrity Portrait 3",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-4",
          url: "/images/CelebrityPortraits/IMG_0420.JPEG",
          alt: "Celebrity Portrait 4",
          aspectRatio: "portrait"
        },
        {
          id: "celebrity-5",
          url: "/images/CelebrityPortraits/IMG_0395.JPEG",
          alt: "Celebrity Portrait 5",
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
          url: "/images/Convocation/SHEY6382.jpg",
          alt: "Convocation 1",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-2",
          url: "/images/Convocation/SHEY6584.jpg",
          alt: "Convocation 2",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-3",
          url: "/images/Convocation/SHEY6672.jpg",
          alt: "Convocation 3",
          aspectRatio: "portrait"
        },
        {
          id: "convocation-4",
          url: "/images/Convocation/SHEY0057.jpg",
          alt: "Convocation 4",
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
          url: "/images/BirthdayPortrait/SHEY7690.jpg",
          alt: "Birthday Portrait 1",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-2",
          url: "/images/BirthdayPortrait/SHEY9463.jpg",
          alt: "Birthday Portrait 2",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-3",
          url: "/images/BirthdayPortrait/SHEY0578.jpg",
          alt: "Birthday Portrait 3",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-4",
          url: "/images/BirthdayPortrait/SHEY7452.jpg",
          alt: "Birthday Portrait 4",
          aspectRatio: "portrait"
        },
        {
          id: "birthday-5",
          url: "/images/BirthdayPortrait/IMG_2152.JPG",
          alt: "Birthday Portrait 5",
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
          url: "/images/FamilyPortrait/SHEY7165.jpg",
          alt: "Family Portrait 1",
          aspectRatio: "portrait"
        },
        {
          id: "family-2",
          url: "/images/Family Portrait/IMG_7116.jpg",
          alt: "Family Portrait 2",
          aspectRatio: "portrait"
        },
        {
          id: "family-3",
          url: "/images/Family Portrait/SHEY7330.jpg",
          alt: "Family Portrait 3",
          aspectRatio: "portrait"
        },
        {
          id: "family-4",
          url: "/images/Family Portrait/SHEY6572.jpg",
          alt: "Family Portrait 4",
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
          url: "/images/Maternity/SHEY1801.jpg",
          alt: "Maternity 1",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-2",
          url: "/images/Maternity/SHEY4563.jpg",
          alt: "Maternity 2",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-3",
          url: "/images/Maternity/SHEY69701.jpg",
          alt: "Maternity 3",
          aspectRatio: "portrait"
        },
        {
          id: "maternity-4",
          url: "/images/Maternity/SHEY1717.jpg",
          alt: "Maternity 4",
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
          url: "/images/WeddingPortraits/SHEY3763.jpg",
          alt: "Wedding Portraits 1",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-2",
          url: "/images/WeddingPortraits/SHEY0408.jpg",
          alt: "Wedding Portraits 2",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-3",
          url: "/images/WeddingPortraits/SHEY1609-Edit.jpg",
          alt: "Wedding Portraits 3",
          aspectRatio: "portrait"
        },
        {
          id: "wedding-portraits-4",
          url: "/images/WeddingPortraits/SHEY9212_(2)1.jpg",
          alt: "Wedding Portraits 4",
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
          url: "/images/EventsCandids/SHEY2656.jpg",
          alt: "Events Candids 1",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-2",
          url: "/images/EventsCandids/SHEY0859.jpg",
          alt: "Events Candids 2",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-3",
          url: "/images/EventsCandids/SHEY2940.jpg",
          alt: "Events Candids 3",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-4",
          url: "/images/EventsCandids/SHEY6136.jpg",
          alt: "Events Candids 4",
          aspectRatio: "portrait"
        },
        {
          id: "events-candids-5",
          url: "/images/EventsCandids/SHEY8454.jpg",
          alt: "Events Candids 5",
          aspectRatio: "portrait"
        }
      ]
    }
  };
  
  return galleries[slug] || null;
}