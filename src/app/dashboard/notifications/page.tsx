"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">View all your recent alerts and messages.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 p-0">
          <div className="divide-y">
            <div className="p-4 hover:bg-slate-50 flex gap-4">
               <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  <CheckCircle2 size={20} />
               </div>
               <div>
                  <p className="text-sm font-medium">Review Agent Task Complete</p>
                  <p className="text-sm text-muted-foreground mt-1">Agent successfully replied to 4 recent Google reviews for Acme Plumbing.</p>
                  <p className="text-xs text-muted-foreground mt-2">2 minutes ago</p>
               </div>
            </div>
            <div className="p-4 hover:bg-slate-50 flex gap-4">
               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <MessageSquare size={20} />
               </div>
               <div>
                  <p className="text-sm font-medium">New Review Received</p>
                  <p className="text-sm text-muted-foreground mt-1">John Doe left a 5-star review on Google Business Profile.</p>
                  <p className="text-xs text-muted-foreground mt-2">1 hour ago</p>
               </div>
            </div>
            <div className="p-4 hover:bg-slate-50 flex gap-4">
               <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <AlertCircle size={20} />
               </div>
               <div>
                  <p className="text-sm font-medium">Citation Inconsistency Found</p>
                  <p className="text-sm text-muted-foreground mt-1">Yelp profile address does not match your primary Google listing.</p>
                  <p className="text-xs text-muted-foreground mt-2">3 hours ago</p>
               </div>
            </div>
            <div className="p-4 hover:bg-slate-50 flex gap-4 opacity-70">
               <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                  <CheckCircle2 size={20} />
               </div>
               <div>
                  <p className="text-sm font-medium">Weekly Report Generated</p>
                  <p className="text-sm text-muted-foreground mt-1">Your weekly performance report is ready to view.</p>
                  <p className="text-xs text-muted-foreground mt-2">2 days ago</p>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
