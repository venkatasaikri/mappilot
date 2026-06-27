"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, MapPin, ChevronDown, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={20} />
        </Button>
        
        {/* Active Location Selector */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
          <MapPin size={16} className="text-indigo-600" />
          <span className="text-sm font-medium">Acme Plumbing (Downtown)</span>
          <ChevronDown size={14} className="text-muted-foreground ml-2" />
        </div>

        <div className="relative w-full max-w-sm hidden lg:flex items-center ml-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search modules..." 
            className="pl-9 bg-muted/50 w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(!showNotifications)}>
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full"></span>
        </Button>

        {showNotifications && (
          <div className="absolute top-12 right-0 w-80 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">
             <div className="p-3 border-b bg-slate-50 flex justify-between items-center">
                <span className="font-semibold text-sm">Notifications</span>
                <span className="text-xs text-indigo-600 hover:underline cursor-pointer">Mark all as read</span>
             </div>
             <div className="max-h-96 overflow-y-auto">
                <div className="p-4 border-b hover:bg-slate-50 cursor-pointer flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
                      <CheckCircle2 size={16} />
                   </div>
                   <div>
                      <p className="text-sm font-medium">Review Agent Task Complete</p>
                      <p className="text-xs text-muted-foreground mt-1">Agent successfully replied to 4 recent Google reviews for Acme Plumbing.</p>
                      <p className="text-[10px] text-muted-foreground mt-2">2 minutes ago</p>
                   </div>
                </div>
                <div className="p-4 border-b hover:bg-slate-50 cursor-pointer flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 mt-1">
                      <MessageSquare size={16} />
                   </div>
                   <div>
                      <p className="text-sm font-medium">New Review Received</p>
                      <p className="text-xs text-muted-foreground mt-1">John Doe left a 5-star review on Google Business Profile.</p>
                      <p className="text-[10px] text-muted-foreground mt-2">1 hour ago</p>
                   </div>
                </div>
                <div className="p-4 hover:bg-slate-50 cursor-pointer flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0 mt-1">
                      <AlertCircle size={16} />
                   </div>
                   <div>
                      <p className="text-sm font-medium">Citation Inconsistency Found</p>
                      <p className="text-xs text-muted-foreground mt-1">Yelp profile address does not match your primary Google listing.</p>
                      <p className="text-[10px] text-muted-foreground mt-2">3 hours ago</p>
                   </div>
                </div>
             </div>
             <div className="p-2 border-t text-center bg-slate-50">
                <Button variant="ghost" className="w-full text-xs text-indigo-600 h-8">View all notifications</Button>
             </div>
          </div>
        )}
      </div>
    </header>
  );
}
