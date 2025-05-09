import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CategoryHeaderProps {
  category: string
  description?: string
}

export default function CategoryHeader({ category, description }: CategoryHeaderProps) {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="mb-8 mt-12 text-left">
        <Button asChild variant="ghost" size="sm" className="group mb-4 ml-0">
          <Link href="/gallery" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to galleries
          </Link>
        </Button>
        
        <h1 className="font-display text-3xl md:text-4xl">{category} Photography</h1>
        {description && (
          <p className="text-muted-foreground mt-4 max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}