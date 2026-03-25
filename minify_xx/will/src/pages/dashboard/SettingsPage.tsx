import { useState, useEffect } from "react";
import { Settings, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const [inactivityDays, setInactivityDays] = useState("90");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("inactivity_days").eq("id", user.id).single().then(({ data }) => {
      if (data?.inactivity_days) setInactivityDays(String(data.inactivity_days));
    });
  }, [user]);

  const saveSettings = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ inactivity_days: parseInt(inactivityDays) }).eq("id", user.id);
    if (error) toast.error(error.message);
    else toast.success("Settings saved!");
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your vault preferences</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-display">Inactivity Period</CardTitle>
          <CardDescription>How long before your capsules are released to nominees</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Days of inactivity</Label>
            <Select value={inactivityDays} onValueChange={setInactivityDays}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={saveSettings} disabled={saving}>
            {saving && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
            Save Settings
          </Button>
        </CardContent>
      </Card>

      <Card className="glass-card border-destructive/50">
        <CardHeader>
          <CardTitle className="font-display text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" /> Danger Zone
          </CardTitle>
          <CardDescription>Irreversible actions — proceed with caution</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={signOut}>Sign Out & Lock Vault</Button>
        </CardContent>
      </Card>
    </div>
  );
}
