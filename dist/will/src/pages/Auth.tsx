import { useState } from "react";
import { useSearchParams, Navigate, Link } from "react-router-dom";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "login";
  const [mode, setMode] = useState<"login" | "signup" | "forgot">(tab === "signup" ? "signup" : "login");
  const { user, signIn, signUp, resetPassword, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
        toast.success("Welcome back!");
      } else if (mode === "signup") {
        await signUp(email, password, fullName);
        toast.success("Account created! Check your email to verify.");
      } else {
        await resetPassword(email);
        toast.success("Password reset email sent!");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-display font-bold">
              {mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Your Vault" : "Reset Password"}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              {mode === "login" ? "Sign in to access your digital vault" : mode === "signup" ? "Start securing your digital legacy today" : "We'll send you a reset link"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" required />
              </div>
            )}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            {mode !== "forgot" && (
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
              {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
            </Button>

            <div className="text-center text-sm space-y-2 pt-2">
              {mode === "login" && (
                <>
                  <button type="button" onClick={() => setMode("forgot")} className="text-primary hover:underline block mx-auto">Forgot password?</button>
                  <p className="text-muted-foreground">Don't have an account? <button type="button" onClick={() => setMode("signup")} className="text-primary hover:underline">Sign up</button></p>
                </>
              )}
              {mode === "signup" && (
                <p className="text-muted-foreground">Already have an account? <button type="button" onClick={() => setMode("login")} className="text-primary hover:underline">Sign in</button></p>
              )}
              {mode === "forgot" && (
                <button type="button" onClick={() => setMode("login")} className="text-primary hover:underline">Back to login</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
