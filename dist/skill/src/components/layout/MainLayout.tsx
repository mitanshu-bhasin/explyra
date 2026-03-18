import { useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { Home, LayoutGrid, UserCircle, Bell, Search, CheckCircle2, UserPlus, Info, X, ArrowRight } from "lucide-react"

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  
  const navItems = [
    { name: 'Feed', path: '/feed', icon: Home },
    { name: 'Marketplace', path: '/marketplace', icon: LayoutGrid },
    { name: 'Profile', path: '/profile/me', icon: UserCircle },
  ]

  const mockNotifications = [
    { id: 1, title: 'New Follower', desc: 'Arjun Mehra started following you', icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-50', time: '2m ago' },
    { id: 2, title: 'Profile Updated', desc: 'Your profile changes were saved', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', time: '1h ago' },
    { id: 3, title: 'Tips', desc: 'Add a project showcase to boost views', icon: Info, color: 'text-amber-500', bg: 'bg-amber-50', time: '3h ago' },
  ]

  // Mock search results
  const searchResults = searchQuery.trim() ? [
    { type: 'user', title: 'Arjun Mehra', subtitle: '@arjun_dev • Product Designer', path: '/social?type=followers' },
    { type: 'user', title: 'Priya Sharma', subtitle: '@priya_codes • Full Stack Dev', path: '/social?type=following' },
    { type: 'listing', title: 'React Dashboard Template', subtitle: 'Product • Web Development', path: '/marketplace' },
    { type: 'page', title: 'Settings', subtitle: 'Account & Security', path: '/settings' },
  ].filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) : []

  const handleSearchSelect = (path: string) => {
    setSearchQuery("")
    setShowSearchResults(false)
    navigate(path)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">
          <div className="flex items-center gap-2">
            <Link to="/feed" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 fill-transparent stroke-white" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-bold text-lg hidden sm:block">Explyra Skill</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:block relative">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setShowSearchResults(true) }}
                onFocus={() => setShowSearchResults(true)}
                placeholder="Search skills, users, or products..." 
                className="w-full h-9 pl-9 pr-9 rounded-full border border-border bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setShowSearchResults(false) }} className="absolute right-3 top-2.5">
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery.trim() && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowSearchResults(false)} />
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-border shadow-float z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  {searchResults.length > 0 ? (
                    <div className="max-h-[300px] overflow-y-auto">
                      {searchResults.map((result, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSearchSelect(result.path)}
                          className="w-full p-3 flex items-center gap-3 hover:bg-muted/40 transition-colors text-left border-b border-border/30 last:border-0"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            result.type === 'user' ? 'bg-blue-50 text-blue-500' : 
                            result.type === 'listing' ? 'bg-green-50 text-green-500' :
                            'bg-purple-50 text-purple-500'
                          }`}>
                            {result.type === 'user' ? <UserCircle className="w-4 h-4" /> :
                             result.type === 'listing' ? <LayoutGrid className="w-4 h-4" /> :
                             <ArrowRight className="w-4 h-4" />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">{result.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-sm text-muted-foreground">No results for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map(item => (
              <Link key={item.path} to={item.path} className={`p-2 rounded-md flex items-center gap-2 transition-colors ${location.pathname.startsWith(item.path) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium hidden sm:block">{item.name}</span>
              </Link>
            ))}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 ml-2 relative rounded-full transition-colors ${showNotifications ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* Notifications Popover */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl border border-border shadow-float z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
                      <h3 className="font-bold text-sm">Notifications</h3>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{mockNotifications.length} new</span>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {mockNotifications.map(notif => (
                        <div key={notif.id} className="p-4 border-b border-border hover:bg-muted/30 transition-colors flex gap-3 cursor-pointer">
                          <div className={`w-9 h-9 rounded-lg ${notif.bg} flex items-center justify-center shrink-0`}>
                            <notif.icon className={`w-5 h-5 ${notif.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold">{notif.title}</p>
                              <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{notif.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-muted/10 text-center">
                      <Link 
                        to="/notifications" 
                        onClick={() => setShowNotifications(false)}
                        className="text-xs font-semibold text-primary hover:underline block"
                      >
                        View All Notifications
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 relative">
         <Outlet />
      </main>
    </div>
  )
}
