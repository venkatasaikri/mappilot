"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Lock, Globe, FileText } from "lucide-react";

const prompts = [
  { id: 1, name: "GBP: Emergency Promo", type: "GBP Post", category: "Promotional", system: true },
  { id: 2, name: "Blog: Local City Service", type: "Blog", category: "SEO Structure", system: true },
  { id: 3, name: "Custom: Plumber Review Highlight", type: "GBP Post", category: "Social Proof", system: false },
];

export default function PromptLibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prompt Library</h1>
          <p className="text-muted-foreground">Manage AI templates and system instructions. (Agency Admin View)</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} /> New Template
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI Templates</CardTitle>
              <CardDescription>System templates are globally locked. Custom templates are specific to your agency.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search templates..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {prompts.map((prompt) => (
                 <Card key={prompt.id} className={`flex flex-col ${prompt.system ? 'bg-muted/10 border-dashed' : 'border-blue-200 shadow-sm'}`}>
                    <CardHeader className="pb-2">
                       <div className="flex justify-between items-start">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                             prompt.type === 'GBP Post' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                             {prompt.type}
                          </span>
                          {prompt.system ? (
                             <Lock size={14} className="text-muted-foreground" />
                          ) : (
                             <Globe size={14} className="text-blue-500" />
                          )}
                       </div>
                       <CardTitle className="text-base mt-2">{prompt.name}</CardTitle>
                       <CardDescription className="text-xs">{prompt.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 mt-2">
                       <div className="bg-muted p-3 rounded-md text-xs font-mono text-muted-foreground line-clamp-3">
                          "Act as an expert local SEO copywriter. You are writing a {prompt.type} for a local business. Focus heavily on..."
                       </div>
                    </CardContent>
                    <div className="p-4 pt-0 mt-auto">
                       <Button variant={prompt.system ? "outline" : "default"} className="w-full text-xs h-8">
                          {prompt.system ? 'View Details (Locked)' : 'Edit Prompt'}
                       </Button>
                    </div>
                 </Card>
              ))}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
