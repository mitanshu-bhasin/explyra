import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Mail, Lock, User, ArrowRight } from "lucide-react"

export default function Signup() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate signup, redirect to onboarding 
    setTimeout(() => {
      navigate('/onboarding')
    }, 1000)
  }

  return (
    <Card className="w-full border-border/50 shadow-card">
      <CardHeader className="space-y-1 text-center pb-6">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>Join the fastest growing skill network</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Full Name" 
                className="pl-9" 
                required 
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="email" 
                placeholder="name@company.com" 
                className="pl-9" 
                required 
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="password" 
                placeholder="Create a password" 
                className="pl-9" 
                required 
              />
            </div>
          </div>
          <Button type="submit" className="w-full group" disabled={loading}>
            {loading ? "Creating account..." : "Continue"}
            {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
          </Button>
        </form>

        <div className="mt-5 text-center text-xs text-muted-foreground">
           By clicking continue, you agree to our Terms of Service and Privacy Policy.
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
