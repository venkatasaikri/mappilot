"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, Phone, Map, Target, Calendar } from "lucide-react";

export default function AnalyticsDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
          <p className="text-muted-foreground">Track your traffic, leads, and ROI across all channels.</p>
        </div>
        <div className="flex gap-2">
           <select className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
             <option>Last 30 Days</option>
             <option>Last 90 Days</option>
             <option>Year to Date</option>
           </select>
           <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
             <Calendar size={16} /> Export Report
           </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Traffic</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14,205</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><TrendingUp size={12}/> +12%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">412</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><TrendingUp size={12}/> +8%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Form Leads</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><TrendingUp size={12}/> +24%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Direction Requests</CardTitle>
            <Map className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240</div>
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><TrendingUp size={12} className="rotate-180"/> -3%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-50">Total Conversions</CardTitle>
            <BarChart3 className="h-4 w-4 text-indigo-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">497</div>
            <p className="text-xs text-indigo-100 mt-1 flex items-center gap-1"><TrendingUp size={12}/> +11%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Chart Area */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Traffic & Interactions Over Time</CardTitle>
            <CardDescription>Visualizing your growth over the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-end gap-2 pb-4 pt-8 border-b mx-4">
             {/* Stylized CSS Bar Chart MVP */}
             {[
               40, 45, 60, 55, 70, 65, 80, 75, 90, 85, 95, 100, 
               85, 90, 70, 80, 95, 85, 105, 100, 110, 115, 105, 120,
               110, 125, 130, 140, 135, 150
             ].map((val, idx) => (
                <div key={idx} className="relative flex-1 flex items-end justify-center group h-full">
                   {/* Tooltip */}
                   <div className="absolute -top-8 bg-black text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                     Day {idx + 1}: {val} views
                   </div>
                   {/* Bar */}
                   <div 
                      className={`w-full rounded-t-sm transition-all duration-300 ${idx % 7 === 0 || idx % 7 === 6 ? 'bg-indigo-300 dark:bg-indigo-900/50' : 'bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-400'}`}
                      style={{ height: `${(val / 150) * 100}%` }}
                   ></div>
                </div>
             ))}
          </CardContent>
          <div className="flex justify-between px-6 py-4 text-xs text-muted-foreground">
             <span>May 15</span>
             <span>June 1</span>
             <span>June 15</span>
          </div>
        </Card>

        {/* Conversion Breakdown */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Conversion Breakdown</CardTitle>
            <CardDescription>Where are your leads coming from?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             
             {/* Doughnut Chart Stub */}
             <div className="relative w-48 h-48 mx-auto flex items-center justify-center rounded-full border-[16px] border-muted">
                {/* Simulated CSS conic-gradient or segmented borders */}
                <div className="absolute inset-0 rounded-full border-[16px] border-green-500" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)' }}></div>
                <div className="absolute inset-0 rounded-full border-[16px] border-blue-500" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%, 50% 50%)' }}></div>
                <div className="text-center z-10 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">497</span>
                  <span className="text-xs text-muted-foreground">Total</span>
                </div>
             </div>

             <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div> Phone Calls
                   </div>
                   <div className="font-semibold text-sm">82%</div>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div> Website Forms
                   </div>
                   <div className="font-semibold text-sm">15%</div>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground"></div> Direct Messages
                   </div>
                   <div className="font-semibold text-sm">3%</div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
