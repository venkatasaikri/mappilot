"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, Filter, CheckCircle, AlertTriangle, Network, ExternalLink } from "lucide-react";
import Link from "next/link";

const mockDirectories = [
  { id: 1, name: "Google Business Profile", type: "Tier 1", status: "Accurate", url: "https://google.com/...", error: null },
  { id: 2, name: "Yelp", type: "Tier 1", status: "Error", url: "https://yelp.com/...", error: "Phone Mismatch" },
  { id: 3, name: "Apple Maps", type: "Tier 1", status: "Accurate", url: "https://apple.com/...", error: null },
  { id: 4, name: "Bing Places", type: "Tier 1", status: "Missing", url: null, error: "No Listing Found" },
  { id: 5, name: "YellowPages", type: "Tier 2", status: "Error", url: "https://yp.com/...", error: "Name Mismatch" },
  { id: 6, name: "FourSquare", type: "Tier 2", status: "Accurate", url: "https://foursquare.com/...", error: null },
  { id: 7, name: "MapQuest", type: "Tier 2", status: "Accurate", url: "https://mapquest.com/...", error: null },
];

export default function CitationDirectoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
           <Link href="/dashboard/citations" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
             <ArrowLeft size={14} /> Back to Dashboard
           </Link>
           <h1 className="text-3xl font-bold tracking-tight">Directory Tracking</h1>
           <p className="text-muted-foreground">Detailed status across all tracked citation aggregators.</p>
        </div>
        <Button className="gap-2" variant="outline"><Filter size={16} /> Filter by Status</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top 50 Directories</CardTitle>
              <CardDescription>Click on an external link to manually update the listing if an error is found.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search directories..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
           <div className="rounded-md border">
              <table className="w-full text-sm">
                 <thead>
                    <tr className="border-b bg-muted/50 text-left">
                       <th className="p-4 font-medium">Directory</th>
                       <th className="p-4 font-medium">Importance</th>
                       <th className="p-4 font-medium">Status</th>
                       <th className="p-4 font-medium">Identified Issue</th>
                       <th className="p-4 font-medium text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody>
                    {mockDirectories.map((dir) => (
                       <tr key={dir.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-4 font-semibold flex items-center gap-2">
                             {dir.name}
                          </td>
                          <td className="p-4">
                             <span className={`px-2 py-1 rounded text-xs font-medium ${dir.type === 'Tier 1' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                {dir.type}
                             </span>
                          </td>
                          <td className="p-4">
                             {dir.status === 'Accurate' && (
                                <span className="flex items-center gap-1 text-green-600 font-medium">
                                   <CheckCircle size={14} /> Accurate
                                </span>
                             )}
                             {dir.status === 'Error' && (
                                <span className="flex items-center gap-1 text-red-600 font-medium">
                                   <AlertTriangle size={14} /> Inaccurate
                                </span>
                             )}
                             {dir.status === 'Missing' && (
                                <span className="flex items-center gap-1 text-yellow-600 font-medium">
                                   <Network size={14} /> Missing
                                </span>
                             )}
                          </td>
                          <td className="p-4 text-muted-foreground">
                             {dir.error || "—"}
                          </td>
                          <td className="p-4 text-right">
                             {dir.url ? (
                                <Button variant="outline" size="sm" className="gap-1 h-8">
                                   View Listing <ExternalLink size={12} />
                                </Button>
                             ) : (
                                <Button variant="default" size="sm" className="h-8">
                                   Create Listing
                                </Button>
                             )}
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
