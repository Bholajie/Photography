import Hero from '@/components/hero';
import About from '@/components/about';
import FeaturedGallery from '@/components/featured-gallery';
import BookingCTA from '@/components/booking-cta';
import Testimonials from '@/components/testimonials';
import ContactSection from '@/components/contact-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <FeaturedGallery />
      <BookingCTA />
      <Testimonials />
      <ContactSection />
    </div>
  );
}