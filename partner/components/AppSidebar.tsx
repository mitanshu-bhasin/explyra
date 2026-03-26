"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarProvider";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  UserPlus, 
  Library, 
  CreditCard, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Onboarding", href: "/onboarding", icon: UserPlus },
  { name: "Resources", href: "/resources", icon: Library },
  { name: "Payouts", href: "/payouts", icon: CreditCard },
];

export function AppSidebar() {
  const { isCollapsed, toggle } = useSidebar();
  const pathname = usePathname();

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "h-screen bg-[#0a0a0b] border-r border-[#1a1a1b] flex flex-col relative sticky top-0 z-50",
        isCollapsed ? "items-center" : ""
      )}
    >
      <div className={cn("p-6 flex items-center mb-8", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/nobg.png" 
              alt="Explyra Logo" 
              width={32} 
              height={32} 
              className="object-contain"
            />
            <span className="font-bold text-xl tracking-tight text-white uppercase italic">Explyra</span>
          </Link>
        )}
        {isCollapsed && (
           <Link href="/">
             <Image 
               src="/nobg.png" 
               alt="Explyra Logo" 
               width={32} 
               height={32} 
               className="object-contain"
             />
           </Link>
        )}
        {!isCollapsed && (
           <button 
             onClick={toggle}
             className="p-1.5 rounded-lg bg-[#141415] border border-[#232324] text-[#a1a1aa] hover:text-white transition-colors"
           >
             <ChevronLeft size={18} />
           </button>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive 
                  ? "bg-blue-600/10 text-blue-500 font-medium" 
                  : "text-[#a1a1aa] hover:bg-white/5 hover:text-white",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon size={20} className={cn(isActive ? "text-blue-500" : "group-hover:text-white")} />
              {!isCollapsed && <span>{item.name}</span>}
              {isActive && !isCollapsed && (
                <motion.div 
                  layoutId="active-pill" 
                  className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {isCollapsed && (
        <button 
          onClick={toggle}
          className="mb-6 p-2 rounded-full bg-blue-600/10 text-blue-500 mx-auto"
        >
          <ChevronRight size={20} />
        </button>
      )}

      <div className="p-4 border-t border-[#1a1a1b]">
        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-[#141415]/50 border border-[#1a1a1b]">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">MB</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">Partner Name</p>
              <p className="text-xs text-[#a1a1aa] truncate">partner@explyra.me</p>
            </div>
            <LogOut size={16} className="text-[#a1a1aa] hover:text-red-500 cursor-pointer" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
