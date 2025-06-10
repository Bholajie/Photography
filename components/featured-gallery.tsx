"use client"

import React, { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const featuredCategories = [
  {
    id: "birthday",
    name: "Birthday Portrait",
    image: "/images/BirthdayPortrait/SHEY7690.jpg",
    description: "Special birthday portrait sessions celebrating milestones"
  },
  {
    id: "celebrity",
    name: "Celebrity Portraits",
    image: "/images/CelebrityPortraits/SHEY6090.jpg",
    description: "Exclusive celebrity portrait photography capturing star power"
  },
  {
    id: "wedding-portraits",
    name: "Wedding Portraits",
    image: "/images/WeddingPortraits/SHEY3763.jpg",
    description: "Timeless wedding portraits capturing the joy and love of your special day."
  },
  {
    id: "fashion",
    name: "Fashion Collection",
    image: "/images/FashionCollection/SHEY5991.jpg",
    description: "Professional fashion photography showcasing style and elegance"
  },
  {
    id: "convocation",
    name: "Convocation",
    image: "/images/Convocation/SHEY6382.jpg",
    description: "Memorable graduation photography capturing academic achievements"
  },
  {
    id: "family",
    name: "Family Portrait",
    image: "/images/FamilyPortrait/SHEY7165.jpg",
    description: "Heartwarming family portraits capturing precious moments"
  },
  {
    id: "maternity",
    name: "Maternity",
    image: "/images/Maternity/SHEY1801.jpg",
    description: "Beautiful maternity photography celebrating motherhood"
  },
  {
    id: "pre-wedding-portraits",
    name: "Pre Wedding Portraits",
    image: "/images/PreWeddingPortraits/SHEY1616.jpg",
    description: "Romantic pre-wedding portraits to celebrate your journey together."
  },
  {
    id: "events-candids",
    name: "Events Candids",
    image: "/images/EventsCandids/SHEY2656.jpg",
    description: "Candid event photography capturing genuine moments and emotions."
  }
]

export default function FeaturedGallery() {
  const sectionRef = React.useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display mb-4">Our Portfolio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse collection of photography work across various styles and occasions
          </p>
        </motion.div>
        <div className="relative px-4 md:px-8">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 2.5, spaceBetween: 32 }
            }}
            className="!pb-12"
          >
            {featuredCategories.map((category, index) => (
              <SwiperSlide key={category.id}>
                <motion.div 
                  className="group relative overflow-hidden rounded-lg h-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="aspect-[4/5] relative">
                    <Image 
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-2xl font-display mb-2">{category.name}</h3>
                      <p className="text-white/80 mb-4">{category.description}</p>
                      <Button asChild variant="outline" className="border-white text-white bg-transparent hover:bg-white/20">
                        <Link href={`/gallery/${category.id}`}>
                          View Gallery <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
            {/* Custom navigation buttons */}
            <Button
              ref={prevRef}
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background z-10 rounded-full shadow-md"
              style={{ width: 40, height: 40 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              ref={nextRef}
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background z-10 rounded-full shadow-md"
              style={{ width: 40, height: 40 }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Swiper>
        </div>
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button asChild size="lg">
            <Link href="/gallery">Explore Full Gallery</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}