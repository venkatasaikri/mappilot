"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, ShieldAlert, Bot, History, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import React, { use } from "react";

export default function AgentConfigurationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  // Mock finding the specific agent based on URL param
  const agentName = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const handleSave = () => {
    toast.success(`${agentName} configuration saved successfully!`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
           <Link href="/dashboard/agents" className="text-sm text-purple-600 hover:underline flex items-center gap-1 mb-2">
             <ArrowLeft size={14} /> Back to Roster
           </Link>
           <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
             <Bot className="text-purple-600" size={32} /> 
             {agentName} Configuration
           </h1>
           <p className="text-muted-foreground mt-1">Set permissions, guardrails, and review task history.</p>
        </div>
        <Button className="gap-2 bg-purple-600 hover:bg-purple-700" onClick={handleSave}>
           <Save size={16} /> Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Main Config */}
        <div className="md:col-span-2 space-y-6">
           <Card>
             <CardHeader className="border-b bg-muted/20 pb-4">
               <CardTitle className="text-lg">Behavior & Guardrails</CardTitle>
               <CardDescription>Instruct the agent on how it should behave when executing tasks.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-5 pt-5">
                <div className="space-y-2">
                   <label className="text-sm font-medium">Autonomy Level</label>
                   <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                     <option>Draft Only (Requires Manual Approval)</option>
                     <option>Fully Autonomous (Execute immediately)</option>
                   </select>
                   <p className="text-xs text-muted-foreground">If set to Draft Only, tasks will appear in your queue for review before publishing.</p>
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-medium">System Prompt / Brand Voice</label>
                   <Textarea 
                      className="h-32 resize-none" 
                      defaultValue="You are the reputation manager for a plumbing company. Always respond politely. If a review is 1-star, apologize and ask them to call our main office."
                   />
                </div>
             </CardContent>
           </Card>

           <Card className="border-red-100">
             <CardHeader className="border-b bg-red-50/30 pb-4">
               <CardTitle className="text-lg flex items-center gap-2 text-red-700"><ShieldAlert size={18}/> Tool Permissions</CardTitle>
               <CardDescription>Select which MapPilot modules this agent is allowed to interact with.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4 pt-5">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                   <div>
                      <div className="font-semibold text-sm">Google Business Profile API</div>
                      <div className="text-xs text-muted-foreground">Allows the agent to publish posts and reply to reviews.</div>
                   </div>
                   <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                   <div>
                      <div className="font-semibold text-sm">Competitor Intelligence Data</div>
                      <div className="text-xs text-muted-foreground">Allows the agent to read competitor tracking data.</div>
                   </div>
                   <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                   <div>
                      <div className="font-semibold text-sm">Billing Engine</div>
                      <div className="text-xs text-muted-foreground">Allows the agent to purchase more SMS credits.</div>
                   </div>
                   <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" disabled />
                </div>
             </CardContent>
           </Card>
        </div>

        {/* Task Memory Log */}
        <div className="md:col-span-1">
           <Card className="h-full">
             <CardHeader className="pb-3 border-b">
               <CardTitle className="text-base flex items-center gap-2"><History size={16}/> Recent Task Memory</CardTitle>
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y text-sm">
                   <div className="p-4">
                      <div className="flex items-center gap-2 font-semibold text-green-700 mb-1"><CheckCircle2 size={14}/> Task Completed</div>
                      <p className="text-muted-foreground line-clamp-2">Drafted a reply to a 4-star review from user 'John D.'</p>
                      <span className="text-[10px] text-muted-foreground mt-2 block">2 hours ago</span>
                   </div>
                   <div className="p-4">
                      <div className="flex items-center gap-2 font-semibold text-green-700 mb-1"><CheckCircle2 size={14}/> Task Completed</div>
                      <p className="text-muted-foreground line-clamp-2">Analyzed weekly sentiment. No critical issues found.</p>
                      <span className="text-[10px] text-muted-foreground mt-2 block">Yesterday</span>
                   </div>
                   <div className="p-4 opacity-50">
                      <div className="flex items-center gap-2 font-semibold mb-1"><CheckCircle2 size={14}/> Task Completed</div>
                      <p className="text-muted-foreground line-clamp-2">Drafted a reply to a 5-star review.</p>
                      <span className="text-[10px] text-muted-foreground mt-2 block">Jun 12, 2026</span>
                   </div>
                </div>
             </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
}
