import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Bell, CheckCircle2, UserPlus, Info, ArrowLeft, MoreHorizontal, Trash2 } from "lucide-react"

export default function NotificationsPage() {
  const navigate = useNavigate()

  const notifications = [
    { id: 1, title: 'New Follower', desc: 'Arjun Mehra started following you', time: '2 mins ago', icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 2, title: 'Service Requested', desc: 'Someone requested your "React Mentorship" service', time: '1 hour ago', icon: Bell, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 3, title: 'Security Alert', desc: 'A new device logged into your account', time: '5 hours ago', icon: Info, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 4, title: 'Profile Milestone', desc: 'Your profile reached 100 views this week!', time: '1 day ago', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 5, title: 'System Update', desc: 'Check out the new Marketplace Analytics feature', time: '2 days ago', icon: Info, color: 'text-purple-500', bg: 'bg-purple-50' },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        <Button variant="outline" size="sm">Mark all as read</Button>
      </div>

      <Card className="border-border/50 shadow-soft">
        <CardContent className="p-0">
          {notifications.map((notif, idx) => (
            <div 
              key={notif.id} 
              className={`p-6 flex items-start gap-4 hover:bg-muted/30 transition-colors relative group ${idx !== notifications.length - 1 ? 'border-b border-border/50' : ''}`}
            >
              <div className={`w-12 h-12 rounded-xl ${notif.bg} flex items-center justify-center shrink-0`}>
                <notif.icon className={`w-6 h-6 ${notif.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-base">{notif.title}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">{notif.desc}</p>
                <div className="flex items-center gap-4 mt-3">
                  <button className="text-xs font-bold text-primary hover:underline">View Details</button>
                  <button className="text-xs font-bold text-muted-foreground hover:text-foreground">Dismiss</button>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="text-center pt-8 pb-12">
        <p className="text-sm text-muted-foreground italic">You're all caught up! ✨</p>
      </div>
    </div>
  )
}
