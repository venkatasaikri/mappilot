"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Swords, MapPin, Sparkles, Star, TrendingUp, Search, Puzzle, CreditCard } from "lucide-react";
import Link from "next/link";

export default function GlobalDashboardPage() {
  const [locationsCount, setLocationsCount] = useState(0);
  const [analytics, setAnalytics] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    // Fetch businesses
    fetch('/api/businesses')
      .then(res => res.json())
      .then(data => setLocationsCount(data.length || 0))
      .catch(() => {});

    // Fetch analytics
    fetch('/api/analytics/overview')
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(() => {});

    // Fetch reviews
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agency Overview</h1>
          <p className="text-muted-foreground">High-level insights across all your managed locations and modules.</p>
        </div>
        <div className="flex gap-2">
           <Link href="/dashboard/businesses/1">
             <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
               <MapPin size={16} /> Manage Primary Location
             </Button>
           </Link>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-blue-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Managed Locations</CardTitle>
            <MapPin className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locationsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Active locations</p>
          </CardContent>
        </Card>
        <Card className="border-green-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Traffic</CardTitle>
            <Network className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {analytics?.kpis?.totalTraffic?.value || 0}
            </div>
            <p className="text-xs text-green-600/80 mt-1 flex items-center gap-1">Based on analytics data</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Sparkles className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {analytics?.kpis?.formLeads?.value || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Forms & Calls</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Star className="h-4 w-4 text-amber-600 fill-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">{reviews.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Tracked across platforms</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Module Quick Access */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>MapPilot Modules</CardTitle>
            <CardDescription>Quick access to your core local SEO engines.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
               <Link href="/dashboard/studio" className="group">
                  <div className="p-4 border rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors h-full flex flex-col">
                     <div className="flex items-center gap-2 mb-2 font-semibold text-purple-800"><Sparkles size={18}/> AI Content Studio</div>
                     <p className="text-xs text-muted-foreground mt-auto">Generate localized GBP posts and service pages using the Template Engine.</p>
                  </div>
               </Link>
               <Link href="/dashboard/competitors" className="group">
                  <div className="p-4 border rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors h-full flex flex-col">
                     <div className="flex items-center gap-2 mb-2 font-semibold text-indigo-800"><Swords size={18}/> Competitor Intelligence</div>
                     <p className="text-xs text-muted-foreground mt-auto">Benchmark rankings, reviews, and content against local rivals.</p>
                  </div>
               </Link>
               <Link href="/dashboard/citations" className="group">
                  <div className="p-4 border rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors h-full flex flex-col">
                     <div className="flex items-center gap-2 mb-2 font-semibold text-green-800"><Network size={18}/> Citation Management</div>
                     <p className="text-xs text-muted-foreground mt-auto">Audit NAP consistency across 50+ Top Tier directories.</p>
                  </div>
               </Link>
               <Link href="/dashboard/grid" className="group">
                  <div className="p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors h-full flex flex-col">
                     <div className="flex items-center gap-2 mb-2 font-semibold text-blue-800"><Search size={18}/> Geo Grid Heatmaps</div>
                     <p className="text-xs text-muted-foreground mt-auto">Visualize your local keyword rankings across a physical radius.</p>
                  </div>
               </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity / Tasks */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>Recent alerts and automated tasks.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-6">
                {reviews.length > 0 ? reviews.slice(0, 3).map(review => (
                  <div key={review.id} className="flex gap-4">
                     <div className="mt-0.5"><div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 ring-4 ring-blue-50"></div></div>
                     <div>
                        <p className="text-sm font-medium">New {review.rating}-Star Review on {review.source}</p>
                        <p className="text-xs text-muted-foreground mt-1">From {review.author}: "{review.text}"</p>
                        <span className="text-[10px] text-muted-foreground mt-1 block">{review.date}</span>
                     </div>
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground">No recent activity found.</p>
                )}
             </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
