import Hero from '@/components/hero';
import About from '@/components/about';
import FeaturedGallery from '@/components/featured-gallery';
import BookingCTA from '@/components/booking-cta';
import Testimonials from '@/components/testimonials';
import ContactSection from '@/components/contact-section';
import DiscountCountdown from '@/components/discount-countdown';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <DiscountCountdown />
      <About />
      <FeaturedGallery />
      <BookingCTA />
      <Testimonials />
      <ContactSection />
    </div>
  );
}