"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Star, Image as ImageIcon, HelpCircle, Activity, ArrowRight } from "lucide-react";

export default function GbpDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Google Business Profile</h1>
          <p className="text-muted-foreground">Manage posts, reviews, and sync health.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Activity size={16} />
          Force Sync Now
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:border-blue-500 transition-colors">
          <Link href="/dashboard/gbp/posts">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">3 scheduled for this week</p>
            </CardContent>
          </Link>
        </Card>
        
        <Card className="hover:border-amber-500 transition-colors">
          <Link href="/dashboard/gbp/reviews">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unanswered Reviews</CardTitle>
              <Star className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-red-500 mt-1">Action required</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-purple-500 transition-colors cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Photos</CardTitle>
            <ImageIcon className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground mt-1">Last uploaded 2 days ago</p>
          </CardContent>
        </Card>

        <Card className="hover:border-green-500 transition-colors cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unanswered Q&A</CardTitle>
            <HelpCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground mt-1">From public users</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>Latest feedback from your customers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="border rounded-md p-4 bg-muted/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-amber-400"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                  <span className="text-sm font-medium">Sarah Jenkins</span>
                </div>
                <p className="text-sm text-muted-foreground italic">"Great plumbing service, came exactly on time and fixed the leak in under an hour."</p>
                <div className="mt-3">
                  <Link href="/dashboard/gbp/reviews">
                    <Button size="sm" variant="outline" className="w-full text-xs h-8">Reply with AI</Button>
                  </Link>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sync Health</CardTitle>
            <CardDescription>Status of the connection to Google Servers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-medium">Reviews Sync</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Success (2m ago)</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-medium">Posts Sync</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Success (1h ago)</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-sm font-medium">Q&A Sync</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Success (1h ago)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
