import { Calendar, Users, Camera } from "lucide-react"

export default function BookingHeader() {
  const bookingSteps = [
    {
      icon: <Camera className="h-5 w-5 text-accent" />,
      title: "Choose a Package",
      description: "Select the photography package that fits your needs"
    },
    {
      icon: <Calendar className="h-5 w-5 text-accent" />,
      title: "Pick a Date",
      description: "Find an available date and time on our calendar"
    },
    {
      icon: <Users className="h-5 w-5 text-accent" />,
      title: "Complete Booking",
      description: "Fill in your details and confirm your session"
    }
  ]

  return (
    <div className="mt-6 text-center max-w-3xl mx-auto">
      <h1 className="font-display text-4xl md:text-5xl mb-4">Book Your Session</h1>
      <p className="text-muted-foreground mb-12">
        Schedule your photography session in just a few simple steps
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bookingSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent/10 mb-4">
              {step.icon}
            </div>
            <h3 className="font-medium mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground text-center">{step.description}</p>
            
          </div>
        ))}
      </div>
    </div>
  )
}