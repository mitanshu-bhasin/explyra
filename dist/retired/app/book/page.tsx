"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getBookingsByClient, createBooking } from "@/lib/firestore";
import type { Booking } from "@/lib/types";
import { Calendar, Clock, CheckCircle } from "lucide-react";

export default function BookPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/login"); return; }
    const load = async () => {
      const b = await getBookingsByClient(user.uid);
      setBookings(b);
      setLoading(false);
    };
    load();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return <div style={{ display: "flex", justifyContent: "center", padding: "5rem" }}><div className="spinner" /></div>;
  }

  return (
    <div style={{ padding: "2.5rem 0" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>My Bookings</h1>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>View and manage your consultation sessions.</p>

        {bookings.length === 0 ? (
          <div className="card card-body" style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <Calendar size={48} style={{ margin: "0 auto 1rem", color: "var(--color-border)" }} />
            <h3>No bookings yet</h3>
            <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
              Find an expert and book your first consultation session.
            </p>
            <button onClick={() => router.push("/search")} className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
              Find an Expert
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {bookings.map(b => (
              <div key={b.id} className="card card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <h3 style={{ marginBottom: "0.3rem" }}>{b.expertName}</h3>
                    <div style={{ display: "flex", gap: "1.25rem", color: "var(--color-text-muted)", fontSize: "0.95rem", flexWrap: "wrap" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Calendar size={15} /> {b.dateTime ? new Date(b.dateTime).toLocaleDateString() : "TBD"}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Clock size={15} /> {b.duration} minutes
                      </span>
                      <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>${b.price}</span>
                    </div>
                    {b.notes && <p style={{ marginTop: "0.5rem", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Note: {b.notes}</p>}
                  </div>
                  <span className={`badge ${b.status === "completed" ? "badge-green" : b.status === "pending" ? "badge-amber" : b.status === "confirmed" ? "badge-blue" : "badge-red"}`}>
                    {b.status === "completed" && <CheckCircle size={12} />} {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
