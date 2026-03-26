"use client";

import { useIndexingSession } from "@/hooks/useIndexingSession";
import { CheckCircle2, AlertCircle, Clock, LinkSimple } from "lucide-react";
import { cn } from "@/lib/utils";

const StatCard = ({ label, value, icon: Icon, color, className }: any) => (
  <div className={cn("flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg transition-all hover:border-slate-700", className)}>
    <div className={cn("p-2 rounded-lg bg-opacity-10", color)}>
      <Icon className={cn("w-5 h-5", color.replace('bg-', 'text-'))} />
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
      <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider font-mono">{label}</span>
    </div>
  </div>
);

export const StatsBar = () => {
  const { stats } = useIndexingSession();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        label="Total URLs" 
        value={stats.total} 
        icon={LinkSimple} 
        color="bg-blue-500" 
      />
      <StatCard 
        label="Processed" 
        value={stats.done} 
        icon={CheckCircle2} 
        color="bg-emerald-500" 
      />
      <StatCard 
        label="Failed" 
        value={stats.failed} 
        icon={AlertCircle} 
        color="bg-red-500" 
      />
      <StatCard 
        label="Remaining" 
        value={stats.remaining} 
        icon={Clock} 
        color="bg-slate-500" 
      />
    </div>
  );
};
