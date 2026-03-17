import { useEffect, useState } from "react";
import { HeartPulse, Vault, Users, Activity, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function DashboardHome() {
  const { user } = useAuth();
  const [lastHeartbeat, setLastHeartbeat] = useState<string | null>(null);
  const [stats, setStats] = useState({ capsules: 0, nominees: 0 });
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [{ count: capsuleCount }, { count: nomineeCount }, { data: hb }] = await Promise.all([
        supabase.from("capsules").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("nominees").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("heartbeats").select("created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1),
      ]);
      setStats({ capsules: capsuleCount ?? 0, nominees: nomineeCount ?? 0 });
      setLastHeartbeat(hb?.[0]?.created_at ?? null);
    };
    fetchData();
  }, [user]);

  const daysSinceHeartbeat = lastHeartbeat
    ? Math.floor((Date.now() - new Date(lastHeartbeat).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const sendHeartbeat = async () => {
    if (!user) return;
    setPulsing(true);
    const { error } = await supabase.from("heartbeats").insert({ user_id: user.id });
    if (error) {
      toast.error("Failed to send heartbeat");
    } else {
      setLastHeartbeat(new Date().toISOString());
      toast.success("Heartbeat recorded! Timer reset.");
    }
    setTimeout(() => setPulsing(false), 1000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back. Your digital legacy is safe.</p>
      </div>

      {/* Heartbeat */}
      <Card className="glass-card">
        <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-8">
          <div className="relative">
            <div className={`w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center ${pulsing ? "" : ""}`}>
              <HeartPulse className={`h-12 w-12 text-primary ${pulsing ? "animate-bounce" : ""}`} />
            </div>
            {pulsing && <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-display font-semibold mb-1">Heartbeat Status</h2>
            {daysSinceHeartbeat !== null ? (
              <p className="text-muted-foreground">
                Last heartbeat: <span className={`font-semibold ${daysSinceHeartbeat > 60 ? "text-destructive" : daysSinceHeartbeat > 30 ? "text-yellow-500" : "text-primary"}`}>
                  {daysSinceHeartbeat} day{daysSinceHeartbeat !== 1 ? "s" : ""} ago
                </span>
              </p>
            ) : (
              <p className="text-muted-foreground">No heartbeat recorded yet. Tap the button to start.</p>
            )}
          </div>
          <Button size="lg" onClick={sendHeartbeat} className="shrink-0">
            <HeartPulse className="h-5 w-5 mr-2" /> I'm Alive
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Capsules</CardTitle>
            <Vault className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.capsules}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nominees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.nominees}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Days Active</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{daysSinceHeartbeat !== null ? `${daysSinceHeartbeat}d` : "—"}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
