import { GalleryCategoryType, GalleryType } from "./types";

// This would be replaced with MongoDB data in a real implementation
export async function getGalleryCategories(): Promise<GalleryCategoryType[]> {
  return [
    {
      id: "fashion",
      slug: "fashion",
      name: "Fashion Collection",
      description: "Professional fashion photography showcasing style and elegance.",
      coverImage: "/images/FashionCollection/SHEY0341.jpg"
    },
    {
      id: "celebrity",
      slug: "celebrity",
      name: "Celebrity Portraits",
      description: "Exclusive celebrity portrait photography capturing star power.",
      coverImage: "/images/CelebrityPortraits/SHEY9578.jpg"
    },
    {
      id: "convocation",
      slug: "convocation",
      name: "Convocation",
      description: "Memorable graduation photography capturing academic achievements.",
      coverImage: "/images/Convocation/SHEY7217.jpg"
    },
    {
      id: "birthday",
      slug: "birthday",
      name: "Birthday Portrait",
      description: "Special birthday portrait sessions celebrating milestones.",
      coverImage: "/images/BirthdayPortrait/JV0A7333.jpg"
    },
    {
      id: "family",
      slug: "family",
      name: "Family Portrait",
      description: "Heartwarming family portraits capturing precious moments.",
      coverImage: "/images/FamilyPortrait/SHEY4649.jpg"
    },
    {
      id: "maternity",
      slug: "maternity",
      name: "Maternity",
      description: "Beautiful maternity photography celebrating motherhood.",
      coverImage: "/images/Maternity/SHEY1707.jpg"
    },
    {
      id: "wedding-portraits",
      slug: "wedding-portraits",
      name: "Wedding Portraits",
      description: "Timeless wedding portraits capturing the joy and love of your special day.",
      coverImage: "/images/WeddingPortraits/IMG_0212.jpg"
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
      coverImage: "/images/EventsCandids/SHEY5847.jpg"
    },
    {
      id: "call-to-bar",
      slug: "call-to-bar",
      name: "Call to Bar",
      description: "Special collection from the Call to Bar event.",
      coverImage: "/images/CallToBar/SHEY0295.jpg"
    }
  ];
}

