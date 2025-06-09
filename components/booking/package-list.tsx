"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { PackageType } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PackageListProps {
  packages: PackageType[]
  onSelectPackage: (packageId: string) => void
}

export default function PackageList({ packages, onSelectPackage }: PackageListProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })

  const portraitPackages = packages.filter(pkg => 
    pkg.id === "portrait" || 
    pkg.id === "family-portrait" || 
    pkg.id === "fashion-collection"
  )

  const eventPackages = packages.filter(pkg => 
    pkg.id.startsWith("event-") && !pkg.id.includes("video")
  )

  const eventVideoPackages = packages.filter(pkg => 
    pkg.id.startsWith("event-video")
  )

  const trainingPackages = packages.filter(pkg => 
    pkg.id.startsWith("training")
  )
  
  return (
    <div ref={sectionRef} className="space-y-6">
      <h2 className="text-2xl font-display mb-4">Choose Your Package</h2>
      
      <Tabs defaultValue="portrait" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="portrait">Portrait</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="event-video">Photo + Video</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value="portrait" className="space-y-6">
          {portraitPackages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} onSelect={onSelectPackage} />
          ))}
        </TabsContent>

        <TabsContent value="event" className="space-y-6">
          {eventPackages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} onSelect={onSelectPackage} />
          ))}
        </TabsContent>

        <TabsContent value="event-video" className="space-y-6">
          {eventVideoPackages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} onSelect={onSelectPackage} />
          ))}
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          {trainingPackages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} onSelect={onSelectPackage} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface PackageCardProps {
  pkg: PackageType
  index: number
  onSelect: (packageId: string) => void
}

function PackageCard({ pkg, index, onSelect }: PackageCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref)
  
  const handleSelectPackage = () => {
    // Find the booking form
    const bookingForm = document.getElementById('booking-form')
    if (!bookingForm) return

    // Scroll to the form
    bookingForm.scrollIntoView({ behavior: 'smooth' })

    // Call the onSelect callback
    onSelect(pkg.id)
  }
  
  return (
    <motion.div
      ref={ref}
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
            <span className="text-2xl font-semibold">₦{pkg.price.toLocaleString()}</span>
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
          onClick={handleSelectPackage}
        >
          Select {pkg.name}
        </Button>
      </div>
    </motion.div>
  )
}