import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useApp } from "@/context/AppContext"
import { PackageOpen, Wrench, ImageIcon, DollarSign, Tag, AlignLeft, ArrowLeft } from "lucide-react"

const categories = [
  "Web Development", "UI/UX Design", "Marketing", "AI & ML",
  "Mobile Development", "Data Science", "DevOps", "Copywriting",
  "Video Editing", "Graphic Design", "SaaS Template", "API Service", "Other"
]

export default function AddListing() {
  const navigate = useNavigate()
  const { addListing } = useApp()

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    type: "product" as "product" | "service",
    category: categories[0],
    thumbnail: "",
  })

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    addListing(form)
    navigate("/marketplace")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <Card className="border-border/50 shadow-card">
        <CardHeader className="bg-muted/30 border-b border-border/50">
          <CardTitle className="text-xl">List a Product or Service</CardTitle>
          <CardDescription>Add details about what you're offering to the marketplace.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Toggle */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Type</label>
              <div className="flex bg-secondary p-1 rounded-lg w-fit">
                <button
                  type="button"
                  onClick={() => update("type", "product")}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center gap-2 ${form.type === "product" ? "bg-white shadow-sm text-primary" : "text-muted-foreground"
                    }`}
                >
                  <PackageOpen className="w-4 h-4" /> Product
                </button>
                <button
                  type="button"
                  onClick={() => update("type", "service")}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center gap-2 ${form.type === "service" ? "bg-white shadow-sm text-primary" : "text-muted-foreground"
                    }`}
                >
                  <Wrench className="w-4 h-4" /> Service
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                value={form.title}
                onChange={e => update("title", e.target.value)}
                placeholder={form.type === "product" ? "e.g. Next.js SaaS Starter Kit" : "e.g. Full-Stack Web Development"}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <textarea
                  value={form.description}
                  onChange={e => update("description", e.target.value)}
                  placeholder="Describe what you're offering in detail..."
                  className="flex min-h-[120px] w-full rounded-md border border-border bg-transparent px-9 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-none"
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {form.type === "product" ? "Price" : "Rate / Skill Exchange"}
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={form.price}
                  onChange={e => update("price", e.target.value)}
                  placeholder={form.type === "product" ? "$49" : "Skill Exchange / $50/hr"}
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <div className="relative">
                <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <select
                  value={form.category}
                  onChange={e => update("category", e.target.value)}
                  className="flex h-9 w-full rounded-md border border-border bg-transparent pl-9 pr-4 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary appearance-none"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Thumbnail URL (optional)</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={form.thumbnail}
                  onChange={e => update("thumbnail", e.target.value)}
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>
              {form.thumbnail && (
                <div className="mt-2 rounded-lg overflow-hidden border border-border h-40 bg-secondary">
                  <img src={form.thumbnail} alt="Preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Publish Listing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
