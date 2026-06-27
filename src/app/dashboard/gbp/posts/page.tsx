"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Calendar, ImagePlus, History } from "lucide-react";

export default function GbpPostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Post Manager</h1>
          <p className="text-muted-foreground">Draft, schedule, and publish updates to Google.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Composer */}
        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="bg-blue-50/50 border-b pb-4">
            <CardTitle>Create Post</CardTitle>
            <CardDescription>Publish an update, offer, or event.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Post Image</label>
              <div className="border-2 border-dashed rounded-md h-32 flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                <ImagePlus size={24} className="mb-2" />
                <span className="text-sm">Click to upload image</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Caption</label>
                <Button variant="ghost" size="sm" className="h-8 text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                  <Sparkles size={14} className="mr-1" /> Draft with AI
                </Button>
              </div>
              <Textarea placeholder="Write your post content here..." className="min-h-[120px]" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Call To Action (Optional)</label>
              <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option>None</option>
                <option>Learn More</option>
                <option>Book</option>
                <option>Call Now</option>
              </select>
            </div>
          </CardContent>
          <CardFooter className="flex gap-3 border-t pt-4">
            <Button className="flex-1">Publish Now</Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Calendar size={16} /> Schedule
            </Button>
          </CardFooter>
        </Card>

        {/* History / Scheduled */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><History size={18} /> Recent & Scheduled Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">Scheduled: Tomorrow 9:00 AM</span>
              </div>
              <p className="text-sm text-foreground line-clamp-2">"Get your pipes checked before winter! We offer comprehensive winterization services to prevent freezing..."</p>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs text-red-600">Cancel</Button>
              </div>
            </div>

            <div className="border rounded-md p-4 bg-muted/20">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Published: 2 days ago</span>
                <span className="text-xs text-muted-foreground">42 Views</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">"We are thrilled to announce that we've been voted the #1 plumbing service in the downtown area! Thanks to..."</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
