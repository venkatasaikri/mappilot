"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, TrendingUp, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CompetitorReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/competitors" className="text-sm text-indigo-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Review Comparison</h1>
        <p className="text-muted-foreground">Detailed breakdown of review velocity and sentiment.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* You */}
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700 text-lg">Acme Plumbing (You)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
             <div>
                <div className="text-sm text-muted-foreground mb-1">Overall Rating</div>
                <div className="text-3xl font-bold flex items-center gap-2">4.9 <Star className="text-amber-500 fill-amber-500" size={24}/></div>
             </div>
             <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                <div>
                   <div className="text-xs text-muted-foreground">Total Reviews</div>
                   <div className="font-bold text-lg">142</div>
                </div>
                <div>
                   <div className="text-xs text-muted-foreground flex items-center gap-1">Velocity <TrendingUp size={10} className="text-green-500"/></div>
                   <div className="font-bold text-lg text-green-600">+12 <span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Competitor 1 */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Joe's Emergency Plumbing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
             <div>
                <div className="text-sm text-muted-foreground mb-1">Overall Rating</div>
                <div className="text-3xl font-bold flex items-center gap-2">4.8 <Star className="text-amber-500 fill-amber-500" size={24}/></div>
             </div>
             <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                <div>
                   <div className="text-xs text-muted-foreground">Total Reviews</div>
                   <div className="font-bold text-lg text-red-500">310</div>
                </div>
                <div>
                   <div className="text-xs text-muted-foreground flex items-center gap-1">Velocity <TrendingUp size={10} className="text-green-500"/></div>
                   <div className="font-bold text-lg text-red-500">+25 <span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Competitor 2 */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Downtown Rooter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
             <div>
                <div className="text-sm text-muted-foreground mb-1">Overall Rating</div>
                <div className="text-3xl font-bold flex items-center gap-2">4.2 <Star className="text-amber-500 fill-amber-500" size={24}/></div>
             </div>
             <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                <div>
                   <div className="text-xs text-muted-foreground">Total Reviews</div>
                   <div className="font-bold text-lg text-green-600">85</div>
                </div>
                <div>
                   <div className="text-xs text-muted-foreground flex items-center gap-1">Velocity</div>
                   <div className="font-bold text-lg text-green-600">+2 <span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="bg-amber-50/50 border-amber-200">
        <CardContent className="p-6 flex items-start gap-4">
           <div className="p-3 bg-amber-100 text-amber-700 rounded-full">
              <TrendingUp size={24} />
           </div>
           <div>
              <h3 className="font-bold text-amber-900 mb-1">Velocity Warning</h3>
              <p className="text-sm text-amber-800">
                 <strong>Joe's Emergency Plumbing</strong> is acquiring reviews roughly 2x faster than you (25/mo vs 12/mo). 
                 We recommend launching an SMS Review Campaign to close the gap.
              </p>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
