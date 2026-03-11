import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useApp } from "@/context/AppContext"
import { ArrowLeft, PackageOpen, Wrench, User, Check, Tag, DollarSign, Calendar } from "lucide-react"

export default function ListingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { listings, toggleRequest } = useApp()

  const listing = listings.find(l => l.id === id)

  if (!listing) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="text-muted-foreground text-lg">Listing not found.</p>
        <Button variant="outline" onClick={() => navigate("/marketplace")} className="mt-4">
          Back to Marketplace
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </button>

      <Card className="overflow-hidden shadow-float border-border/50">
        {/* Thumbnail */}
        {listing.thumbnail ? (
          <div className="h-64 bg-secondary overflow-hidden">
            <img
              src={listing.thumbnail}
              alt={listing.title}
              className="w-full h-full object-cover"
              onError={e => { e.currentTarget.style.display = "none" }}
            />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
            {listing.type === "product"
              ? <PackageOpen className="w-16 h-16 text-muted-foreground/30" />
              : <Wrench className="w-16 h-16 text-muted-foreground/30" />
            }
          </div>
        )}

        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-md ${listing.type === "product" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"
              }`}>
              {listing.type}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Tag className="w-3 h-3" /> {listing.category}
            </span>
          </div>
          <CardTitle className="text-2xl">{listing.title}</CardTitle>
          <CardDescription className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> {listing.owner}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {new Date(listing.createdAt).toLocaleDateString()}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Price */}
          <div className="flex items-center gap-2 p-4 bg-secondary/50 rounded-lg border border-border">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="text-lg font-bold text-foreground">{listing.price || "Free / Skill Exchange"}</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {listing.requested ? (
              <Button disabled className="flex-1 gap-2 bg-green-600 hover:bg-green-600 text-white">
                <Check className="w-4 h-4" /> Request Sent
              </Button>
            ) : (
              <Button onClick={() => toggleRequest(listing.id)} className="flex-1">
                {listing.type === "product" ? "Buy / Request Access" : "Request This Service"}
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate("/marketplace")}>
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
