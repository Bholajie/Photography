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
    pkg.id === "fashion-collection" ||
    pkg.id === "convocation" ||
    pkg.id === "call-to-bar"
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
        <TabsList className="flex overflow-x-auto pl-4 gap-2 bg-muted whitespace-nowrap no-scrollbar scroll-px-4 md:grid md:grid-cols-5 md:gap-4 md:p-2 md:pl-0">
          <TabsTrigger value="portrait" className="ml-16 md:ml-0">Portrait</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="event-video">Photo + Video</TabsTrigger>
          <TabsTrigger value="wedding">Wedding</TabsTrigger>
          <TabsTrigger value="training" >Training</TabsTrigger>
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

        <TabsContent value="wedding" className="space-y-6">
          <div className="bg-accent/5 p-6 rounded-lg">
            <div className="relative w-full h-[300px] mb-6 rounded-lg overflow-hidden">
              <Image
                src="/images/WeddingPortraits/SHEY1041.jpg"
                alt="Wedding Photography"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">Wedding Photography</h3>
            <p className="text-muted-foreground mb-4">
              Let's document your lovely union! Jump on a consultation call with our lead photographer. 
              Provide your contact details or fill in the information and we will contact you within 24 hours.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onSelectPackage("wedding")}
            >
              Book Wedding Consultation
            </Button>
          </div>
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