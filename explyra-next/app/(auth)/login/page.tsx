import type { Metadata } from "next";
import LoginCard from "@/components/auth/LoginCard";

export const metadata: Metadata = {
  title: "Sign In — Explyra Core",
  description: "Sign in to the Explyra platform management console.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-black relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-green-100/50 dark:bg-green-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-indigo-100/50 dark:bg-indigo-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <LoginCard />
        <div className="mt-12 flex flex-col items-center gap-4 opacity-40">
          <span className="text-[10px] font-black tracking-[0.3em] text-slate-500 uppercase">
            Explyra Protected Environment
          </span>
        </div>
      </div>
    </div>
  );
}
