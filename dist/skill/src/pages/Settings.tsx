import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useApp } from "@/hooks/useApp"
import { User, Settings as SettingsIcon, Shield, Trash2, Globe, Mail, CheckCircle2 } from "lucide-react"

export default function Settings() {
  const navigate = useNavigate()
  const { user, setUser, deleteAccount } = useApp()
  const [formData, setFormData] = useState({ ...user })
  const [isSaved, setIsSaved] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [activeTab, setActiveTab] = useState<"profile" | "visibility" | "security">("profile")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setUser(formData)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleDeleteAccount = () => {
    deleteAccount()
    navigate("/login")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <SettingsIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground text-sm">Manage your professional profile and account preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-1">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === 'profile' ? 'bg-primary text-white shadow-soft' : 'text-muted-foreground hover:bg-secondary'}`}
          >
            <User className="w-4 h-4" /> Profile Info
          </button>
          <button 
            onClick={() => setActiveTab("visibility")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === 'visibility' ? 'bg-primary text-white shadow-soft' : 'text-muted-foreground hover:bg-secondary'}`}
          >
            <Globe className="w-4 h-4" /> Public Visibility
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === 'security' ? 'bg-primary text-white shadow-soft' : 'text-muted-foreground hover:bg-secondary'}`}
          >
            <Shield className="w-4 h-4" /> Security
          </button>
        </div>

        {/* Form Content */}
        <div className="md:col-span-2 space-y-6">
          {activeTab === "profile" && (
            <Card className="border-border/50 shadow-soft">
              <CardHeader className="border-b border-border/50 bg-muted/20">
                <CardTitle className="text-lg text-foreground">Personal Information</CardTitle>
                <CardDescription>Update your display name and contact details.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Full Name</label>
                      <Input 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Username</label>
                      <Input 
                        value={formData.username} 
                        onChange={e => setFormData({...formData, username: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-9"
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-9"
                        value={formData.website} 
                        onChange={e => setFormData({...formData, website: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Button type="submit" disabled={isSaved}>
                      {isSaved ? "Saved Changes" : "Save Changes"}
                    </Button>
                    {isSaved && (
                      <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium animate-in fade-in slide-in-from-left-2">
                        <CheckCircle2 className="w-4 h-4" /> Profile updated successfully
                      </span>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="border-border/50 shadow-soft">
              <CardHeader className="border-b border-border/50 bg-muted/20">
                <CardTitle className="text-lg text-foreground">Security Settings</CardTitle>
                <CardDescription>Secure your account with multi-factor authentication and managed sessions.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Change Password</h4>
                  <div className="space-y-4">
                    <Input type="password" placeholder="Current Password" />
                    <Input type="password" placeholder="New Password" />
                    <Input type="password" placeholder="Confirm New Password" />
                    <Button variant="outline" size="sm">Update Password</Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold">Two-Factor Authentication</h4>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Active Sessions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">Chrome on Windows (This Device)</p>
                          <p className="text-[10px] text-muted-foreground">Active now • New Delhi, India</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Current</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dangerous Zone */}
          <Card className="border-red-100 shadow-soft overflow-hidden">
            <CardHeader className="bg-red-50/50 border-b border-red-100/50">
              <CardTitle className="text-lg text-red-900 flex items-center gap-2">
                <Trash2 className="w-5 h-5" /> Danger Zone
              </CardTitle>
              <CardDescription className="text-red-700/70">Permanently remove your account and all associated data.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {!showDeleteConfirm ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-red-900">Delete Account</h4>
                    <p className="text-xs text-red-700/80 mt-1">Once you delete your account, there is no going back. Please be certain.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 shrink-0"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete Account
                  </Button>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-100 rounded-lg space-y-4 animate-in zoom-in-95 duration-200">
                  <p className="text-sm font-semibold text-red-900 text-center">Are you absolutely sure?</p>
                  <p className="text-xs text-red-700 text-center">All your products, services, and profile data will be erased forever.</p>
                  <div className="flex gap-3 justify-center">
                    <Button 
                      variant="outline" 
                      className="bg-white"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white border-none"
                      onClick={handleDeleteAccount}
                    >
                      Yes, Delete My Account
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
