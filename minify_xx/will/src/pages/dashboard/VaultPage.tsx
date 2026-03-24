import { useEffect, useState } from "react";
import { Plus, Key, Globe, CreditCard, Lock, FileText, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const typeIcons: Record<string, any> = {
  crypto: Key,
  domain: Globe,
  subscription: CreditCard,
  password: Lock,
  legal: FileText,
};

const typeLabels: Record<string, string> = {
  crypto: "Crypto",
  domain: "Domain",
  subscription: "Subscription",
  password: "Password",
  legal: "Legal Doc",
};

interface Capsule {
  id: string;
  type: string;
  title: string;
  encrypted_content: string;
  nominee_id: string | null;
  created_at: string;
}

interface Nominee {
  id: string;
  name: string;
}

export default function VaultPage() {
  const { user } = useAuth();
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Capsule | null>(null);

  const [form, setForm] = useState({ type: "crypto", title: "", content: "", nominee_id: "" });

  const fetchData = async () => {
    if (!user) return;
    const [{ data: caps }, { data: noms }] = await Promise.all([
      supabase.from("capsules").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("nominees").select("id, name").eq("user_id", user.id),
    ]);
    setCapsules(caps ?? []);
    setNominees(noms ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [user]);

  const handleSave = async () => {
    if (!user || !form.title) return;
    const payload = {
      user_id: user.id,
      type: form.type,
      title: form.title,
      encrypted_content: form.content,
      nominee_id: form.nominee_id || null,
    };

    if (editing) {
      const { error } = await supabase.from("capsules").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Capsule updated");
    } else {
      const { error } = await supabase.from("capsules").insert(payload);
      if (error) return toast.error(error.message);
      toast.success("Capsule created");
    }
    setOpen(false);
    setEditing(null);
    setForm({ type: "crypto", title: "", content: "", nominee_id: "" });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("capsules").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Capsule deleted");
    fetchData();
  };

  const openEdit = (c: Capsule) => {
    setEditing(c);
    setForm({ type: c.type, title: c.title, content: c.encrypted_content, nominee_id: c.nominee_id ?? "" });
    setOpen(true);
  };

  const openNew = () => {
    setEditing(null);
    setForm({ type: "crypto", title: "", content: "", nominee_id: "" });
    setOpen(true);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Vault</h1>
          <p className="text-muted-foreground mt-1">Your encrypted asset capsules</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" /> Add Capsule</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">{editing ? "Edit Capsule" : "New Capsule"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(typeLabels).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Bitcoin Wallet" />
              </div>
              <div className="space-y-2">
                <Label>Content (Encrypted)</Label>
                <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Seed phrase, credentials, etc." rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Assign Nominee (optional)</Label>
                <Select value={form.nominee_id} onValueChange={(v) => setForm({ ...form, nominee_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select nominee" /></SelectTrigger>
                  <SelectContent>
                    {nominees.map((n) => (
                      <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleSave}>{editing ? "Update" : "Create"} Capsule</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {capsules.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="py-16 text-center">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold mb-1">No capsules yet</h3>
            <p className="text-muted-foreground text-sm">Add your first digital asset capsule to get started</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capsules.map((c) => {
            const Icon = typeIcons[c.type] || Lock;
            return (
              <Card key={c.id} className="glass-card group hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(c)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(c.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">{c.title}</h3>
                  <p className="text-xs text-muted-foreground">{typeLabels[c.type]} • {new Date(c.created_at).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
