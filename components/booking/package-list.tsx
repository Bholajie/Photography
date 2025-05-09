"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { PackageType } from "@/lib/types"

interface PackageListProps {
  packages: PackageType[]
}

export default function PackageList({ packages }: PackageListProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })
  
  return (
    <div ref={sectionRef} className="space-y-6">
      <h2 className="text-2xl font-display mb-4">Choose Your Package</h2>
      
      <div className="space-y-6">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            className="bg-card rounded-lg shadow-sm border overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="relative h-40">
              <Image
                src={pkg.image}
                alt={pkg.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-display">{pkg.name}</h3>
                <p className="text-white/80 text-sm">{pkg.shortDescription}</p>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-2xl font-semibold">${pkg.price}</span>
                  <span className="text-muted-foreground ml-1 text-sm">{pkg.priceSuffix}</span>
                </div>
                <span className="text-sm text-muted-foreground">{pkg.duration}</span>
              </div>
              
              <ul className="space-y-2 mb-4">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  const bookingForm = document.getElementById('booking-form');
                  const packageSelect = document.getElementById('package-select') as HTMLSelectElement;
                  
                  if (bookingForm) {
                    bookingForm.scrollIntoView({ behavior: 'smooth' });
                  }
                  
                  if (packageSelect) {
                    packageSelect.value = pkg.id;
                    const event = new Event('change', { bubbles: true });
                    packageSelect.dispatchEvent(event);
                  }
                }}
              >
                Select {pkg.name}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}