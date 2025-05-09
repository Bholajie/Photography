import { Metadata } from 'next';
import ContactForm from '@/components/contact/contact-form';
import ContactInfo from '@/components/contact/contact-info';

export const metadata: Metadata = {
  title: 'Contact | Lens & Light Photography',
  description: 'Get in touch for photography inquiries or to schedule a consultation',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mt-6 font-display text-4xl md:text-5xl text-center mb-8">Get in Touch</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}