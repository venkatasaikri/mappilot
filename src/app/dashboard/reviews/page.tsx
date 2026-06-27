"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare, CheckCircle2, Globe, Search, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock Aggregated Data
const reviews = [
  { id: 1, author: "Michael T.", rating: 5, source: "Google", date: "2 days ago", text: "Excellent service. Very prompt and professional.", replied: false },
  { id: 2, author: "Sarah Jenkins", rating: 4, source: "Facebook", date: "1 week ago", text: "Good work, but arrived 15 mins late.", replied: true },
  { id: 3, author: "Angry Customer", rating: 1, source: "Trustpilot", date: "2 weeks ago", text: "Terrible experience, avoided my calls.", replied: false },
];

export default function ReviewsInboxPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unified Review Inbox</h1>
          <p className="text-muted-foreground">Manage your reputation across Google, Facebook, and Trustpilot.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <Button variant={activeFilter === "all" ? "default" : "outline"} onClick={() => setActiveFilter("all")} size="sm">All Sources</Button>
        <Button variant={activeFilter === "Google" ? "default" : "outline"} onClick={() => setActiveFilter("Google")} size="sm" className="gap-2">Google</Button>
        <Button variant={activeFilter === "Facebook" ? "default" : "outline"} onClick={() => setActiveFilter("Facebook")} size="sm" className="gap-2"><Globe size={14} /> Facebook</Button>
        <Button variant={activeFilter === "Trustpilot" ? "default" : "outline"} onClick={() => setActiveFilter("Trustpilot")} size="sm" className="gap-2">Trustpilot</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Reviews List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search reviews..." className="w-full pl-9 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9"><Filter size={16} /></Button>
          </div>

          {reviews.filter(r => activeFilter === "all" || r.source === activeFilter).map((review) => (
            <Card key={review.id} className={`cursor-pointer transition-colors ${!review.replied ? 'border-blue-300 shadow-sm' : 'opacity-70'}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                     <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${
                        review.source === 'Google' ? 'bg-red-500' : review.source === 'Facebook' ? 'bg-blue-600' : 'bg-green-500'
                     }`}>{review.source}</span>
                     <span className="font-semibold text-sm">{review.author}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-muted" : ""} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">"{review.text}"</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                  {review.replied ? (
                    <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 size={12}/> Replied</span>
                  ) : (
                    <span className="text-xs font-medium text-blue-600">Needs Reply</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Review View */}
        <div className="lg:col-span-2">
          <Card className="h-full min-h-[500px] flex flex-col">
            <CardHeader className="border-b bg-muted/10">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-lg">
                     AC
                   </div>
                   <div>
                     <CardTitle>Angry Customer</CardTitle>
                     <CardDescription>2 weeks ago on Trustpilot</CardDescription>
                   </div>
                 </div>
                 <Button variant="outline" size="sm">View on Trustpilot</Button>
              </div>
              
              <div className="flex text-amber-400 mb-2">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="none" className="text-muted" /><Star size={16} fill="none" className="text-muted" /><Star size={16} fill="none" className="text-muted" /><Star size={16} fill="none" className="text-muted" />
              </div>
              <p className="text-foreground">"Terrible experience, avoided my calls. Would not recommend to anyone."</p>
            </CardHeader>
            <CardContent className="flex-1 p-6 flex flex-col justify-end">
              
              {/* Draft Reply Area */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-medium">Your Reply (Posted via API)</label>
                  <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50" onClick={() => toast.success("AI draft generated based on context.")}>
                     Draft with AI
                  </Button>
                </div>
                <Textarea 
                  placeholder="Draft your reply..." 
                  className="min-h-[120px]"
                />
              </div>

            </CardContent>
            <CardFooter className="border-t p-4 flex justify-end gap-3 bg-muted/5">
              <Button variant="ghost">Cancel</Button>
              <Button className="gap-2" onClick={() => toast.success("Reply successfully posted to Trustpilot via API")}><MessageSquare size={16} /> Post Reply</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
