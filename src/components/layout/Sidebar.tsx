"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Settings, MapPin, Puzzle, Target, Sparkles, Network, Swords, BarChart3, Bot, LogOut } from "lucide-react";

export function Sidebar() {
  const router = useRouter();

  const [userData, setUserData] = React.useState<{name: string, tenantName: string, role: string} | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="w-64 border-r bg-background h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          MapPilot
        </h2>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 rounded-md font-medium">
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
        <Link href="/dashboard/businesses" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
          <MapPin size={18} />
          Locations
        </Link>
        <Link href="/dashboard/agents" className="flex items-center gap-3 px-3 py-2 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 rounded-md font-semibold border border-purple-100 dark:border-purple-800">
          <Bot size={18} />
          AI Workforce
        </Link>
        <Link href="/dashboard/analytics" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
          <BarChart3 size={18} />
          Analytics
        </Link>
        <Link href="/dashboard/studio" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
          <Sparkles size={18} />
          AI Studio
        </Link>
        <Link href="/dashboard/grid" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
          <Target size={18} />
          Geo Grids
        </Link>
        <Link href="/dashboard/citations" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
          <Network size={18} />
          Citations
        </Link>
        <Link href="/dashboard/competitors" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
          <Swords size={18} />
          Competitors
        </Link>
        <Link href="/dashboard/marketplace" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
          <Puzzle size={18} />
          Modules
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
          <Settings size={18} />
          Settings
        </Link>
      </nav>
      <div className="p-4 border-t flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3 truncate pr-2">
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
             {userData?.name ? userData.name.charAt(0).toUpperCase() : "A"}
           </div>
           <div className="flex flex-col truncate">
             <span className="text-sm font-medium truncate" title={userData?.tenantName || "Agency Name"}>
               {userData?.tenantName || "Agency Name"}
             </span>
             <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold truncate" title={userData?.name || "Owner"}>
               {userData?.name || "Owner"}
             </span>
           </div>
        </div>
        <button onClick={handleLogout} className="text-muted-foreground hover:text-red-500 transition-colors p-2 rounded-md hover:bg-red-50" title="Logout">
           <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
