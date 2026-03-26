"use client";

import { useEffect, useRef } from "react";
import { Terminal, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useIndexingSession } from "@/hooks/useIndexingSession";
import { cn } from "@/lib/utils";

export const LiveConsole = () => {
  const { consoleLogs } = useIndexingSession();
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  return (
    <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-[400px]">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
        <Terminal className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-mono font-medium text-slate-300">Live Console Log</span>
        <div className="flex ml-auto gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        </div>
      </div>
      <div ref={consoleRef} className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
        {consoleLogs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500 animate-pulse italic">
            Waiting for activity...
          </div>
        ) : (
          consoleLogs.map((log) => (
            <div key={log.id} className={cn(
              "flex gap-3",
              log.type === 'error' && "text-red-400",
              log.type === 'success' && "text-emerald-400",
              log.type === 'warning' && "text-amber-400",
              log.type === 'info' && "text-slate-400"
            )}>
              <span className="text-slate-600 select-none shrink-0">[{log.timestamp}]</span>
              <div className="flex-1 break-all">
                {log.type === 'success' && <CheckCircle2 className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />}
                {log.type === 'error' && <AlertCircle className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />}
                {log.type === 'info' && <Info className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />}
                {log.type === 'warning' && <AlertCircle className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />}
                <span className={cn(
                  log.type === 'success' && "font-semibold bg-emerald-500/10 px-1 rounded",
                  log.type === 'error' && "font-semibold bg-red-500/10 px-1 rounded",
                  log.type === 'warning' && "font-semibold bg-amber-500/10 px-1 rounded"
                )}>{log.message}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
