import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useApp, Listing } from "@/context/AppContext"
import { PackageOpen, Wrench, Search, Filter, Plus, X, ArrowUpDown } from "lucide-react"

const allCategories = [
  "All", "Web Development", "UI/UX Design", "Marketing", "AI & ML",
  "Mobile Development", "Data Science", "DevOps", "Copywriting",
  "Video Editing", "Graphic Design", "SaaS Template", "API Service", "Other"
]

export default function Marketplace() {
  const { listings } = useApp()
  const [tab, setTab] = useState<"all" | "product" | "service">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")
  const [showFilters, setShowFilters] = useState(false)

  // Filter logic
  const filtered = listings
    .filter((l: Listing) => tab === "all" || l.type === tab)
    .filter((l: Listing) => selectedCategory === "All" || l.category === selectedCategory)
    .filter((l: Listing) => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      return l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.category.toLowerCase().includes(q)
    })
    .sort((a: Listing, b: Listing) => sortBy === "newest"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Discover and list digital products and freelance services.</p>
        </div>
        <Link to="/marketplace/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add Listing
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex bg-secondary p-1 rounded-lg w-fit">
        {([["all", "All"], ["product", "Products"], ["service", "Services"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${tab === key ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search + Filter Row */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description, or category..."
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:border-primary"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-2.5">
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="w-4 h-4" /> <span className="hidden sm:inline">Filters</span>
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setSortBy((s: "newest" | "oldest") => s === "newest" ? "oldest" : "newest")}
        >
          <ArrowUpDown className="w-4 h-4" />
          <span className="hidden sm:inline">{sortBy === "newest" ? "Newest" : "Oldest"}</span>
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 p-4 bg-secondary/50 rounded-lg border border-border">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${selectedCategory === cat
                ? "bg-primary text-white border-primary"
                : "bg-surface text-muted-foreground border-border hover:border-primary/50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-xl">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <PackageOpen className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">No listings yet</h3>
          <p className="text-sm text-muted-foreground mb-4">Be the first to add a product or service!</p>
          <Link to="/marketplace/new">
            <Button className="gap-2"><Plus className="w-4 h-4" /> Create Your First Listing</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((listing: Listing) => (
            <Link key={listing.id} to={`/marketplace/${listing.id}`}>
              <Card className="hover:-translate-y-1 transition-all duration-300 hover:shadow-float cursor-pointer h-full flex flex-col">
                {/* Thumbnail */}
                <div className="h-40 bg-secondary flex items-center justify-center rounded-t-xl overflow-hidden">
                  {listing.thumbnail ? (
                    <img
                      src={listing.thumbnail}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = "none" }}
                    />
                  ) : (
                    listing.type === "product"
                      ? <PackageOpen className="w-12 h-12 text-muted-foreground opacity-20" />
                      : <Wrench className="w-12 h-12 text-muted-foreground opacity-20" />
                  )}
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm ${listing.type === "product" ? "text-blue-700 bg-blue-50" : "text-green-700 bg-green-50"
                      }`}>
                      {listing.category}
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      {listing.price || "Free"}
                    </span>
                  </div>
                  <CardTitle className="text-base mt-2 line-clamp-1">{listing.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2 flex-1 flex flex-col justify-between">
                  <CardDescription className="line-clamp-2">{listing.description}</CardDescription>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                    <div className="w-5 h-5 rounded-full bg-slate-200" />
                    <span className="text-xs font-medium text-foreground">{listing.owner}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
