"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GalleryCategoryType } from "@/lib/types"

interface GalleryGridProps {
  categories: GalleryCategoryType[]
}

export default function GalleryGrid({ categories }: GalleryGridProps) {
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: "-100px 0px" })
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }
  
  return (
    <motion.div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {categories.map((category) => (
        <motion.div
          key={category.slug}
          className="group relative overflow-hidden rounded-lg min-h-[500px]"
          variants={item}
        >
          <Image
            src={category.coverImage}
            alt={category.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/0">
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="text-white text-2xl font-display mb-2">{category.name}</h3>
              <p className="text-white/80 mb-4 line-clamp-2">{category.description}</p>
              <Link 
                href={`/gallery/${category.slug}`}
                className="inline-flex items-center text-white underline underline-offset-2 text-sm hover:text-accent transition-colors"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}