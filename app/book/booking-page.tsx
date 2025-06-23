"use client";

import { useState, useEffect } from 'react';
import BookingHeader from '@/components/booking/booking-header';
import BookingForm from '@/components/booking/booking-form';
import PackageList from '@/components/booking/package-list';
import { getPackages } from '@/lib/packages';
import { PackageType } from '@/lib/types';

export default function BookingPage() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>();
  const [packages, setPackages] = useState<PackageType[]>([]);

  useEffect(() => {
    const loadPackages = async () => {
      const data = await getPackages();
      setPackages(data);
    };
    loadPackages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <BookingHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <PackageList 
          packages={packages} 
          onSelectPackage={(packageId) => {
            setSelectedPackageId(packageId);
          }} 
        />
        <BookingForm 
          packages={packages} 
          selectedPackageId={selectedPackageId}
        />
      </div>
    </div>
  );
} 