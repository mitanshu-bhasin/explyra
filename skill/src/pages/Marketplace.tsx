import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useApp, Listing } from "@/context/AppContext"
import { PackageOpen, Wrench, Search, Filter, Plus, X, ArrowUpDown, Sparkles } from "lucide-react"

const allCategories = [
  "All", "Web Development", "UI/UX Design", "Marketing", "AI & ML",
  "Mobile Development", "Data Science", "DevOps", "Copywriting",
  "Video Editing", "Graphic Design", "SaaS Template", "API Service", "Other"
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
} as const

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
} as const

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

  const [now, setNow] = useState(0)
  
  useEffect(() => {
    // Using setTimeout to avoid cascading renders warning and satisfy purity rules
    const timer = setTimeout(() => {
      setNow(Date.now())
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const isRecent = (date: string) => {
    if (now === 0) return false
    const parsedDate = new Date(date).getTime()
    if (isNaN(parsedDate)) return false
    const diff = now - parsedDate
    return diff < 1000 * 60 * 60 * 24 * 2 // 2 days
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Marketplace
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover and list premium digital products and freelance services.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/marketplace/new">
            <Button className="gap-2 px-6 h-11 bg-primary hover:scale-105 transition-transform">
              <Plus className="w-5 h-5" /> Add Listing
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex bg-secondary/80 backdrop-blur-sm p-1 rounded-xl w-fit border border-border/50">
            {([["all", "All"], ["product", "Products"], ["service", "Services"]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`relative px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  tab === key 
                    ? "bg-surface shadow-md text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
                }`}
              >
                {label}
                {tab === key && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-surface rounded-lg -z-10 shadow-sm"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className={`gap-2 h-10 border-border/60 ${showFilters ? "bg-secondary" : ""}`} 
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" /> 
              <span>Filters</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 h-10 border-border/60"
              onClick={() => setSortBy((s: "newest" | "oldest") => s === "newest" ? "oldest" : "newest")}
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>{sortBy === "newest" ? "Newest" : "Oldest"}</span>
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4.5 w-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description, or category..."
            className="w-full h-12 pl-11 pr-12 rounded-xl border border-border bg-surface text-base transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="absolute right-3.5 top-3.5 p-0.5 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 p-5 bg-secondary/30 rounded-2xl border border-border/50 backdrop-blur-xs">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all border ${
                    selectedCategory === cat
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                      : "bg-surface text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {filtered.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 border-2 border-dashed border-border/60 rounded-3xl"
        >
          <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <PackageOpen className="w-10 h-10 text-muted-foreground/30" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No listings found</h3>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Link to="/marketplace/new">
            <Button variant="secondary" className="gap-2">
              <Plus className="w-4 h-4" /> Add New Listing
            </Button>
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filtered.map((listing: Listing) => (
            <motion.div key={listing.id} variants={itemVariants}>
              <Link to={`/marketplace/${listing.id}`}>
                <Card className="group hover:border-primary/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden border-border/60">
                  {/* Thumbnail */}
                  <div className="h-48 bg-secondary/30 relative overflow-hidden">
                    {listing.thumbnail ? (
                      <img
                        src={listing.thumbnail}
                        alt={listing.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = "none" }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-20">
                        {listing.type === "product"
                          ? <PackageOpen className="w-14 h-14" />
                          : <Wrench className="w-14 h-14" />
                        }
                      </div>
                    )}
                    
                    {/* Floating badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded shadow-sm ${
                        listing.type === "product" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
                      }`}>
                        {listing.type}
                      </span>
                      {isRecent(listing.createdAt) && (
                        <span className="bg-amber-400 text-amber-950 text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> NEW
                        </span>
                      )}
                    </div>
                  </div>

                  <CardHeader className="p-5 pb-3">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-bold text-primary/80 uppercase tracking-tight">
                        {listing.category}
                      </span>
                      <span className="text-base font-black text-foreground">
                        {listing.price || "Free"}
                      </span>
                    </div>
                    <CardTitle className="text-lg mt-2 font-bold group-hover:text-primary transition-colors line-clamp-1">
                      {listing.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-between">
                    <CardDescription className="text-sm line-clamp-2 leading-relaxed">
                      {listing.description}
                    </CardDescription>
                    
                    <div className="flex items-center gap-2.5 mt-6 pt-4 border-t border-border/50">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary/20 to-primary/40 flex items-center justify-center text-[10px] font-bold text-primary">
                        {listing.owner.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {listing.owner}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
