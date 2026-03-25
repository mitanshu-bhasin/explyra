"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { searchExperts, getApprovedExperts } from "@/lib/firestore";
import type { Expert } from "@/lib/types";
import { INDUSTRIES } from "@/lib/types";
import { Search, MapPin, DollarSign, Star, Filter, X } from "lucide-react";

function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column" }}>
      <div className="card-body" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <img
            src={expert.profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.fullName)}&size=80&background=1e3a5f&color=fff&rounded=true`}
            alt={expert.fullName}
            className="avatar"
            style={{ width: "72px", height: "72px", flexShrink: 0 }}
          />
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "1.15rem", marginBottom: "0.2rem" }}>{expert.fullName}</h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: "0.4rem" }}>{expert.pastProfession}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              {expert.rating > 0 && (
                <span className="stars" style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.9rem" }}>
                  <Star size={15} fill="#f59e0b" /> {expert.rating.toFixed(1)} ({expert.reviewCount})
                </span>
              )}
              <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                {expert.yearsOfExperience} yrs exp
              </span>
            </div>
          </div>
        </div>

        <p style={{ color: "var(--color-text-muted)", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "1rem", flex: 1 }}>
          {expert.bio?.substring(0, 120)}{expert.bio?.length > 120 ? "..." : ""}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
          <span className="badge badge-blue">{expert.industry}</span>
          {expert.skills?.slice(0, 3).map(s => (
            <span key={s} className="tag">{s}</span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border)", paddingTop: "1rem" }}>
          <div style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--color-primary)" }}>
            <DollarSign size={16} style={{ display: "inline", verticalAlign: "-2px" }} />{expert.consultationPrice}/hr
          </div>
          <Link href={`/expert/${expert.id}`} className="btn btn-primary btn-sm">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

function SearchPageInner() {
  const searchParams = useSearchParams();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    industry: searchParams.get("industry") || "",
    skill: searchParams.get("q") || "",
    language: "",
    maxPrice: "",
    minExperience: "",
  });

  const loadExperts = async () => {
    setLoading(true);
    try {
      let results;
      if (filters.industry || filters.skill || filters.language) {
        results = await searchExperts({
          industry: filters.industry || undefined,
          skill: filters.skill || undefined,
          language: filters.language || undefined,
        });
      } else {
        results = await getApprovedExperts(50);
      }
      // Client-side filtering for price and experience
      if (filters.maxPrice) {
        results = results.filter(e => e.consultationPrice <= Number(filters.maxPrice));
      }
      if (filters.minExperience) {
        results = results.filter(e => e.yearsOfExperience >= Number(filters.minExperience));
      }
      setExperts(results);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { loadExperts(); }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadExperts();
  };

  const clearFilters = () => {
    setFilters({ industry: "", skill: "", language: "", maxPrice: "", minExperience: "" });
  };

  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <h1 style={{ marginBottom: "0.5rem" }}>Find Your Expert</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem" }}>
            Browse {experts.length > 0 ? `${experts.length}+` : ""} verified retired professionals ready to mentor and advise you.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
        {/* Search bar */}
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "250px", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-secondary)" }} />
            <input className="form-input" style={{ paddingLeft: "2.75rem" }} placeholder="Search by skill, e.g. Strategic Planning" value={filters.skill} onChange={e => setFilters(prev => ({ ...prev, skill: e.target.value }))} />
          </div>
          <select className="form-input form-select" style={{ width: "220px" }} value={filters.industry} onChange={e => setFilters(prev => ({ ...prev, industry: e.target.value }))}>
            <option value="">All Industries</option>
            {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
          </select>
          <button type="submit" className="btn btn-primary">
            <Search size={18} /> Search
          </button>
          <button type="button" className="btn btn-outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={18} /> Filters
          </button>
        </form>

        {/* Advanced filters */}
        {showFilters && (
          <div className="card card-body" style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h4>Advanced Filters</h4>
              <button onClick={clearFilters} className="btn btn-sm" style={{ background: "none", color: "var(--color-text-muted)", border: "none" }}><X size={16} /> Clear all</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Language</label>
                <input className="form-input" placeholder="e.g. English" value={filters.language} onChange={e => setFilters(prev => ({ ...prev, language: e.target.value }))} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Max Price ($/hr)</label>
                <input className="form-input" type="number" min={0} placeholder="e.g. 100" value={filters.maxPrice} onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Min Experience (yrs)</label>
                <input className="form-input" type="number" min={0} placeholder="e.g. 10" value={filters.minExperience} onChange={e => setFilters(prev => ({ ...prev, minExperience: e.target.value }))} />
              </div>
            </div>
            <button onClick={loadExperts} className="btn btn-accent btn-sm" style={{ marginTop: "1rem" }}>
              Apply Filters
            </button>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
            <div className="spinner" />
          </div>
        ) : experts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <Search size={48} style={{ color: "var(--color-border)", margin: "0 auto 1rem" }} />
            <h3>No experts found</h3>
            <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>Try adjusting your filters or search terms.</p>
            <button onClick={clearFilters} className="btn btn-outline" style={{ marginTop: "1rem" }}>Clear Filters</button>
          </div>
        ) : (
          <div className="expert-grid">
            {experts.map(e => <ExpertCard key={e.id} expert={e} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", padding: "5rem" }}><div className="spinner" /></div>}>
      <SearchPageInner />
    </Suspense>
  );
}