async function listLocalGalleryImages(folder: string, idPrefix: string): Promise<GalleryType["images"]> {
  const { readdir, stat } = await import("node:fs/promises");
  const path = await import("node:path");

  const dir = path.join(process.cwd(), "public", "images", folder);
  const entries = await readdir(dir, { withFileTypes: true });

  const files = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => /\.(jpe?g|png|webp|gif)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

  const filesWithTime = await Promise.all(
    files.map(async (filename) => {
      const fullPath = path.join(dir, filename);
      const s = await stat(fullPath);
      const t = typeof s.mtimeMs === "number" ? s.mtimeMs : s.mtime.getTime();
      return { filename, t };
    })
  );

  // Newest first (fallback to filename for stability)
  filesWithTime.sort((a, b) => b.t - a.t || a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: "base" }));

  return filesWithTime.map(({ filename }, idx) => ({
    id: `${idPrefix}-${idx + 1}`,
    url: `/images/${folder}/${filename}`,
    alt: filename.replace(/\.[^.]+$/, ""),
    aspectRatio: "portrait"
  }));
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
        { id: "fashion-1", url: "/images/FashionCollection/SHEY0341.jpg", alt: "SHEY0341", aspectRatio: "portrait" },
        { id: "fashion-2", url: "/images/FashionCollection/SHEY0572.jpg", alt: "SHEY0572", aspectRatio: "portrait" },
        { id: "fashion-3", url: "/images/FashionCollection/SHEY0687.jpg", alt: "SHEY0687", aspectRatio: "portrait" },
        { id: "fashion-4", url: "/images/FashionCollection/SHEY1206.jpg", alt: "SHEY1206", aspectRatio: "portrait" },
        { id: "fashion-5", url: "/images/FashionCollection/SHEY4130.jpg", alt: "SHEY4130", aspectRatio: "portrait" },
        { id: "fashion-6", url: "/images/FashionCollection/SHEY4400.jpg", alt: "SHEY4400", aspectRatio: "portrait" },
        { id: "fashion-7", url: "/images/FashionCollection/SHEY3835.jpg", alt: "SHEY3835", aspectRatio: "portrait" },
        { id: "fashion-8", url: "/images/FashionCollection/SHEY3864.jpg", alt: "SHEY3864", aspectRatio: "portrait" },
        { id: "fashion-9", url: "/images/FashionCollection/SHEY3884.jpg", alt: "SHEY3884", aspectRatio: "portrait" },
        { id: "fashion-10", url: "/images/FashionCollection/SHEY4012SHEY4012.jpg", alt: "SHEY4012SHEY4012", aspectRatio: "portrait" },
        { id: "fashion-11", url: "/images/FashionCollection/SHEY5152.jpg", alt: "SHEY5152", aspectRatio: "portrait" },
        { id: "fashion-12", url: "/images/FashionCollection/SHEY5274.jpg", alt: "SHEY5274", aspectRatio: "portrait" },
        { id: "fashion-13", url: "/images/FashionCollection/SHEY5441.jpg", alt: "SHEY5441", aspectRatio: "portrait" },
        { id: "fashion-14", url: "/images/FashionCollection/SHEY5758.jpg", alt: "SHEY5758", aspectRatio: "portrait" },
        { id: "fashion-15", url: "/images/FashionCollection/SHEY5914.jpg", alt: "SHEY5914", aspectRatio: "portrait" },
        { id: "fashion-16", url: "/images/FashionCollection/SHEY6346.jpg", alt: "SHEY6346", aspectRatio: "portrait" },
        { id: "fashion-17", url: "/images/FashionCollection/SHEY1745.jpg", alt: "SHEY1745", aspectRatio: "portrait" },
        { id: "fashion-18", url: "/images/FashionCollection/SHEY1854.jpg", alt: "SHEY1854", aspectRatio: "portrait" },
        { id: "fashion-19", url: "/images/FashionCollection/SHEY2500.jpg", alt: "SHEY2500", aspectRatio: "portrait" },
        { id: "fashion-20", url: "/images/FashionCollection/SHEY2596.jpg", alt: "SHEY2596", aspectRatio: "portrait" },
        { id: "fashion-21", url: "/images/FashionCollection/SHEY2768.jpg", alt: "SHEY2768", aspectRatio: "portrait" },
        { id: "fashion-22", url: "/images/FashionCollection/SHEY5980 1.jpg", alt: "SHEY5980 1", aspectRatio: "portrait" },
        { id: "fashion-23", url: "/images/FashionCollection/SHEY6164 1.jpg", alt: "SHEY6164 1", aspectRatio: "portrait" },
        { id: "fashion-24", url: "/images/FashionCollection/SHEY6266 1.jpg", alt: "SHEY6266 1", aspectRatio: "portrait" },
        { id: "fashion-25", url: "/images/FashionCollection/SHEY6297 1.jpg", alt: "SHEY6297 1", aspectRatio: "portrait" },
        { id: "fashion-26", url: "/images/FashionCollection/SHEY7576.jpg", alt: "SHEY7576", aspectRatio: "portrait" },
        { id: "fashion-27", url: "/images/FashionCollection/SHEY7678.jpg", alt: "SHEY7678", aspectRatio: "portrait" },
        { id: "fashion-28", url: "/images/FashionCollection/SHEY7748.jpg", alt: "SHEY7748", aspectRatio: "portrait" },
        { id: "fashion-29", url: "/images/FashionCollection/SHEY7845.jpg", alt: "SHEY7845", aspectRatio: "portrait" },
        { id: "fashion-30", url: "/images/FashionCollection/SHEY7887.jpg", alt: "SHEY7887", aspectRatio: "portrait" },
        { id: "fashion-31", url: "/images/FashionCollection/SHEY3591 NORMAL.jpg", alt: "SHEY3591 NORMAL", aspectRatio: "portrait" },
        { id: "fashion-32", url: "/images/FashionCollection/SHEY3778 NORMAL.jpg", alt: "SHEY3778 NORMAL", aspectRatio: "portrait" },
        { id: "fashion-33", url: "/images/FashionCollection/SHEY4006 NORMAL.jpg", alt: "SHEY4006 NORMAL", aspectRatio: "portrait" },
        { id: "fashion-34", url: "/images/FashionCollection/SHEY4328 NORMAL.jpg", alt: "SHEY4328 NORMAL", aspectRatio: "portrait" },
        { id: "fashion-35", url: "/images/FashionCollection/SHEY4485 NORMAL.jpg", alt: "SHEY4485 NORMAL", aspectRatio: "portrait" },
        { id: "fashion-36", url: "/images/FashionCollection/SHEY4705 NORMAL.jpg", alt: "SHEY4705 NORMAL", aspectRatio: "portrait" },
        { id: "fashion-37", url: "/images/FashionCollection/SHEY1477 NORMAL.jpg", alt: "SHEY1477 NORMAL", aspectRatio: "portrait" },
        { id: "fashion-38", url: "/images/FashionCollection/SHEY0116 NORMAL.jpg", alt: "SHEY0116 NORMAL", aspectRatio: "portrait" },
        { id: "fashion-39", url: "/images/FashionCollection/SHEY0322 NORMAL.jpg", alt: "SHEY0322 NORMAL", aspectRatio: "portrait" },
        { id: "fashion-40", url: "/images/FashionCollection/SHEY0434 NORMAL.jpg", alt: "SHEY0434 NORMAL", aspectRatio: "portrait" },
        { id: "fashion-41", url: "/images/FashionCollection/SHEY0915 NORMAL.jpg", alt: "SHEY0915 NORMAL", aspectRatio: "portrait" },
        { id: "fashion-42", url: "/images/FashionCollection/SHEY0513 NORMAL.jpg", alt: "SHEY0513 NORMAL", aspectRatio: "portrait" },
        { id: "fashion-43", url: "/images/FashionCollection/SHEY0066.jpg", alt: "SHEY0066", aspectRatio: "portrait" },
        { id: "fashion-44", url: "/images/FashionCollection/SHEY0093.jpg", alt: "SHEY0093", aspectRatio: "portrait" },
        { id: "fashion-45", url: "/images/FashionCollection/SHEY0279.jpg", alt: "SHEY0279", aspectRatio: "portrait" },
        { id: "fashion-46", url: "/images/FashionCollection/SHEY0297.jpg", alt: "SHEY0297", aspectRatio: "portrait" },
        { id: "fashion-47", url: "/images/FashionCollection/SHEY0483.jpg", alt: "SHEY0483", aspectRatio: "portrait" },
        { id: "fashion-48", url: "/images/FashionCollection/SHEY0726.jpg", alt: "SHEY0726", aspectRatio: "portrait" },
        { id: "fashion-49", url: "/images/FashionCollection/SHEY0728.jpg", alt: "SHEY0728", aspectRatio: "portrait" },
        { id: "fashion-50", url: "/images/FashionCollection/SHEY0834.jpg", alt: "SHEY0834", aspectRatio: "portrait" }
      ]
    },
    celebrity: {
      id: "celebrity",
      slug: "celebrity",
      name: "Celebrity Portraits",
      description: "Exclusive celebrity portrait photography capturing star power.",
      images: [
        { id: "celebrity-1", url: "/images/CelebrityPortraits/SHEY9578.jpg", alt: "SHEY9578", aspectRatio: "portrait" },
        { id: "celebrity-2", url: "/images/CelebrityPortraits/SHEY9592.jpg", alt: "SHEY9592", aspectRatio: "portrait" },
        { id: "celebrity-3", url: "/images/CelebrityPortraits/SHEY9610.jpg", alt: "SHEY9610", aspectRatio: "portrait" },
        { id: "celebrity-4", url: "/images/CelebrityPortraits/SHEY9630.jpg", alt: "SHEY9630", aspectRatio: "portrait" },
        { id: "celebrity-5", url: "/images/CelebrityPortraits/SHEY9632.jpg", alt: "SHEY9632", aspectRatio: "portrait" },
        { id: "celebrity-6", url: "/images/CelebrityPortraits/SHEY9693.jpg", alt: "SHEY9693", aspectRatio: "portrait" },
        { id: "celebrity-7", url: "/images/CelebrityPortraits/SHEY9699.jpg", alt: "SHEY9699", aspectRatio: "portrait" },
        { id: "celebrity-8", url: "/images/CelebrityPortraits/SHEY9710.jpg", alt: "SHEY9710", aspectRatio: "portrait" },
        { id: "celebrity-9", url: "/images/CelebrityPortraits/SHEY9725.jpg", alt: "SHEY9725", aspectRatio: "portrait" },
        { id: "celebrity-10", url: "/images/CelebrityPortraits/SHEY9741.jpg", alt: "SHEY9741", aspectRatio: "portrait" },
        { id: "celebrity-11", url: "/images/CelebrityPortraits/SHEY9753.jpg", alt: "SHEY9753", aspectRatio: "portrait" },
        { id: "celebrity-12", url: "/images/CelebrityPortraits/SHEY9759.jpg", alt: "SHEY9759", aspectRatio: "portrait" },
        { id: "celebrity-13", url: "/images/CelebrityPortraits/SHEY9788.jpg", alt: "SHEY9788", aspectRatio: "portrait" },
        { id: "celebrity-14", url: "/images/CelebrityPortraits/SHEY9816.jpg", alt: "SHEY9816", aspectRatio: "portrait" },
        { id: "celebrity-15", url: "/images/CelebrityPortraits/SHEY9819.jpg", alt: "SHEY9819", aspectRatio: "portrait" },
        { id: "celebrity-16", url: "/images/CelebrityPortraits/SHEY9040.jpg", alt: "SHEY9040", aspectRatio: "portrait" },
        { id: "celebrity-17", url: "/images/CelebrityPortraits/SHEY9061.jpg", alt: "SHEY9061", aspectRatio: "portrait" },
        { id: "celebrity-18", url: "/images/CelebrityPortraits/SHEY9159 1.jpg", alt: "SHEY9159 1", aspectRatio: "portrait" },
        { id: "celebrity-19", url: "/images/CelebrityPortraits/SHEY9184 1.jpg", alt: "SHEY9184 1", aspectRatio: "portrait" },
        { id: "celebrity-20", url: "/images/CelebrityPortraits/IMAD324.jpg", alt: "IMAD324", aspectRatio: "portrait" },
        { id: "celebrity-21", url: "/images/CelebrityPortraits/IMAD367.jpg", alt: "IMAD367", aspectRatio: "portrait" },
        { id: "celebrity-22", url: "/images/CelebrityPortraits/IMAD373.jpg", alt: "IMAD373", aspectRatio: "portrait" },
        { id: "celebrity-23", url: "/images/CelebrityPortraits/IMAD665.jpg", alt: "IMAD665", aspectRatio: "portrait" },
        { id: "celebrity-24", url: "/images/CelebrityPortraits/IMAD667.jpg", alt: "IMAD667", aspectRatio: "portrait" },
        { id: "celebrity-25", url: "/images/CelebrityPortraits/SHEY6030 NORMAL.jpg", alt: "SHEY6030 NORMAL", aspectRatio: "portrait" },
        { id: "celebrity-26", url: "/images/CelebrityPortraits/SHEY6093 NORMAL.jpg", alt: "SHEY6093 NORMAL", aspectRatio: "portrait" },
        { id: "celebrity-27", url: "/images/CelebrityPortraits/SHEY6359 NORMAL.jpg", alt: "SHEY6359 NORMAL", aspectRatio: "portrait" },
        { id: "celebrity-28", url: "/images/CelebrityPortraits/SHEY6472 NORMAL.jpg", alt: "SHEY6472 NORMAL", aspectRatio: "portrait" },
        { id: "celebrity-29", url: "/images/CelebrityPortraits/SHEY6496 NORMAL.jpg", alt: "SHEY6496 NORMAL", aspectRatio: "portrait" },
        { id: "celebrity-30", url: "/images/CelebrityPortraits/SHEY0137.jpg", alt: "SHEY0137", aspectRatio: "portrait" },
        { id: "celebrity-31", url: "/images/CelebrityPortraits/SHEY0287.jpg", alt: "SHEY0287", aspectRatio: "portrait" },
        { id: "celebrity-32", url: "/images/CelebrityPortraits/SHEY0361.jpg", alt: "SHEY0361", aspectRatio: "portrait" },
        { id: "celebrity-33", url: "/images/CelebrityPortraits/SHEY0418.jpg", alt: "SHEY0418", aspectRatio: "portrait" },
        { id: "celebrity-34", url: "/images/CelebrityPortraits/SHEY0565.jpg", alt: "SHEY0565", aspectRatio: "portrait" }
      ]
    },
    convocation: {
      id: "convocation",
      slug: "convocation",
      name: "Convocation",
      description: "Memorable graduation photography capturing academic achievements.",
      images: []
    },
    birthday: {
      id: "birthday",
      slug: "birthday",
      name: "Birthday Portrait",
      description: "Special birthday portrait sessions celebrating milestones.",
      images: []
    },
    family: {
      id: "family",
      slug: "family",
      name: "Family Portrait",
      description: "Heartwarming family portraits capturing precious moments.",
      images: [
        { id: "family-1", url: "/images/FamilyPortrait/SHEY4649.jpg", alt: "SHEY4649", aspectRatio: "portrait" },
        { id: "family-2", url: "/images/FamilyPortrait/SHEY4682.jpg", alt: "SHEY4682", aspectRatio: "portrait" },
        { id: "family-3", url: "/images/FamilyPortrait/SHEY4697.jpg", alt: "SHEY4697", aspectRatio: "portrait" },
        { id: "family-4", url: "/images/FamilyPortrait/SHEY4712.jpg", alt: "SHEY4712", aspectRatio: "portrait" },
        { id: "family-5", url: "/images/FamilyPortrait/SHEY4769.jpg", alt: "SHEY4769", aspectRatio: "portrait" },
        { id: "family-6", url: "/images/FamilyPortrait/SHEY6424.jpg", alt: "SHEY6424", aspectRatio: "portrait" },
        { id: "family-7", url: "/images/FamilyPortrait/SHEY6511.jpg", alt: "SHEY6511", aspectRatio: "portrait" },
        { id: "family-8", url: "/images/FamilyPortrait/SHEY6514.jpg", alt: "SHEY6514", aspectRatio: "portrait" },
        { id: "family-9", url: "/images/FamilyPortrait/SHEY6542.jpg", alt: "SHEY6542", aspectRatio: "portrait" },
        { id: "family-10", url: "/images/FamilyPortrait/SHEY6572.jpg", alt: "SHEY6572", aspectRatio: "portrait" },
        { id: "family-11", url: "/images/FamilyPortrait/SHEY6939.jpg", alt: "SHEY6939", aspectRatio: "portrait" },
        { id: "family-12", url: "/images/FamilyPortrait/SHEY8797.jpg", alt: "SHEY8797", aspectRatio: "portrait" },
        { id: "family-13", url: "/images/FamilyPortrait/SHEY8851.jpg", alt: "SHEY8851", aspectRatio: "portrait" },
        { id: "family-14", url: "/images/FamilyPortrait/SHEY9689.jpg", alt: "SHEY9689", aspectRatio: "portrait" },
        { id: "family-15", url: "/images/FamilyPortrait/SHEY0045.jpg", alt: "SHEY0045", aspectRatio: "portrait" },
        { id: "family-16", url: "/images/FamilyPortrait/SHEY0576.jpg", alt: "SHEY0576", aspectRatio: "portrait" },
        { id: "family-17", url: "/images/FamilyPortrait/IMG_7199.jpg", alt: "IMG_7199", aspectRatio: "portrait" },
        { id: "family-18", url: "/images/FamilyPortrait/IMG_7212.jpg", alt: "IMG_7212", aspectRatio: "portrait" },
        { id: "family-19", url: "/images/FamilyPortrait/SHEY1936.jpg", alt: "SHEY1936", aspectRatio: "portrait" },
        { id: "family-20", url: "/images/FamilyPortrait/SHEY2019.jpg", alt: "SHEY2019", aspectRatio: "portrait" },
        { id: "family-21", url: "/images/FamilyPortrait/SHEY2103.jpg", alt: "SHEY2103", aspectRatio: "portrait" },
        { id: "family-22", url: "/images/FamilyPortrait/SHEY3063.jpg", alt: "SHEY3063", aspectRatio: "portrait" },
        { id: "family-23", url: "/images/FamilyPortrait/SHEY3077.jpg", alt: "SHEY3077", aspectRatio: "portrait" },
        { id: "family-24", url: "/images/FamilyPortrait/SHEY3114.jpg", alt: "SHEY3114", aspectRatio: "portrait" },
        { id: "family-25", url: "/images/FamilyPortrait/SHEY7449.jpg", alt: "SHEY7449", aspectRatio: "portrait" },
        { id: "family-26", url: "/images/FamilyPortrait/SHEY7459.jpg", alt: "SHEY7459", aspectRatio: "portrait" },
        { id: "family-27", url: "/images/FamilyPortrait/SHEY7520.jpg", alt: "SHEY7520", aspectRatio: "portrait" },
        { id: "family-28", url: "/images/FamilyPortrait/SHEY6870.jpg", alt: "SHEY6870", aspectRatio: "portrait" },
        { id: "family-29", url: "/images/FamilyPortrait/SHEY6965.jpg", alt: "SHEY6965", aspectRatio: "portrait" },
        { id: "family-30", url: "/images/FamilyPortrait/MOTHERS-GENERATION-.jpg", alt: "MOTHERS-GENERATION-", aspectRatio: "portrait" },
        { id: "family-31", url: "/images/FamilyPortrait/FULL GEN 2.0.jpg", alt: "FULL GEN 2.0", aspectRatio: "portrait" },
        { id: "family-32", url: "/images/FamilyPortrait/SHEY3922.jpg", alt: "SHEY3922", aspectRatio: "portrait" },
        { id: "family-33", url: "/images/FamilyPortrait/SHEY3102 NORMAL.jpg", alt: "SHEY3102 NORMAL", aspectRatio: "portrait" },
        { id: "family-34", url: "/images/FamilyPortrait/SHEY0016 NORMAL.jpg", alt: "SHEY0016 NORMAL", aspectRatio: "portrait" },
        { id: "family-35", url: "/images/FamilyPortrait/SHEY9699 NORMAL.jpg", alt: "SHEY9699 NORMAL", aspectRatio: "portrait" },
        { id: "family-36", url: "/images/FamilyPortrait/SHEY9989 NORMAL.jpg", alt: "SHEY9989 NORMAL", aspectRatio: "portrait" },
        { id: "family-37", url: "/images/FamilyPortrait/SHEY5892 NORMAL.jpg", alt: "SHEY5892 NORMAL", aspectRatio: "portrait" },
        { id: "family-38", url: "/images/FamilyPortrait/SHEY5626 NORMAL.jpg", alt: "SHEY5626 NORMAL", aspectRatio: "portrait" },
        { id: "family-39", url: "/images/FamilyPortrait/SHEY0197 NORMAL.jpg", alt: "SHEY0197 NORMAL", aspectRatio: "portrait" },
        { id: "family-40", url: "/images/FamilyPortrait/SHEY0209 NORMAL.jpg", alt: "SHEY0209 NORMAL", aspectRatio: "portrait" },
        { id: "family-41", url: "/images/FamilyPortrait/SHEY0411 NORMAL.jpg", alt: "SHEY0411 NORMAL", aspectRatio: "portrait" },
        { id: "family-42", url: "/images/FamilyPortrait/SHEY0881.jpg", alt: "SHEY0881", aspectRatio: "portrait" }
      ]
    },
    maternity: {
      id: "maternity",
      slug: "maternity",
      name: "Maternity",
      description: "Beautiful maternity photography celebrating motherhood.",
      images: [
        { id: "maternity-1", url: "/images/Maternity/SHEY1707.jpg", alt: "SHEY1707", aspectRatio: "portrait" },
        { id: "maternity-2", url: "/images/Maternity/SHEY1743.jpg", alt: "SHEY1743", aspectRatio: "portrait" },
        { id: "maternity-3", url: "/images/Maternity/SHEY1801.jpg", alt: "SHEY1801", aspectRatio: "portrait" },
        { id: "maternity-4", url: "/images/Maternity/SHEY7343.jpg", alt: "SHEY7343", aspectRatio: "portrait" },
        { id: "maternity-5", url: "/images/Maternity/SHEY7721.jpg", alt: "SHEY7721", aspectRatio: "portrait" },
        { id: "maternity-6", url: "/images/Maternity/SHEY1840.jpg", alt: "SHEY1840", aspectRatio: "portrait" },
        { id: "maternity-7", url: "/images/Maternity/SHEY1908 1.jpg", alt: "SHEY1908 1", aspectRatio: "portrait" },
        { id: "maternity-8", url: "/images/Maternity/SHEY1954.jpg", alt: "SHEY1954", aspectRatio: "portrait" },
        { id: "maternity-9", url: "/images/Maternity/SHEY1985.jpg", alt: "SHEY1985", aspectRatio: "portrait" },
        { id: "maternity-10", url: "/images/Maternity/SHEY2011.jpg", alt: "SHEY2011", aspectRatio: "portrait" },
        { id: "maternity-11", url: "/images/Maternity/SHEY2795.jpg", alt: "SHEY2795", aspectRatio: "portrait" },
        { id: "maternity-12", url: "/images/Maternity/SHEY2829.jpg", alt: "SHEY2829", aspectRatio: "portrait" },
        { id: "maternity-13", url: "/images/Maternity/SHEY2917.jpg", alt: "SHEY2917", aspectRatio: "portrait" },
        { id: "maternity-14", url: "/images/Maternity/SHEY6940.jpg", alt: "SHEY6940", aspectRatio: "portrait" },
        { id: "maternity-15", url: "/images/Maternity/SHEY7149.jpg", alt: "SHEY7149", aspectRatio: "portrait" },
        { id: "maternity-16", url: "/images/Maternity/SHEY7158.jpg", alt: "SHEY7158", aspectRatio: "portrait" },
        { id: "maternity-17", url: "/images/Maternity/SHEY7173.jpg", alt: "SHEY7173", aspectRatio: "portrait" }
      ]
    },
    "wedding-portraits": {
      id: "wedding-portraits",
      slug: "wedding-portraits",
      name: "Wedding Portraits",
      description: "Timeless wedding portraits capturing the joy and love of your special day.",
      images: []
    },
    "pre-wedding-portraits": {
      id: "pre-wedding-portraits",
      slug: "pre-wedding-portraits",
      name: "Pre Wedding Portraits",
      description: "Romantic pre-wedding portraits to celebrate your journey together.",
      images: [
        { id: "pre-wedding-portraits-1", url: "/images/PreWeddingPortraits/SHEY1616.jpg", alt: "SHEY1616", aspectRatio: "portrait" },
        { id: "pre-wedding-portraits-2", url: "/images/PreWeddingPortraits/SHEY2383.jpg", alt: "SHEY2383", aspectRatio: "portrait" },
        { id: "pre-wedding-portraits-3", url: "/images/PreWeddingPortraits/SHEY6996.jpg", alt: "SHEY6996", aspectRatio: "portrait" },
        { id: "pre-wedding-portraits-4", url: "/images/PreWeddingPortraits/SHEY7098.jpg", alt: "SHEY7098", aspectRatio: "portrait" },
        { id: "pre-wedding-portraits-5", url: "/images/PreWeddingPortraits/SHEY8892.jpg", alt: "SHEY8892", aspectRatio: "portrait" }
      ]
    },
    "events-candids": {
      id: "events-candids",
      slug: "events-candids",
      name: "Events Candids",
      description: "Candid event photography capturing genuine moments and emotions.",
      images: [
        { id: "events-candids-1", url: "/images/EventsCandids/SHEY5847.jpg", alt: "SHEY5847", aspectRatio: "portrait" },
        { id: "events-candids-2", url: "/images/EventsCandids/SHEY5816.jpg", alt: "SHEY5816", aspectRatio: "portrait" },
        { id: "events-candids-3", url: "/images/EventsCandids/SHEY2561.jpg", alt: "SHEY2561", aspectRatio: "portrait" },
        { id: "events-candids-4", url: "/images/EventsCandids/SHEY5688.jpg", alt: "SHEY5688", aspectRatio: "portrait" },
        { id: "events-candids-5", url: "/images/EventsCandids/SHEY1386.jpg", alt: "SHEY1386", aspectRatio: "portrait" },
        { id: "events-candids-6", url: "/images/EventsCandids/SHEY5837.jpg", alt: "SHEY5837", aspectRatio: "portrait" },
        { id: "events-candids-7", url: "/images/EventsCandids/SHEY5605.jpg", alt: "SHEY5605", aspectRatio: "portrait" },
        { id: "events-candids-8", url: "/images/EventsCandids/SHEY5540.jpg", alt: "SHEY5540", aspectRatio: "portrait" },
        { id: "events-candids-9", url: "/images/EventsCandids/SHEY1401.jpg", alt: "SHEY1401", aspectRatio: "portrait" },
        { id: "events-candids-10", url: "/images/EventsCandids/SHEY5636.jpg", alt: "SHEY5636", aspectRatio: "portrait" },
        { id: "events-candids-11", url: "/images/EventsCandids/SHEY2719.jpg", alt: "SHEY2719", aspectRatio: "portrait" },
        { id: "events-candids-12", url: "/images/EventsCandids/SHEY2372.jpg", alt: "SHEY2372", aspectRatio: "portrait" },
        { id: "events-candids-13", url: "/images/EventsCandids/SHEY2559.jpg", alt: "SHEY2559", aspectRatio: "portrait" },
        { id: "events-candids-14", url: "/images/EventsCandids/SHEY2884.jpg", alt: "SHEY2884", aspectRatio: "portrait" },
        { id: "events-candids-15", url: "/images/EventsCandids/SHEY2711.jpg", alt: "SHEY2711", aspectRatio: "portrait" },
        { id: "events-candids-16", url: "/images/EventsCandids/IMG_1005.jpg", alt: "IMG_1005", aspectRatio: "portrait" },
        { id: "events-candids-17", url: "/images/EventsCandids/SHEY1964.jpg", alt: "SHEY1964", aspectRatio: "portrait" },
        { id: "events-candids-18", url: "/images/EventsCandids/SHEY2485.jpg", alt: "SHEY2485", aspectRatio: "portrait" },
        { id: "events-candids-19", url: "/images/EventsCandids/SHEY2512.jpg", alt: "SHEY2512", aspectRatio: "portrait" },
        { id: "events-candids-20", url: "/images/EventsCandids/SHEY2097.jpg", alt: "SHEY2097", aspectRatio: "portrait" },
        { id: "events-candids-21", url: "/images/EventsCandids/SHEY5745.jpg", alt: "SHEY5745", aspectRatio: "portrait" },
        { id: "events-candids-22", url: "/images/EventsCandids/SHEY2628.jpg", alt: "SHEY2628", aspectRatio: "portrait" },
        { id: "events-candids-23", url: "/images/EventsCandids/SHEY8454.jpg", alt: "SHEY8454", aspectRatio: "portrait" },
        { id: "events-candids-24", url: "/images/EventsCandids/SHEY6136.jpg", alt: "SHEY6136", aspectRatio: "portrait" },
        { id: "events-candids-25", url: "/images/EventsCandids/SHEY2940.jpg", alt: "SHEY2940", aspectRatio: "portrait" },
        { id: "events-candids-26", url: "/images/EventsCandids/SHEY2656.jpg", alt: "SHEY2656", aspectRatio: "portrait" },
        { id: "events-candids-27", url: "/images/EventsCandids/SHEY0859.jpg", alt: "SHEY0859", aspectRatio: "portrait" }
      ]
    },
    "call-to-bar": {
      id: "call-to-bar",
      slug: "call-to-bar",
      name: "Call to Bar",
      description: "Special collection from the Call to Bar event.",
      images: [
        { id: "call-to-bar-1", url: "/images/CallToBar/SHEY0295.jpg", alt: "SHEY0295", aspectRatio: "portrait" },
        { id: "call-to-bar-2", url: "/images/CallToBar/SHEY0022.jpg", alt: "SHEY0022", aspectRatio: "portrait" },
        { id: "call-to-bar-3", url: "/images/CallToBar/SHEY0130.jpg", alt: "SHEY0130", aspectRatio: "portrait" },
        { id: "call-to-bar-4", url: "/images/CallToBar/SHEY0175.jpg", alt: "SHEY0175", aspectRatio: "portrait" },
        { id: "call-to-bar-5", url: "/images/CallToBar/SHEY0881.jpg", alt: "SHEY0881", aspectRatio: "portrait" },
        { id: "call-to-bar-6", url: "/images/CallToBar/SHEY0984.jpg", alt: "SHEY0984", aspectRatio: "portrait" },
        { id: "call-to-bar-7", url: "/images/CallToBar/SHEY0989.jpg", alt: "SHEY0989", aspectRatio: "portrait" },
        { id: "call-to-bar-8", url: "/images/CallToBar/SHEY1359.jpg", alt: "SHEY1359", aspectRatio: "portrait" },
        { id: "call-to-bar-9", url: "/images/CallToBar/SHEY0283.jpg", alt: "SHEY0283", aspectRatio: "portrait" },
        { id: "call-to-bar-10", url: "/images/CallToBar/SHEY0437.jpg", alt: "SHEY0437", aspectRatio: "portrait" },
        { id: "call-to-bar-11", url: "/images/CallToBar/SHEY0571.jpg", alt: "SHEY0571", aspectRatio: "portrait" },
        { id: "call-to-bar-12", url: "/images/CallToBar/SHEY1140.jpg", alt: "SHEY1140", aspectRatio: "portrait" },
        { id: "call-to-bar-13", url: "/images/CallToBar/SHEY1217.jpg", alt: "SHEY1217", aspectRatio: "portrait" },
        { id: "call-to-bar-14", url: "/images/CallToBar/SHEY0668.jpg", alt: "SHEY0668", aspectRatio: "portrait" },
        { id: "call-to-bar-15", url: "/images/CallToBar/SHEY0798.jpg", alt: "SHEY0798", aspectRatio: "portrait" },
        { id: "call-to-bar-16", url: "/images/CallToBar/SHEY0801.jpg", alt: "SHEY0801", aspectRatio: "portrait" }
      ]
    }
  };
  
  const localFolderBySlug: Record<string, { folder: string; idPrefix: string }> = {
    birthday: { folder: "BirthdayPortrait", idPrefix: "birthday" },
    convocation: { folder: "Convocation", idPrefix: "convocation" },
    maternity: { folder: "Maternity", idPrefix: "maternity" },
    "wedding-portraits": { folder: "WeddingPortraits", idPrefix: "wedding-portraits" }
  };

  const gallery = galleries[slug];
  if (!gallery) return null;

  const local = localFolderBySlug[slug];
  if (local) {
    gallery.images = await listLocalGalleryImages(local.folder, local.idPrefix);
  }

  return gallery;
}