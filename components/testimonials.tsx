"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const testimonials = [
  {
    name: "Emma Thompson",
    role: "Wedding Client",
    quote: "Working with this photographer for our wedding was the best decision we made. They captured every special moment with such artistry and emotion. We couldn't be happier with the results!",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "Portrait Session",
    quote: "I was nervous about my portrait session, but they made me feel completely at ease. The photos turned out better than I could have imagined and truly captured my personality.",
    rating: 5
  },
  {
    name: "Sophia Rodriguez",
    role: "Family Photoshoot",
    quote: "Our family photos are absolutely stunning! They were amazing with our children and somehow managed to get perfect shots even with our energetic toddler running around.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Engagement Photos",
    quote: "Our engagement photos are everything we wanted and more. The attention to detail and creativity in every shot made for a truly unique collection of memories we'll cherish forever.",
    rating: 5
  }
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })
  
  return (
    <section ref={sectionRef} className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display mb-4">Client Testimonials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear what our clients have to say
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-card rounded-lg p-8 shadow-sm border"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-card-foreground italic mb-6">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}