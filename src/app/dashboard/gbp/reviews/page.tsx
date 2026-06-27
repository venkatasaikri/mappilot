"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Star, Reply, CheckCircle2 } from "lucide-react";

const reviews = [
  { id: 1, author: "Michael T.", rating: 5, date: "2 days ago", text: "Excellent service. Very prompt and professional.", replied: false },
  { id: 2, author: "Sarah Jenkins", rating: 4, date: "1 week ago", text: "Good work, but arrived 15 mins late.", replied: true },
  { id: 3, author: "Angry Customer", rating: 1, date: "2 weeks ago", text: "Never called me back.", replied: false },
];

export default function GbpReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Inbox</h1>
          <p className="text-muted-foreground">Manage and reply to Google Reviews.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Reviews List */}
        <div className="lg:col-span-1 space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className={`cursor-pointer transition-colors ${!review.replied ? 'border-blue-300 shadow-sm' : 'opacity-70'}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold">{review.author}</span>
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
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                  MT
                </div>
                <div>
                  <CardTitle>Michael T.</CardTitle>
                  <CardDescription>2 days ago on Google</CardDescription>
                </div>
              </div>
              <div className="flex text-amber-400 mb-2">
                <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
              </div>
              <p className="text-foreground">"Excellent service. Very prompt and professional."</p>
            </CardHeader>
            <CardContent className="flex-1 p-6 flex flex-col justify-end">
              
              {/* Draft Reply Area */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-medium">Your Reply</label>
                  <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                    <Sparkles size={14} className="mr-2" /> Suggest Reply
                  </Button>
                </div>
                <Textarea 
                  placeholder="Draft your reply..." 
                  className="min-h-[120px]"
                  defaultValue="Hi Michael, thank you so much for the 5-star review! We are thrilled to hear that you were satisfied with our prompt and professional service. We look forward to helping you again in the future."
                />
              </div>

            </CardContent>
            <CardFooter className="border-t p-4 flex justify-end gap-3 bg-muted/5">
              <Button variant="ghost">Cancel</Button>
              <Button className="gap-2"><Reply size={16} /> Post Reply to Google</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
