import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useApp } from "@/context/AppContext"
import { Mail, Globe, Briefcase, GraduationCap, MessageCircle, Plus, PackageOpen, Wrench, UserCheck, UserPlus } from "lucide-react"

export default function UserProfile() {
  const { user, listings, followUser, unfollowUser } = useApp()
  const myListings = listings.filter(l => l.owner === (user.username || user.name || "You"))

  const hasMinimumInfo = user.name || user.username
  const isProfileIncomplete = !user.name || !user.username || !user.bio

  // In a real app, we'd fetch profile by username from params
  const isSelf = true 
  const isFollowing = user.following?.includes("someone_else") ?? false

  const handleFollowToggle = () => {
    const mockTarget = "someone_else"
    if (user.following?.includes(mockTarget)) {
      unfollowUser(mockTarget)
    } else {
      followUser(mockTarget)
    }
  }

  if (!hasMinimumInfo) {
    return (
      <div className="text-center py-20 max-w-md mx-auto">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">👤</span>
        </div>
        <h2 className="text-xl font-bold mb-2">No Profile Set Up</h2>
        <p className="text-muted-foreground text-sm mb-6">Complete onboarding to start your professional journey.</p>
        <Link to="/onboarding">
          <Button>Set Up Profile</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {isProfileIncomplete && isSelf && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
              <Plus className="w-4 h-4" />
            </div>
            <p className="text-sm text-amber-800 font-medium">Your profile is incomplete. Add more details to stand out!</p>
          </div>
          <Link to="/settings">
            <Button size="sm" variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-100">Complete Now</Button>
          </Link>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar Profile Card */}
      <Card className="lg:col-span-1 h-fit sticky top-24">
        <CardContent className="pt-8 flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full border-4 border-surface shadow-soft bg-secondary flex items-center justify-center mb-4 overflow-hidden relative">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl">👨‍💻</span>
            )}
          </div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          {user.username && <p className="text-sm font-medium text-primary mt-1">@{user.username}</p>}
          
          {/* Social Stats */}
          <div className="flex justify-center gap-6 my-4 w-full">
            <Link to="/social?type=followers" className="text-center hover:opacity-80 transition-opacity">
              <p className="text-lg font-bold text-foreground">{user.followers?.length ?? 0}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Followers</p>
            </Link>
            <Link to="/social?type=following" className="text-center hover:opacity-80 transition-opacity">
              <p className="text-lg font-bold text-foreground">{user.following?.length ?? 0}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Following</p>
            </Link>
          </div>

          {user.bio && <p className="text-sm text-muted-foreground mt-3 mb-6 px-4">{user.bio}</p>}

          <div className="flex gap-2 w-full px-4">
            {isSelf ? (
              <Link to="/settings" className="flex-1">
                <Button variant="outline" className="w-full">Edit Profile</Button>
              </Link>
            ) : (
              <>
                <Button 
                  onClick={handleFollowToggle}
                  variant={isFollowing ? "outline" : "default"} 
                  className="flex-1 gap-2"
                >
                  {isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <MessageCircle className="w-4 h-4" /> Message
                </Button>
              </>
            )}
          </div>

          <div className="w-full mt-6 space-y-3 pt-6 border-t border-border text-left px-4">
            {user.displaySettings.showEmail && user.email && (
              <div className="flex items-center text-sm text-muted-foreground gap-3">
                <Mail className="w-4 h-4" /> {user.email}
              </div>
            )}
            {user.website && (
              <div className="flex items-center text-sm text-primary gap-3">
                <Globe className="w-4 h-4" /> <a href={user.website} className="hover:underline truncate">{user.website}</a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Skills */}
        {user.displaySettings.showSkills && user.skills.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-lg">Core Skills</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-secondary text-foreground text-sm font-medium rounded-md border border-border">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Experience */}
        {user.displaySettings.showExperience && user.experience.description && (
          <Card>
            <CardHeader><CardTitle className="text-lg">Experience</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{user.experience.years} years of experience</h4>
                  <p className="text-sm mt-2 text-foreground/80 leading-relaxed">{user.experience.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Education */}
        {user.displaySettings.showEducation && user.education.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-lg">Education</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {user.education.map(edu => (
                <div key={edu.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{edu.institution}{edu.year ? ` • ${edu.year}` : ""}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* My Listings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">My Listings</CardTitle>
            <Link to="/marketplace/new">
              <Button size="sm" className="gap-1"><Plus className="w-3.5 h-3.5" /> Add</Button>
            </Link>
          </CardHeader>
          <CardContent>
            {myListings.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-border rounded-lg">
                <p className="text-sm text-muted-foreground">You haven't listed anything yet.</p>
                <Link to="/marketplace/new" className="text-sm text-primary hover:underline font-medium mt-2 inline-block">
                  Create your first listing →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myListings.map(listing => (
                  <Link key={listing.id} to={`/marketplace/${listing.id}`}>
                    <div className="flex gap-3 p-3 rounded-lg border border-border hover:shadow-card transition-shadow cursor-pointer">
                      <div className="w-16 h-16 rounded-md bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
                        {listing.thumbnail ? (
                          <img src={listing.thumbnail} alt="" className="w-full h-full object-cover" />
                        ) : listing.type === "product" ? (
                          <PackageOpen className="w-6 h-6 text-muted-foreground/40" />
                        ) : (
                          <Wrench className="w-6 h-6 text-muted-foreground/40" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-sm font-semibold text-foreground truncate">{listing.title}</h5>
                        <CardDescription className="text-xs line-clamp-1 mt-0.5">{listing.description}</CardDescription>
                        <span className="text-xs font-bold text-primary mt-1 block">{listing.price || "Free"}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  )
}
