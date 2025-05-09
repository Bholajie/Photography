import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryHeader from '@/components/gallery/category-header';
import CategoryGrid from '@/components/gallery/category-grid';
import { getGalleryByCategory, getGalleryCategories } from '@/lib/gallery';

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category;
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  
  return {
    title: `${formattedCategory} Photography | Lens & Light`,
    description: `Browse our ${formattedCategory.toLowerCase()} photography portfolio`,
  };
}

export async function generateStaticParams() {
  const categories = await getGalleryCategories();
  return categories.map(category => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const gallery = await getGalleryByCategory(category);
  
  if (!gallery || gallery.images.length === 0) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <CategoryHeader category={gallery.name} description={gallery.description} />
      <CategoryGrid images={gallery.images} />
    </div>
  );
}