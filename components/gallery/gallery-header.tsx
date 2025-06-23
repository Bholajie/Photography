import { MoveRight } from "lucide-react"
import Link from "next/link"

export default function GalleryHeader() {
  return (
    <div className="max-w-4xl mt-6 mx-auto text-center mb-12">
      <h1 className="font-display text-4xl md:text-5xl mb-4">Our Portfolio</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
        Explore our diverse collection of photography work, capturing life's precious moments with artistry and authenticity.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4">
        {[
          { label: "Fashion Collection", slug: "fashion" },
          { label: "Celebrity Portraits", slug: "celebrity" },
          { label: "Convocation", slug: "convocation" },
          { label: "Birthday Portrait", slug: "birthday" },
          { label: "Family Portrait", slug: "family" },
          { label: "Maternity", slug: "maternity" },
          { label: "Wedding Portraits", slug: "wedding-portraits" },
          { label: "Pre Wedding Portraits", slug: "pre-wedding-portraits" },
          { label: "Events Candids", slug: "events-candids" },
          { label: "Call to Bar", slug: "call-to-bar" }
        ].map((category) => (
          <Link
            key={category.slug}
            href={`/gallery/${category.slug}`}
            className="inline-flex items-center px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {category.label}
            <MoveRight className="ml-2 h-4 w-4" />
          </Link>
        ))}
      </div>
    </div>
  )
}