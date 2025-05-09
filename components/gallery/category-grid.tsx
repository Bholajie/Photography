"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GalleryImageType } from "@/lib/types"

interface CategoryGridProps {
  images: GalleryImageType[]
}

export default function CategoryGrid({ images }: CategoryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: "-100px 0px" })
  
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
    if (e.key === "Escape") setLightboxOpen(false)
  }
  
  return (
    <>
      <motion.div 
        ref={gridRef}
        className="masonry-grid"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="masonry-item cursor-pointer rounded-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: Math.min(0.5, index * 0.05) }}
            onClick={() => openLightbox(index)}
          >
            <div className={cn(
              "relative overflow-hidden",
              image.aspectRatio === "portrait" ? "aspect-[3/4]" : 
              image.aspectRatio === "landscape" ? "aspect-[4/3]" : 
              "aspect-square"
            )}>
              <Image
                src={image.url}
                alt={image.alt || "Gallery image"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent 
          className="max-w-screen-lg bg-background/95 backdrop-blur-sm p-0 border-none" 
          onKeyDown={handleKeyDown}
        >
          <div className="relative flex items-center justify-center min-h-[60vh]">
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-2 right-2 z-50 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-50 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
              onClick={prevImage}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <div className="relative max-h-[80vh] max-w-full">
                <Image
                  src={images[currentImageIndex].url}
                  alt={images[currentImageIndex].alt || "Gallery image"}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh]"
                />
              </div>
              {images[currentImageIndex].caption && (
                <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm bg-background/70 backdrop-blur-sm py-2 px-4 rounded-md">
                  {images[currentImageIndex].caption}
                </p>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-50 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
              onClick={nextImage}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}