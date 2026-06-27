"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Plus, Search, Calendar, MapPin, BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockScans = [
  { id: "scan_123", keyword: "plumber near me", location: "Acme Plumbing", size: "5x5", date: "Today, 10:45 AM", avgRank: 3.2, top3: 18 },
  { id: "scan_124", keyword: "emergency plumbing", location: "Acme Plumbing", size: "3x3", date: "Yesterday, 2:15 PM", avgRank: 7.8, top3: 2 },
  { id: "scan_125", keyword: "drain cleaning", location: "Acme Plumbing", size: "5x5", date: "June 10, 2026", avgRank: 12.4, top3: 0 },
];

export default function GeoGridDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Geo Grid Rankings</h1>
          <p className="text-muted-foreground">Visualize your local SEO performance across physical radii.</p>
        </div>
        <Link href="/dashboard/grid/new">
          <Button className="gap-2">
            <Plus size={16} /> New Grid Scan
          </Button>
        </Link>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rank (30d)</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">4.5</div>
            <p className="text-xs text-green-500 mt-1 flex items-center">↑ 1.2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nodes in Top 3</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">24%</div>
            <p className="text-xs text-muted-foreground mt-1">Across all recent scans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <MapPin className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground mt-1">This billing cycle</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Grid Scans</CardTitle>
              <CardDescription>Historical record of your keyword heatmap rankings.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search keywords..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
           <div className="rounded-md border">
              <table className="w-full text-sm">
                 <thead>
                    <tr className="border-b bg-muted/50 text-left">
                       <th className="p-3 font-medium">Keyword</th>
                       <th className="p-3 font-medium">Location</th>
                       <th className="p-3 font-medium">Grid</th>
                       <th className="p-3 font-medium">Avg Rank</th>
                       <th className="p-3 font-medium">Top 3 Nodes</th>
                       <th className="p-3 font-medium">Date</th>
                       <th className="p-3 font-medium text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody>
                    {mockScans.map((scan) => (
                       <tr key={scan.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3 font-semibold text-blue-600">{scan.keyword}</td>
                          <td className="p-3 text-muted-foreground">{scan.location}</td>
                          <td className="p-3">
                             <span className="bg-secondary px-2 py-1 rounded text-xs font-mono">{scan.size}</span>
                          </td>
                          <td className="p-3">
                             <span className={`font-bold ${scan.avgRank <= 3 ? 'text-green-600' : scan.avgRank <= 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                               {scan.avgRank}
                             </span>
                          </td>
                          <td className="p-3 text-muted-foreground">{scan.top3}</td>
                          <td className="p-3 text-muted-foreground flex items-center gap-2">
                             <Calendar size={14} /> {scan.date}
                          </td>
                          <td className="p-3 text-right">
                             <Link href={`/dashboard/grid/${scan.id}`}>
                               <Button variant="outline" size="sm">View Heatmap</Button>
                             </Link>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
