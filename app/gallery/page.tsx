import { Metadata } from 'next';
import GalleryHeader from '@/components/gallery/gallery-header';
import GalleryGrid from '@/components/gallery/gallery-grid';
import { getGalleryCategories } from '@/lib/gallery';

export const metadata: Metadata = {
  title: 'Gallery | Sheyilor Photography',
  description: 'Explore our portfolio of Fashion, Celebrity Portraits, Convocation, Birthday, Family, Maternity, and Call to Bar Photography',
};

export default async function GalleryPage() {
  const categories = await getGalleryCategories();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <GalleryHeader />
      <GalleryGrid categories={categories} />
    </div>
  );
}