"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/book", label: "Book" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const scrollPosRef = useRef(0)

  // Track scroll position for header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initialize on mount
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle mobile menu toggle with proper scroll position management
  const toggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      // Store current scroll position before opening menu
      scrollPosRef.current = window.scrollY
      
      // Apply fixed position to body to prevent scrolling
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPosRef.current}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore body positioning
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      
      // Restore scroll position
      window.scrollTo(0, scrollPosRef.current)
    }
    
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Clean up body styles on unmount
  useEffect(() => {
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || pathname !== "/" 
          ? "bg-white dark:bg-black shadow-sm py-3"
          : "bg-white/80 dark:bg-black/80 py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl md:text-2xl relative z-50">
          Sheyilor Photography
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-accent ${
                pathname === link.href 
                  ? "font-medium text-accent" 
                  : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ModeToggle />
        </nav>
        
        {/* Mobile Nav Toggle */}
        <div className="flex items-center md:hidden relative z-50">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            className="ml-2"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu with pre-rendered empty container for smooth transitions */}
      <div 
        className={`md:hidden fixed inset-0 bg-background z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <nav className="flex flex-col items-center space-y-8 w-full max-w-xs">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => toggleMobileMenu()}
                className={`text-xl transition-colors ${
                  pathname === link.href 
                    ? "font-medium text-accent" 
                    : "text-foreground hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}