import { useNavigate, useSearchParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useApp } from "@/context/AppContext"
import { ArrowLeft, UserPlus, UserCheck, Search, MoreVertical } from "lucide-react"

export default function FollowList() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const type = searchParams.get("type") || "followers" // "followers" or "following"
  const { user, followUser, unfollowUser } = useApp()

  // Mock users for the list
  const mockUsers = [
    { id: "1", name: "Arjun Mehra", username: "arjun_dev", bio: "Product Designer & Coffee Enthusiast", imageUrl: "https://i.pravatar.cc/150?u=arjun" },
    { id: "2", name: "Priya Sharma", username: "priya_codes", bio: "Full Stack Developer | React | Node.js", imageUrl: "https://i.pravatar.cc/150?u=priya" },
    { id: "3", name: "Rohan Gupta", username: "rohan_g", bio: "Tech Lead at StartUp Inc.", imageUrl: "https://i.pravatar.cc/150?u=rohan" },
    { id: "4", name: "Sanya Verma", username: "sanya_ux", bio: "UX Researcher | Human Centered Design", imageUrl: "https://i.pravatar.cc/150?u=sanya" },
  ]

  const isUserFollowing = (username: string) => user.following.includes(username)

  const handleToggle = (username: string) => {
    if (isUserFollowing(username)) {
      unfollowUser(username)
    } else {
      followUser(username)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold capitalize">{type}</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder={`Search ${type}...`} 
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
        />
      </div>

      <Card className="border-border/50 shadow-soft">
        <CardContent className="p-0">
          {mockUsers.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground italic">
              No {type} found.
            </div>
          ) : (
            mockUsers.map((u, idx) => (
              <div 
                key={u.id} 
                className={`p-4 flex items-center justify-between gap-4 group ${idx !== mockUsers.length - 1 ? 'border-b border-border/10' : ''}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-border bg-muted shrink-0">
                    <img src={u.imageUrl} alt={u.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-foreground truncate">{u.name}</h4>
                    <p className="text-xs text-primary font-medium">@{u.username}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{u.bio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant={isUserFollowing(u.username) ? "outline" : "default"}
                    className="h-8 gap-1.5"
                    onClick={() => handleToggle(u.username)}
                  >
                    {isUserFollowing(u.username) ? (
                      <><UserCheck className="w-3.5 h-3.5" /> Following</>
                    ) : (
                      <><UserPlus className="w-3.5 h-3.5" /> Follow</>
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
