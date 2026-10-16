"use client";

import { useState, useEffect } from 'react';
import BookingHeader from '@/components/booking/booking-header';
import BookingForm from '@/components/booking/booking-form';
import PackageList from '@/components/booking/package-list';
import { DEFAULT_ADDITIONAL_FEES, DEFAULT_DELIVERY_FEES, AdditionalFees, DeliveryFees, PackageType } from '@/lib/types';

export default function BookingPage() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>();
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [deliveryFees, setDeliveryFees] = useState<DeliveryFees>(DEFAULT_DELIVERY_FEES);
  const [additionalFees, setAdditionalFees] = useState<AdditionalFees>(DEFAULT_ADDITIONAL_FEES);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const response = await fetch('/api/pricing', { cache: 'no-store' });
        if (!response.ok) throw new Error('Unable to load pricing');

        const data = await response.json();
        setPackages(data.packages || []);
        setDeliveryFees(data.deliveryFees || DEFAULT_DELIVERY_FEES);
        setAdditionalFees(data.additionalFees || DEFAULT_ADDITIONAL_FEES);
      } catch (error) {
        console.error('Unable to load booking pricing:', error);
      }
    };
    loadPackages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <BookingHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <PackageList 
          packages={packages} 
          additionalFees={additionalFees}
          onSelectPackage={(packageId) => {
            setSelectedPackageId(packageId);
          }} 
        />
        <BookingForm 
          packages={packages} 
          deliveryFees={deliveryFees}
          additionalFees={additionalFees}
          selectedPackageId={selectedPackageId}
        />
      </div>
    </div>
  );
}
