"use client"

import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react"
import { FaTiktok } from "react-icons/fa"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function ContactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })
  
  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+234 8167976266"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "Sheyilorphotography@gmail.com"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Orisunbare, Lagos, Nigeria"
    }
  ]
  
  const socialLinks = [
    {
      icon: <Instagram className="h-6 w-6" />,
      label: "Instagram",
      href: "https://instagram.com/sheyilor_"
    },
    {
      icon: <FaTiktok className="h-6 w-6" />,
      label: "TikTok",
      href: "https://tiktok.com/sheyilor_"
    },
    {
      icon: <Twitter className="h-6 w-6" />,
      label: "Twitter",
      href: "https://x.com/its_sheyilor"
    }
  ]
  
  return (
    <section ref={sectionRef} className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or ready to book? Reach out and let's create something beautiful together
          </p>
        </motion.div>
        
        <motion.div
          className="max-w-4xl mx-auto bg-background rounded-lg shadow-sm border p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-display mb-6">Contact Information</h3>
              
              <div className="space-y-4 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-display mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link 
                    key={index} 
                    href={social.href}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-display mb-6">Send a Message</h3>
              <p className="text-muted-foreground mb-6">
                Fill out the form below or email us directly. We'll get back to you within 24 hours.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}