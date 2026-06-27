"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, PenTool, Search, BookOpen, Clock } from "lucide-react";

const recentGenerations = [
  { id: 1, type: "GBP Post", title: "Emergency Plumbing Special", date: "Today, 9:00 AM", words: 120 },
  { id: 2, type: "Blog", title: "Why Drain Cleaning is Essential for Winter", date: "Yesterday", words: 850 },
  { id: 3, type: "Service Page", title: "Water Heater Installation - Downtown", date: "June 12, 2026", words: 1200 },
];

export default function StudioDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Content Studio</h1>
          <p className="text-muted-foreground">Automate localized SEO content across blogs and Google profiles.</p>
        </div>
        <div className="flex gap-2">
           <Link href="/dashboard/studio/prompts">
             <Button variant="outline" className="gap-2"><BookOpen size={16} /> Prompt Library</Button>
           </Link>
           <Link href="/dashboard/studio/generator">
             <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white"><Sparkles size={16} /> New Generation</Button>
           </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
               Tokens Remaining
               <Sparkles className="h-4 w-4 opacity-70" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">142,500</div>
            <p className="text-xs opacity-70 mt-1">Refreshes next billing cycle</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between text-muted-foreground">
               Content Pieces Created
               <PenTool className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">48</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between text-muted-foreground">
               Hours Saved
               <Clock className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12.5</div>
            <p className="text-xs text-muted-foreground mt-1">Estimated vs manual writing</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Generations</CardTitle>
          <CardDescription>Your recently created AI content drafts and published posts.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="rounded-md border">
              <table className="w-full text-sm">
                 <thead>
                    <tr className="border-b bg-muted/50 text-left">
                       <th className="p-3 font-medium">Type</th>
                       <th className="p-3 font-medium">Title/Topic</th>
                       <th className="p-3 font-medium">Word Count</th>
                       <th className="p-3 font-medium">Generated On</th>
                       <th className="p-3 font-medium text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody>
                    {recentGenerations.map((gen) => (
                       <tr key={gen.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                             <span className={`px-2 py-1 rounded text-xs font-semibold ${
                               gen.type === 'GBP Post' ? 'bg-blue-100 text-blue-800' :
                               gen.type === 'Blog' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                             }`}>
                               {gen.type}
                             </span>
                          </td>
                          <td className="p-3 font-medium">{gen.title}</td>
                          <td className="p-3 text-muted-foreground">{gen.words} words</td>
                          <td className="p-3 text-muted-foreground">{gen.date}</td>
                          <td className="p-3 text-right">
                             <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">View / Edit</Button>
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
