"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })
  
  return (
    <section ref={sectionRef} className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image 
              src="/images/Sheyilor.jpg"
              alt="Professional photographer"
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <motion.h2 
              className="text-3xl md:text-4xl font-display mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The Story Behind Sheyilor Photography
            </motion.h2>
            
            <motion.p 
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              With a passion for capturing life's most precious moments, 
              Sheyilor Photography brings a unique blend of technical expertise and artistic vision to every shoot.
            </motion.p>
            
            <motion.p 
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Our passion lies in creating authentic, emotion-filled imagery that tells your story. 
              From fashion collections to celebrity portraits, convocation ceremonies to family moments, 
              we're dedicated to preserving those fleeting moments that matter most.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-3 gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-center">
                <p className="text-4xl font-display text-accent mb-1">6+</p>
                <p className="text-sm text-muted-foreground">Services</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-display text-accent mb-1">100+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-display text-accent mb-1">500+</p>
                <p className="text-sm text-muted-foreground">Photos Delivered</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}