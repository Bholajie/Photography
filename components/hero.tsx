"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const heroImages = [
  "/images/hero/SHEY1262.jpg",
  "/images/hero/SHEY8892.jpg",
  "/images/hero/SHEY9790.jpg",
  "/images/hero/SHEY0039.jpg",
  "/images/hero/SHEY3329.jpg",
  "/images/hero/SHEY1717.jpg",
  "/images/hero/SHEY7165.jpg",
  "/images/hero/SHEY7690.jpg",
  "/images/hero/SHEY9463.jpg",
  "/images/hero/SHEY0578.jpg",
  "/images/hero/SHEY7452.jpg",
  "/images/hero/SHEY6382.jpg",
  "/images/hero/SHEY6090.jpg",
  "/images/hero/IMG_0336.JPEG",
  "/images/hero/IMG_0094.JPEG",
  "/images/hero/SHEY1418.jpg",
  "/images/hero/SHEY4400.jpg",
  "/images/hero/SHEY6044.jpg",
  "/images/hero/SHEY0859.jpg",
  "/images/hero/SHEY7098.jpg",
  "/images/hero/SHEY0408.jpg",
  "/images/hero/SHEY9212_(2)1.jpg"
]

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Images */}
      {heroImages.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 w-full h-full transition-opacity duration-2000 ${
            idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Hero background ${idx + 1}`}
            fill
            priority={idx === 0}
            quality={100}
            sizes="100vw"
            className="object-contain"
            style={{
              objectFit: 'contain',
              objectPosition: 'center'
            }}
          />
        </div>
      ))}
      
      {/* Stylish Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70 z-[1]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent z-[2]" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent z-[2]" />
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10 text-center text-white relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white/30" />
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-4 tracking-tight">
            Sheyilor Photography
          </h1>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white/30" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white/90">
            Capturing moments through Fashion, Celebrity Portraits, Convocation, Birthday, Family, Maternity, Wedding, Pre Wedding, and Event Candids Photography
          </p>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button asChild size="lg" className="bg-white/90 text-black hover:bg-white transition-all duration-300">
            <Link href="/gallery">View Portfolio</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white bg-transparent border-white hover:bg-white/10 transition-all duration-300">
            <Link href="/book">Book a Session</Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </motion.div>
    </div>
  )
}