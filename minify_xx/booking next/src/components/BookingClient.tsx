"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  Timestamp
} from "firebase/firestore";
import { 
  Clock, 
  CheckCircle2, 
  ArrowLeft, 
  ChevronRight,
  Globe,
  MapPin,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Types
interface UserProfile {
  id: string;
  displayName: string;
  username: string;
  meetingDuration: number;
  availableSlots: {
    days: string[];
    start: string;
    end: string;
  };
}

export default function BookingClient({ profile }: { profile: UserProfile, username: string }) {
  
  // Booking process state
  const [step, setStep] = useState(1); // 1: Date, 2: Time, 3: Form, 4: Success
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [bookingCode, setBookingCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Fetch booked times for selected date
  useEffect(() => {
    if (selectedDate && profile) {
      async function fetchBookedTimes() {
        const q = query(
          collection(db, "bookings"),
          where("userId", "==", profile?.id),
          where("status", "==", "upcoming")
        );
        const snap = await getDocs(q);
        const booked = snap.docs
          .map(d => d.data().scheduledAt)
          .filter(t => t.startsWith(selectedDate));
        
        setBookedTimes(booked);
      }
      fetchBookedTimes();
    }
  }, [selectedDate, profile]);

  // --- Logic Helpers ---
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      if (profile.availableSlots.days.includes(dayName)) {
        dates.push(d.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const getAvailableSlots = () => {
    const slots = [];
    const current = new Date(`1970-01-01T${profile.availableSlots.start}:00`);
    const end = new Date(`1970-01-01T${profile.availableSlots.end}:00`);
    
    const formattedBooked = bookedTimes.map(t => t.split('T')[1].substring(0, 5));

    while (current < end) {
      const timeStr = `${String(current.getHours()).padStart(2, '0')}:${String(current.getMinutes()).padStart(2, '0')}`;
      if (!formattedBooked.includes(timeStr)) {
        slots.push(timeStr);
      }
      current.setMinutes(current.getMinutes() + profile.meetingDuration);
    }
    return slots;
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const code = `BOOK-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    try {
      await addDoc(collection(db, "bookings"), {
        userId: profile.id,
        ownerName: profile.displayName,
        customerName: form.name,
        customerEmail: form.email,
        customerMessage: form.message,
        scheduledAt: `${selectedDate}T${selectedTime}`,
        duration: profile.meetingDuration,
        status: "upcoming",
        code: code,
        createdAt: Timestamp.now()
      });

      setBookingCode(code);
      setStep(4);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080B14] text-white selection:bg-blue-500/30 font-sans p-6 md:p-12 overflow-x-hidden relative">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:items-start pt-12 relative z-10">
        
        {/* Profile Sidebar */}
        <section className="lg:w-1/3 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-24 h-24 rounded-[40px] bg-linear-to-br from-blue-600 to-blue-400 p-1 mb-8 shadow-2xl shadow-blue-600/20">
                <div className="w-full h-full rounded-[38px] bg-[#080B14] flex items-center justify-center">
                    <span className="text-3xl font-serif font-bold text-blue-500">{profile.displayName[0]}</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-serif font-bold mb-3">{profile.displayName}</h1>
              <p className="text-sm opacity-40 font-bold uppercase tracking-widest mb-10">@{profile.username}</p>
              
              <div className="space-y-4 w-full text-xs font-bold uppercase tracking-[0.2em] opacity-60">
                <div className="flex items-center gap-3">
                    <Clock size={16} className="text-blue-500" />
                    <span>{profile.meetingDuration} Min Professional Meeting</span>
                </div>
                <div className="flex items-center gap-3">
                    <Globe size={16} className="text-blue-500" />
                    <span>Web Conference (Video Link Ready)</span>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-blue-500" />
                    <span>Global Remote Scheduling</span>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-white/5 w-full hidden lg:block">
                 <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em] leading-loose">
                    This booking page is part of the Explyra Suite. Verified account under Krishna Glass House.
                 </p>
              </div>
           </div>
        </section>

        {/* Dynamic Workflow Area */}
        <section className="flex-1">
          <div className="bg-white/3 border border-white/5 backdrop-blur-3xl rounded-[40px] p-8 md:p-16 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-right duration-1000">
            <AnimatePresence mode="wait">
              {/* STEP 1: DATE SELECTION */}
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div>
                    <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Stage 01</span>
                    <h2 className="text-3xl font-serif font-bold tracking-tight">Select Availability</h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {getAvailableDates().map(dateStr => {
                       const date = new Date(dateStr);
                       const active = selectedDate === dateStr;
                       return (
                         <button 
                            key={dateStr}
                            onClick={() => setSelectedDate(dateStr)}
                            className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-2 group ${active ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-600/20' : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'}`}
                         >
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                            <span className="text-2xl font-serif font-bold">{date.getDate()}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                         </button>
                       );
                    })}
                  </div>

                  <div className="pt-10 flex justify-end">
                    <button 
                      disabled={!selectedDate}
                      onClick={() => setStep(2)}
                      className="px-10 py-5 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-[0.3em] flex items-center gap-4 hover:scale-105 transition-all disabled:opacity-20"
                    >
                      Pick Time <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: TIME SELECTION */}
              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 text-[10px] font-bold opacity-40 hover:opacity-100 hover:text-blue-500 uppercase tracking-widest transition-all">
                    <ArrowLeft size={14}/> Change Date
                  </button>

                  <div>
                    <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Stage 02</span>
                    <h2 className="text-3xl font-serif font-bold tracking-tight">
                        Slots for <span className="text-blue-500">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {getAvailableSlots().map(time => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-5 rounded-2xl border text-sm font-bold tracking-widest transition-all ${selectedTime === time ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-600/20' : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'}`}
                      >
                        {time}
                      </button>
                    ))}
                    {getAvailableSlots().length === 0 && (
                        <p className="col-span-full opacity-40 italic">No slots available for this day.</p>
                    )}
                  </div>

                  <div className="pt-10 flex justify-end">
                    <button 
                      disabled={!selectedTime}
                      onClick={() => setStep(3)}
                      className="px-10 py-5 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-[0.3em] flex items-center gap-4 hover:scale-105 transition-all disabled:opacity-20"
                    >
                      Confirm Details <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: FORM */}
              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 text-[10px] font-bold opacity-40 hover:opacity-100 hover:text-blue-500 uppercase tracking-widest transition-all">
                    <ArrowLeft size={14}/> Change Time
                  </button>

                  <div>
                    <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Stage 03</span>
                    <h2 className="text-3xl font-serif font-bold tracking-tight">Personal Information</h2>
                  </div>

                  <form onSubmit={handleBooking} className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Your Full Name</label>
                        <input 
                            required
                            type="text"
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value})}
                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all text-sm"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Email Address</label>
                        <input 
                            required
                            type="email"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all text-sm"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Meeting Objectives (Optional)</label>
                        <textarea 
                            value={form.message}
                            onChange={e => setForm({...form, message: e.target.value})}
                            className="w-full px-6 py-4 rounded-[32px] bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all text-sm h-32 resize-none"
                            placeholder="Let us know what you want to discuss..."
                        />
                    </div>

                    <div className="md:col-span-2 pt-6">
                        <div className="p-8 rounded-3xl bg-blue-600/10 border border-blue-500/20 mb-8 flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-500">Scheduled for</span>
                                <span className="text-sm font-bold tracking-tight">
                                    {new Date(`${selectedDate}T${selectedTime}`).toLocaleString([], { 
                                        weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center">
                                <Zap className="text-blue-500" size={24} />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-5 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-blue-500 hover:shadow-2xl hover:shadow-blue-600/30 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : "Confirm Booking"}
                            {!isSubmitting && <CheckCircle2 size={18} />}
                        </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: SUCCESS */}
              {step === 4 && (
                <motion.div 
                    key="step4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12"
                >
                   <div className="w-24 h-24 rounded-[40px] bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-12 animate-bounce">
                      <CheckCircle2 size={48} className="text-green-500" />
                   </div>
                   
                   <h2 className="text-4xl font-serif font-bold mb-4 tracking-tight">Booking Confirmed!</h2>
                   <p className="text-lg opacity-40 mb-12 max-w-sm font-light">
                      Your session with {profile.displayName} is now secure in our agentic engine.
                   </p>
                   
                   <div className="w-full max-w-sm p-10 rounded-[40px] bg-white/5 border border-white/10 border-dashed mb-12">
                      <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4 block">Your Security Code</span>
                      <span className="text-4xl font-black tracking-[0.3em] text-blue-500 font-serif">{bookingCode}</span>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-6">
                      <button 
                        onClick={() => window.location.reload()}
                        className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 font-bold text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all"
                      >
                         New Session
                      </button>
                      <Link 
                        href="/track.html"
                        className="px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold text-xs uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
                      >
                         Track Live
                      </Link>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* Brand Footer for Booking Page */}
      <div className="max-w-6xl mx-auto mt-24 flex flex-col items-center gap-8 opacity-20 hover:opacity-100 transition-opacity relative z-10">
         <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Powered by Explyra Agentic Engine</span>
         </div>
         <p className="text-[8px] font-bold uppercase tracking-widest text-center">Krishna Glass House &copy; 2026</p>
      </div>
    </main>
  );
}
