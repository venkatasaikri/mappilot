"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swords, Search, Star, MessageSquare, LineChart, TrendingUp, TrendingDown } from "lucide-react";

export default function CompetitorsOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Competitor Intelligence</h1>
          <p className="text-muted-foreground">Benchmark your business against top local rivals.</p>
        </div>
        <div className="flex gap-2">
           <Link href="/dashboard/competitors/reviews">
             <Button variant="outline" className="gap-2"><Star size={16} /> Compare Reviews</Button>
           </Link>
           <Link href="/dashboard/competitors/discovery">
             <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
               <Search size={16} /> Discover Competitors
             </Button>
           </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tracked Competitors List */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-indigo-200 shadow-sm">
             <CardHeader className="bg-indigo-50/50 pb-4 border-b">
                <CardTitle className="text-lg flex items-center gap-2"><Swords size={18} className="text-indigo-600"/> Tracked Rivals</CardTitle>
                <CardDescription>You are actively benchmarking against these 3 businesses.</CardDescription>
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y">
                   <div className="p-4 flex justify-between items-center bg-blue-50/30">
                      <div>
                         <div className="font-bold text-sm text-blue-700">Acme Plumbing (You)</div>
                         <div className="text-xs text-muted-foreground">Main St, Downtown</div>
                      </div>
                      <div className="text-right">
                         <div className="text-sm font-bold text-green-600 flex items-center justify-end gap-1"><TrendingUp size={12}/> #2</div>
                         <div className="text-[10px] text-muted-foreground">Avg Rank</div>
                      </div>
                   </div>
                   <div className="p-4 flex justify-between items-center">
                      <div>
                         <div className="font-bold text-sm">Joe's Emergency Plumbing</div>
                         <div className="text-xs text-muted-foreground">0.8 miles away</div>
                      </div>
                      <div className="text-right">
                         <div className="text-sm font-bold text-green-600 flex items-center justify-end gap-1"><TrendingUp size={12}/> #1</div>
                         <div className="text-[10px] text-muted-foreground">Avg Rank</div>
                      </div>
                   </div>
                   <div className="p-4 flex justify-between items-center">
                      <div>
                         <div className="font-bold text-sm">Downtown Rooter</div>
                         <div className="text-xs text-muted-foreground">1.2 miles away</div>
                      </div>
                      <div className="text-right">
                         <div className="text-sm font-bold text-red-600 flex items-center justify-end gap-1"><TrendingDown size={12}/> #4</div>
                         <div className="text-[10px] text-muted-foreground">Avg Rank</div>
                      </div>
                   </div>
                   <div className="p-4 flex justify-between items-center">
                      <div>
                         <div className="font-bold text-sm">A1 Pipe Services</div>
                         <div className="text-xs text-muted-foreground">2.5 miles away</div>
                      </div>
                      <div className="text-right">
                         <div className="text-sm font-bold text-muted-foreground flex items-center justify-end gap-1"><TrendingDown size={12}/> #6</div>
                         <div className="text-[10px] text-muted-foreground">Avg Rank</div>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>

        {/* Benchmarking Charts */}
        <div className="lg:col-span-2 space-y-6">
           <Card>
              <CardHeader>
                 <CardTitle className="text-lg">Share of Voice (Local Visibility)</CardTitle>
                 <CardDescription>Estimated percentage of local search traffic captured based on Map Pack rankings.</CardDescription>
              </CardHeader>
              <CardContent>
                 {/* Mock Stacked Bar Chart */}
                 <div className="space-y-4">
                    <div className="flex h-8 w-full rounded-full overflow-hidden">
                       <div className="bg-indigo-500 h-full flex items-center justify-center text-white text-xs font-bold" style={{width: '35%'}}>Joe's (35%)</div>
                       <div className="bg-blue-500 h-full flex items-center justify-center text-white text-xs font-bold" style={{width: '28%'}}>You (28%)</div>
                       <div className="bg-amber-500 h-full flex items-center justify-center text-white text-xs font-bold" style={{width: '20%'}}>Downtown Rooter (20%)</div>
                       <div className="bg-slate-300 h-full flex items-center justify-center text-slate-700 text-xs font-bold" style={{width: '17%'}}>Others (17%)</div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <div className="grid grid-cols-2 gap-4">
              <Card>
                 <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2"><Star size={16}/> Total Reviews</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-3 mt-2">
                       <div>
                          <div className="flex justify-between text-xs mb-1">
                             <span className="font-semibold text-blue-600">You</span>
                             <span>142</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: '45%'}}></div></div>
                       </div>
                       <div>
                          <div className="flex justify-between text-xs mb-1">
                             <span className="font-semibold">Joe's Plumbing</span>
                             <span>310</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-indigo-500 h-1.5 rounded-full" style={{width: '95%'}}></div></div>
                       </div>
                       <div>
                          <div className="flex justify-between text-xs mb-1">
                             <span className="font-semibold">Downtown Rooter</span>
                             <span>85</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-amber-500 h-1.5 rounded-full" style={{width: '25%'}}></div></div>
                       </div>
                    </div>
                 </CardContent>
              </Card>

              <Card>
                 <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2"><MessageSquare size={16}/> GBP Posts (Last 30 Days)</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-3 mt-2">
                       <div>
                          <div className="flex justify-between text-xs mb-1">
                             <span className="font-semibold text-blue-600">You</span>
                             <span>12 posts</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: '100%'}}></div></div>
                       </div>
                       <div>
                          <div className="flex justify-between text-xs mb-1">
                             <span className="font-semibold">Joe's Plumbing</span>
                             <span>4 posts</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-indigo-500 h-1.5 rounded-full" style={{width: '33%'}}></div></div>
                       </div>
                       <div>
                          <div className="flex justify-between text-xs mb-1">
                             <span className="font-semibold">Downtown Rooter</span>
                             <span>0 posts</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-amber-500 h-1.5 rounded-full" style={{width: '0%'}}></div></div>
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}
