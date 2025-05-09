export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl mb-4">Sheyilor Photography</h3>
            <p className="text-muted-foreground">
              Capturing life's moments with artistry and emotion.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-muted-foreground hover:text-accent">Home</a></li>
              <li><a href="/gallery" className="text-muted-foreground hover:text-accent">Gallery</a></li>
              <li><a href="/book" className="text-muted-foreground hover:text-accent">Book a Session</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-accent">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/gallery/fashion" className="text-muted-foreground hover:text-accent">Fashion Collection</a></li>
              <li><a href="/gallery/celebrity" className="text-muted-foreground hover:text-accent">Celebrity Portraits</a></li>
              <li><a href="/gallery/convocation" className="text-muted-foreground hover:text-accent">Convocation</a></li>
              <li><a href="/gallery/birthday" className="text-muted-foreground hover:text-accent">Birthday Portrait</a></li>
              <li><a href="/gallery/family" className="text-muted-foreground hover:text-accent">Family Portrait</a></li>
              <li><a href="/gallery/maternity" className="text-muted-foreground hover:text-accent">Maternity</a></li>
              <li><a href="/gallery/wedding-portraits" className="text-muted-foreground hover:text-accent">Wedding Portraits</a></li>
              <li><a href="/gallery/pre-wedding-portraits" className="text-muted-foreground hover:text-accent">Pre Wedding Portraits</a></li>
              <li><a href="/gallery/events-candids" className="text-muted-foreground hover:text-accent">Events Candids</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <address className="not-italic text-muted-foreground">
              <p>Orisunbare, Nigeria</p>
              <p className="mt-2">+2348167976266</p>
              <p className="mt-2">sheyilorphotography@gmail.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Sheyilor Photography. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-accent text-sm">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-accent text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}