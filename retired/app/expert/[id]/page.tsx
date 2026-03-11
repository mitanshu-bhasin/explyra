"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getExpert, getReviewsByExpert, createBooking, createReview, getOrCreateChat } from "@/lib/firestore";
import type { Expert, Review } from "@/lib/types";
import { Star, Clock, DollarSign, Briefcase, Globe, Linkedin, Calendar, MessageSquare, CheckCircle, X, Send } from "lucide-react";
import toast from "react-hot-toast";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" style={{ display: "inline-flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={18} fill={i <= Math.round(rating) ? "#f59e0b" : "none"} color="#f59e0b" />
      ))}
    </span>
  );
}

export default function ExpertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, role } = useAuth();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [bookingData, setBookingData] = useState({ dateTime: "", duration: 60 as 30 | 60, notes: "" });
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });
  const [bookingStep, setBookingStep] = useState(1);
  const [paymentData, setPaymentData] = useState({ cardNumber: "", expiry: "", cvv: "", name: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const id = params.id as string;
      const [e, r] = await Promise.all([getExpert(id), getReviewsByExpert(id)]);
      setExpert(e);
      setReviews(r);
      setLoading(false);
    };
    load();
  }, [params.id]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !expert) return;
    setSaving(true);
    try {
      const price = bookingData.duration === 30 ? expert.consultationPrice / 2 : expert.consultationPrice;
      await createBooking({
        clientId: user.uid,
        clientName: user.displayName || "Client",
        expertId: expert.id,
        expertName: expert.fullName,
        dateTime: bookingData.dateTime,
        duration: bookingData.duration,
        price,
        notes: bookingData.notes,
      });
      toast.success("Booking confirmed! (Demo — no real charge)");
      setShowBooking(false);
      setBookingStep(1);
      setPaymentData({ cardNumber: "", expiry: "", cvv: "", name: "" });
    } catch (err: any) {
      toast.error(err.message || "Booking failed");
    }
    setSaving(false);
  };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !expert) return;
    setSaving(true);
    try {
      await createReview({
        clientId: user.uid,
        clientName: user.displayName || "Client",
        expertId: expert.id,
        rating: reviewData.rating,
        comment: reviewData.comment,
      });
      toast.success("Review submitted!");
      setShowReview(false);
      const r = await getReviewsByExpert(expert.id);
      setReviews(r);
      const e2 = await getExpert(expert.id);
      if (e2) setExpert(e2);
    } catch (err: any) {
      toast.error(err.message || "Review failed");
    }
    setSaving(false);
  };

  const handleMessage = async () => {
    if (!user || !expert) return;
    try {
      await getOrCreateChat(user.uid, expert.uid);
      router.push("/messages");
    } catch (err: any) { toast.error("Failed to start chat"); }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!expert) {
    return (
      <div style={{ textAlign: "center", padding: "5rem 1.5rem" }}>
        <h2>Expert Not Found</h2>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>This profile may have been removed.</p>
        <Link href="/search" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>Browse Experts</Link>
      </div>
    );
  }

  const sessionPrice = bookingData.duration === 30 ? expert.consultationPrice / 2 : expert.consultationPrice;

  return (
    <div style={{ padding: "0" }}>
      {/* DEMO Banner */}
      <div style={{
        background: "linear-gradient(90deg, #f59e0b, #ef4444)",
        color: "#fff",
        textAlign: "center",
        padding: "0.6rem 1rem",
        fontWeight: 700,
        fontSize: "0.85rem",
        letterSpacing: "0.5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem"
      }}>
        🏷️ DEMO MODE — Payments are simulated. No real charges will be made.
      </div>

      <div style={{ padding: "2.5rem 0" }}>
      <div className="container" style={{ maxWidth: "960px" }}>
        {/* Profile header */}
        <div className="card card-body" style={{ padding: "2.5rem" }}>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <img
              src={expert.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.fullName)}&size=160&background=1e3a5f&color=fff&rounded=true`}
              alt={expert.fullName}
              className="avatar"
              style={{ width: "140px", height: "140px" }}
            />
            <div style={{ flex: 1, minWidth: "280px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                <h1 style={{ margin: 0 }}>{expert.fullName}</h1>
                {expert.isFeatured && <span className="badge badge-amber">⭐ Featured</span>}
                {expert.isApproved && <span className="badge badge-green"><CheckCircle size={12} /> Verified</span>}
              </div>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", marginBottom: "0.75rem" }}>{expert.pastProfession}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-text-muted)" }}>
                  <Briefcase size={16} /> {expert.yearsOfExperience} years experience
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-text-muted)" }}>
                  <Clock size={16} /> {expert.availability}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Stars rating={expert.rating} /> ({expert.reviewCount} reviews)
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <span className="badge badge-blue">{expert.industry}</span>
                {expert.skills?.map(s => <span key={s} className="tag">{s}</span>)}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary)" }}>
                  ${expert.consultationPrice}<span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--color-text-muted)" }}>/hr</span>
                </span>
                {user && role === "client" && (
                  <>
                    <button onClick={() => { setShowBooking(true); setBookingStep(1); }} className="btn btn-primary">
                      <Calendar size={18} /> Book Session
                    </button>
                    <button onClick={handleMessage} className="btn btn-outline">
                      <MessageSquare size={18} /> Message
                    </button>
                  </>
                )}
                {!user && <Link href="/signup" className="btn btn-primary">Sign Up to Book</Link>}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="card card-body" style={{ marginTop: "1.5rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>About</h3>
          <p style={{ color: "var(--color-text)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{expert.bio}</p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
            {expert.linkedinUrl && (
              <a href={expert.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
            {expert.languages?.length > 0 && (
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-text-muted)" }}>
                <Globe size={16} /> {expert.languages.join(", ")}
              </span>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="card card-body" style={{ marginTop: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3>Reviews ({reviews.length})</h3>
            {user && role === "client" && (
              <button onClick={() => setShowReview(true)} className="btn btn-outline btn-sm">
                Write a Review
              </button>
            )}
          </div>
          {reviews.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)", textAlign: "center", padding: "2rem" }}>No reviews yet. Be the first!</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {reviews.map(r => (
                <div key={r.id} style={{ padding: "1.25rem", background: "#f8fafc", borderRadius: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <div>
                      <span style={{ fontWeight: 600 }}>{r.clientName}</span>
                      <Stars rating={r.rating} />
                    </div>
                    <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                      {r.date ? new Date(r.date).toLocaleDateString() : ""}
                    </span>
                  </div>
                  <p style={{ color: "var(--color-text)", lineHeight: 1.7 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Booking Modal — 2-Step */}
      {showBooking && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1.5rem" }}>
          <div className="card card-body" style={{ maxWidth: "520px", width: "100%", padding: "2rem", position: "relative" }}>
            <button onClick={() => { setShowBooking(false); setBookingStep(1); }} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", color: "var(--color-secondary)" }}>
              <X size={24} />
            </button>

            {/* Step indicators */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem" }}>1</div>
              <div style={{ flex: 1, height: "2px", background: bookingStep >= 2 ? "var(--color-primary)" : "var(--color-border)" }} />
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: bookingStep >= 2 ? "var(--color-primary)" : "var(--color-border)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem" }}>2</div>
            </div>

            {bookingStep === 1 ? (
              <>
                <h2 style={{ marginBottom: "0.5rem" }}>Book a Session</h2>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>with {expert.fullName}</p>
                <div className="form-group">
                  <label className="form-label">Date & Time</label>
                  <input className="form-input" type="datetime-local" value={bookingData.dateTime} onChange={e => setBookingData(prev => ({ ...prev, dateTime: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    {([30, 60] as const).map(d => (
                      <button type="button" key={d} onClick={() => setBookingData(prev => ({ ...prev, duration: d }))}
                        className={`btn ${bookingData.duration === d ? "btn-primary" : "btn-outline"}`} style={{ flex: 1 }}>
                        {d} min – ${d === 30 ? expert.consultationPrice / 2 : expert.consultationPrice}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Notes (optional)</label>
                  <textarea className="form-input" rows={3} placeholder="What would you like to discuss?" value={bookingData.notes} onChange={e => setBookingData(prev => ({ ...prev, notes: e.target.value }))} style={{ resize: "vertical" }} />
                </div>
                <button type="button" className="btn btn-primary" style={{ width: "100%" }} disabled={!bookingData.dateTime}
                  onClick={() => setBookingStep(2)}>
                  Continue to Payment →
                </button>
              </>
            ) : (
              <form onSubmit={handleBook}>
                <h2 style={{ marginBottom: "0.25rem" }}>Payment Details</h2>
                <div style={{
                  background: "linear-gradient(90deg, #f59e0b22, #ef444422)",
                  border: "1px solid #f59e0b55",
                  borderRadius: "8px",
                  padding: "0.5rem 0.75rem",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#b45309"
                }}>
                  🏷️ DEMO — No real payment will be processed
                </div>

                {/* Order summary */}
                <div style={{ background: "var(--color-bg-light)", borderRadius: "10px", padding: "1rem", marginBottom: "1.25rem", border: "1px solid var(--color-border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ color: "var(--color-text-muted)" }}>Session with {expert.fullName}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ color: "var(--color-text-muted)" }}>{bookingData.duration} min consultation</span>
                    <span style={{ fontWeight: 700 }}>${sessionPrice}</span>
                  </div>
                  <div style={{ borderTop: "1px solid var(--color-border)", marginTop: "0.5rem", paddingTop: "0.5rem", display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700 }}>Total</span>
                    <span style={{ fontWeight: 800, fontSize: "1.15rem", color: "var(--color-primary)" }}>${sessionPrice}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Cardholder Name</label>
                  <input className="form-input" placeholder="John Doe" value={paymentData.name}
                    onChange={e => setPaymentData(prev => ({ ...prev, name: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input className="form-input" placeholder="4242 4242 4242 4242" maxLength={19}
                    value={paymentData.cardNumber}
                    onChange={e => {
                      const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                      setPaymentData(prev => ({ ...prev, cardNumber: v }));
                    }} required />
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Expiry</label>
                    <input className="form-input" placeholder="MM/YY" maxLength={5}
                      value={paymentData.expiry}
                      onChange={e => {
                        let v = e.target.value.replace(/\D/g, "");
                        if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                        setPaymentData(prev => ({ ...prev, expiry: v }));
                      }} required />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">CVV</label>
                    <input className="form-input" placeholder="123" maxLength={4} type="password"
                      value={paymentData.cvv}
                      onChange={e => setPaymentData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, "") }))} required />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setBookingStep(1)}>
                    ← Back
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={saving}>
                    {saving ? "Processing..." : `Pay $${sessionPrice} (Demo)`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReview && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1.5rem" }}>
          <div className="card card-body" style={{ maxWidth: "500px", width: "100%", padding: "2rem", position: "relative" }}>
            <button onClick={() => setShowReview(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", color: "var(--color-secondary)" }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: "1.5rem" }}>Write a Review</h2>
            <form onSubmit={handleReview}>
              <div className="form-group">
                <label className="form-label">Rating</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <button type="button" key={i} onClick={() => setReviewData(prev => ({ ...prev, rating: i }))} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem" }}>
                      <Star size={32} fill={i <= reviewData.rating ? "#f59e0b" : "none"} color="#f59e0b" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Comment</label>
                <textarea className="form-input" rows={4} placeholder="Share your experience..." value={reviewData.comment} onChange={e => setReviewData(prev => ({ ...prev, comment: e.target.value }))} required style={{ resize: "vertical" }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={saving}>
                <Send size={18} /> {saving ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": expert.fullName,
          "jobTitle": expert.pastProfession,
          "description": expert.bio,
          "knowsAbout": expert.skills,
          "url": `https://x.explyra.me/expert/${expert.id}`,
          ...(expert.profileImageUrl && { "image": expert.profileImageUrl }),
          "makesOffer": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "ProfessionalService",
              "name": `Consulting with ${expert.fullName}`,
              "description": expert.bio,
            },
            "price": expert.consultationPrice,
            "priceCurrency": "USD",
          },
        }),
      }} />
    </div>
  );
}
