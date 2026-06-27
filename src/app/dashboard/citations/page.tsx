"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, AlertTriangle, CheckCircle, Search, RefreshCw, BarChart2 } from "lucide-react";
import { toast } from "sonner";

export default function CitationsDashboardPage() {
  const [isAuditing, setIsAuditing] = useState(false);

  const handleRunAudit = () => {
    setIsAuditing(true);
    toast.info("Initializing internet-wide citation audit...");
    
    setTimeout(() => {
      setIsAuditing(false);
      toast.success("Citation audit complete!");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Citation Management</h1>
          <p className="text-muted-foreground">Audit and track your NAP consistency across 50+ directories.</p>
        </div>
        <div className="flex gap-2">
           <Link href="/dashboard/citations/directories">
             <Button variant="outline" className="gap-2"><Search size={16} /> View Directory Status</Button>
           </Link>
           <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleRunAudit} disabled={isAuditing}>
             <RefreshCw size={16} className={isAuditing ? "animate-spin" : ""} /> 
             {isAuditing ? "Scanning..." : "Run Audit Scan"}
           </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Massive Health Score Radial Chart Stub */}
        <Card className="col-span-1 md:col-span-1 flex flex-col items-center justify-center py-10">
          <CardHeader className="text-center pb-2 w-full">
            <CardTitle className="text-lg">Overall Health Score</CardTitle>
            <CardDescription>Based on Top 50 Directories</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
             <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-muted mt-4">
                <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', borderTopColor: 'transparent', borderRightColor: 'transparent', transform: 'rotate(45deg)'}}></div>
                <div className="text-center z-10 bg-background rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-4xl font-black text-green-600">72%</span>
                  <span className="text-xs text-muted-foreground mt-1 font-semibold">GOOD</span>
                </div>
             </div>
             <p className="text-sm text-center text-muted-foreground mt-6 max-w-[200px]">
                Your NAP data is mostly consistent, but critical errors exist on Tier 1 sites.
             </p>
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Audit Breakdown</CardTitle>
            <CardDescription>Last scanned: Today, 8:15 AM</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
                   <div className="flex items-center gap-2 text-green-700 dark:text-green-500 mb-2">
                      <CheckCircle size={18} />
                      <span className="font-semibold text-sm">Accurate</span>
                   </div>
                   <div className="text-3xl font-bold text-green-800 dark:text-green-400">36</div>
                   <p className="text-xs text-green-600/80 mt-1">Directories synced perfectly</p>
                </div>

                <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-950/20">
                   <div className="flex items-center gap-2 text-red-700 dark:text-red-500 mb-2">
                      <AlertTriangle size={18} />
                      <span className="font-semibold text-sm">Errors Found</span>
                   </div>
                   <div className="text-3xl font-bold text-red-800 dark:text-red-400">9</div>
                   <p className="text-xs text-red-600/80 mt-1">Phone or address mismatch</p>
                </div>

                <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-950/20">
                   <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-500 mb-2">
                      <Network size={18} />
                      <span className="font-semibold text-sm">Missing</span>
                   </div>
                   <div className="text-3xl font-bold text-yellow-800 dark:text-yellow-400">5</div>
                   <p className="text-xs text-yellow-600/80 mt-1">Opportunities to list</p>
                </div>

             </div>

             <div className="pt-4 border-t">
               <h4 className="font-medium text-sm mb-3">Critical Action Items</h4>
               <ul className="space-y-3">
                  <li className="flex justify-between items-center bg-muted/30 p-3 rounded-md">
                     <div className="flex items-center gap-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Yelp_Logo.svg" alt="Yelp" className="h-6 opacity-80" />
                        <div>
                           <div className="text-sm font-semibold">Yelp</div>
                           <div className="text-xs text-red-600">Phone Number Mismatch</div>
                        </div>
                     </div>
                     <Button size="sm" variant="outline">View Detail</Button>
                  </li>
                  <li className="flex justify-between items-center bg-muted/30 p-3 rounded-md">
                     <div className="flex items-center gap-3">
                        <div className="h-6 w-16 bg-blue-500 rounded text-white flex items-center justify-center font-bold text-xs">BING</div>
                        <div>
                           <div className="text-sm font-semibold">Bing Places</div>
                           <div className="text-xs text-yellow-600">Listing Missing Completely</div>
                        </div>
                     </div>
                     <Button size="sm" variant="outline">Create Listing</Button>
                  </li>
               </ul>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
