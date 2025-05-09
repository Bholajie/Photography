"use client"

import { useState, useEffect } from "react"
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || pathname !== "/" 
          ? "bg-background/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl md:text-2xl">
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
          <Button asChild size="sm" variant="outline">
            <Link href="https://www.instagram.com/sheyilor_?igsh=MTk0YnMyZDBlcHVjag==" target="_blank" rel="noopener noreferrer">
              Instagram
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/book">Book Session</Link>
          </Button>
          <ModeToggle />
        </nav>
        
        {/* Mobile Nav Toggle */}
        <div className="flex items-center md:hidden">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-2"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 p-4">
          <nav className="flex flex-col items-center space-y-6 pt-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg ${
                  pathname === link.href 
                    ? "font-medium text-accent" 
                    : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild>
              <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
                Book Session
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}