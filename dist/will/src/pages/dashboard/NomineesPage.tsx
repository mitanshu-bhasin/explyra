import { useEffect, useState } from "react";
import { Plus, Users, Trash2, Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Nominee {
  id: string;
  name: string;
  email: string;
  relationship: string | null;
  created_at: string;
}

export default function NomineesPage() {
  const { user } = useAuth();
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Nominee | null>(null);
  const [form, setForm] = useState({ name: "", email: "", relationship: "" });

  const fetchNominees = async () => {
    if (!user) return;
    const { data } = await supabase.from("nominees").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setNominees(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchNominees(); }, [user]);

  const handleSave = async () => {
    if (!user || !form.name || !form.email) return;
    const payload = { user_id: user.id, name: form.name, email: form.email, relationship: form.relationship || null };

    if (editing) {
      const { error } = await supabase.from("nominees").update(payload).eq("id", editing.id);
      if (error) return toast.error(error.message);
      toast.success("Nominee updated");
    } else {
      const { error } = await supabase.from("nominees").insert(payload);
      if (error) return toast.error(error.message);
      toast.success("Nominee added");
    }
    setOpen(false);
    setEditing(null);
    setForm({ name: "", email: "", relationship: "" });
    fetchNominees();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("nominees").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Nominee removed");
    fetchNominees();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Nominees</h1>
          <p className="text-muted-foreground mt-1">People who'll receive your digital legacy</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditing(null); setForm({ name: "", email: "", relationship: "" }); }}>
              <Plus className="h-4 w-4 mr-2" /> Add Nominee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">{editing ? "Edit Nominee" : "Add Nominee"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Relationship</Label>
                <Input value={form.relationship} onChange={(e) => setForm({ ...form, relationship: e.target.value })} placeholder="Brother, Wife, etc." />
              </div>
              <Button className="w-full" onClick={handleSave}>{editing ? "Update" : "Add"} Nominee</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {nominees.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="py-16 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold mb-1">No nominees yet</h3>
            <p className="text-muted-foreground text-sm">Add someone you trust to receive your digital assets</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {nominees.map((n) => (
            <Card key={n.id} className="glass-card group hover:shadow-lg transition-shadow">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold">
                  {n.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{n.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{n.email}</p>
                  {n.relationship && <p className="text-xs text-muted-foreground">{n.relationship}</p>}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditing(n); setForm({ name: n.name, email: n.email, relationship: n.relationship ?? "" }); setOpen(true); }}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(n.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
