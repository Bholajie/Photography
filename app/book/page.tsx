import { Metadata } from 'next';
import BookingHeader from '@/components/booking/booking-header';
import BookingForm from '@/components/booking/booking-form';
import PackageList from '@/components/booking/package-list';
import { getPackages } from '@/lib/packages';

export const metadata: Metadata = {
  title: 'Book a Session | Lens & Light Photography',
  description: 'Schedule your photography session with our easy online booking system',
};

export default async function BookPage() {
  const packages = await getPackages();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <BookingHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <PackageList packages={packages} />
        <BookingForm packages={packages} />
      </div>
    </div>
  );
}