import { useEffect, useState } from "react";
import { ShieldAlert, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface SecurityLog {
  id: string;
  event_type: string;
  ip_address: string | null;
  details: string | null;
  created_at: string;
}

export default function SecurityPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("security_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setLogs(data ?? []);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Security Logs</h1>
        <p className="text-muted-foreground mt-1">Track all security events in your account</p>
      </div>

      {logs.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="py-16 text-center">
            <ShieldAlert className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold mb-1">No security events</h3>
            <p className="text-muted-foreground text-sm">Your security log will appear here</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {logs.map((log) => (
                <div key={log.id} className="p-4 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldAlert className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{log.event_type}</p>
                    {log.details && <p className="text-xs text-muted-foreground mt-0.5">{log.details}</p>}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString()}</p>
                    {log.ip_address && <p className="text-xs text-muted-foreground">{log.ip_address}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
