import { Metadata } from 'next';
import BookingPage from './booking-page';

export const metadata: Metadata = {
  title: 'Book a Session | Sheyilor Photography',
  description: 'Schedule your photography session including portraits, events, and Call to Bar celebrations with our easy online booking system',
};

export default function Page() {
  return <BookingPage />;
}