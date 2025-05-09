"use client"

import Link from "next/link"
import { Calendar, Clock, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function BookingCTA() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })
  
  const features = [
    {
      icon: <Calendar className="h-10 w-10 text-accent" />,
      title: "Easy Scheduling",
      description: "Choose your perfect date and time with our interactive booking calendar"
    },
    {
      icon: <Camera className="h-10 w-10 text-accent" />,
      title: "Customized Packages",
      description: "Select the photography package that matches your unique needs and vision"
    },
    {
      icon: <Clock className="h-10 w-10 text-accent" />,
      title: "Quick Turnaround",
      description: "Receive your beautifully edited photos within 2 weeks of your session"
    }
  ]
  
  return (
    <section ref={sectionRef} className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display mb-4">Ready to Book Your Session?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's create beautiful memories together with a photography experience tailored to you
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-card rounded-lg p-6 shadow-sm border"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-display mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white">
            <Link href="/book">Book Your Session Now</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}