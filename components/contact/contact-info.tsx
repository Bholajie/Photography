import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { FaTiktok } from "react-icons/fa"
import { Instagram, Twitter } from "lucide-react"

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: <Phone className="h-5 w-5 text-accent" />,
      title: "Phone",
      details: [
        { label: "Main Line", value: "+2348167976266" }
      ]
    },
    {
      icon: <Mail className="h-5 w-5 text-accent" />,
      title: "Email",
      details: [
        { label: "General Inquiries", value: "sheyilorphotography@gmail.com" }
      ]
    },
    {
      icon: <MapPin className="h-5 w-5 text-accent" />,
      title: "Studio Location",
      details: [
        { label: "Address", value: "Orisunbare, Nigeria" }
      ]
    },
    {
      icon: <Clock className="h-5 w-5 text-accent" />,
      title: "Hours",
      details: [
        { label: "Monday-Friday", value: "9:00 AM - 6:00 PM" },
        { label: "Weekends", value: "By appointment only" }
      ]
    }
  ]
  
  const socialMedia = [
    { 
      icon: <Instagram className="h-5 w-5" />, 
      name: "Instagram", 
      url: "https://instagram.com/sheyilor_" 
    },
    { 
      icon: <FaTiktok className="h-5 w-5" />, 
      name: "TikTok", 
      url: "https://www.tiktok.com/@sheyilor_" 
    },
    { 
      icon: <Twitter className="h-5 w-5" />, 
      name: "Twitter", 
      url: "https://x.com/its_sheyilor" 
    }
  ]
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display mb-6">Contact Information</h2>
        <p className="text-muted-foreground mb-8">
          Have questions about our services or want to book a session? We'd love to hear from you.
        </p>
      </div>
      
      <div className="space-y-6">
        {contactDetails.map((item, index) => (
          <div key={index} className="flex">
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-accent/10 mr-4">
              {item.icon}
            </div>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <div className="mt-1 space-y-1">
                {item.details.map((detail, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-sm text-muted-foreground">{detail.label}</span>
                    <span>{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <h3 className="font-semibold mb-3">Connect With Us</h3>
        <div className="flex space-x-4">
          {socialMedia.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary hover:bg-accent/10 transition-colors"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}