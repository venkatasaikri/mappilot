"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Settings2, Activity, Play, Square, MessageSquare, TrendingUp, Search, PenTool, Swords } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function AgentsDashboardPage() {
  const [agents, setAgents] = useState([
    { id: "review-agent", name: "Review Agent", role: "Reputation Manager", status: "online", icon: MessageSquare, tasksCompleted: 142, description: "Monitors incoming Google reviews and drafts localized replies based on brand sentiment guidelines." },
    { id: "seo-agent", name: "SEO Agent", role: "Technical Analyst", status: "online", icon: TrendingUp, tasksCompleted: 8, description: "Constantly monitors local map rankings and geo-grids to identify drops in keyword visibility." },
    { id: "gbp-agent", name: "GBP Sync Agent", role: "Profile Manager", status: "offline", icon: Search, tasksCompleted: 45, description: "Ensures Google Business Profile data (hours, photos, attributes) stays perfectly synced with your central dashboard." },
    { id: "content-agent", name: "Content Agent", role: "Copywriter", status: "online", icon: PenTool, tasksCompleted: 24, description: "Takes prompts from the AI Studio and autonomously schedules and publishes weekly SEO updates to GBP." },
    { id: "competitor-agent", name: "Competitor Agent", role: "Reconnaissance", status: "offline", icon: Swords, tasksCompleted: 12, description: "Tracks local rivals to alert you if they launch a new location, change categories, or see a sudden spike in reviews." },
  ]);

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "online" ? "offline" : "online";
    setAgents(agents.map(a => a.id === id ? { ...a, status: newStatus } : a));
    toast.success(`Agent ${newStatus === 'online' ? 'started' : 'stopped'} successfully.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
             <Bot className="text-purple-600" size={32} /> 
             Autonomous Workforce
          </h1>
          <p className="text-muted-foreground mt-1">Manage your specialized AI agents that execute tasks 24/7 across MapPilot.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2"><Activity size={16} /> View Global Task Queue</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => {
           const Icon = agent.icon;
           return (
             <Card key={agent.id} className={`border-t-4 ${agent.status === 'online' ? 'border-t-green-500 shadow-md' : 'border-t-gray-300 opacity-80'}`}>
               <CardHeader className="pb-3">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                       <div className={`p-2 rounded-lg ${agent.status === 'online' ? 'bg-purple-100 text-purple-700' : 'bg-muted text-muted-foreground'}`}>
                         <Icon size={20} />
                       </div>
                       <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <div className="text-xs font-semibold text-muted-foreground">{agent.role}</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <span className="relative flex h-2.5 w-2.5">
                         {agent.status === 'online' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                         <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${agent.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                       </span>
                       <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">{agent.status}</span>
                    </div>
                 </div>
               </CardHeader>
               <CardContent className="pb-3 text-sm text-muted-foreground h-20">
                 {agent.description}
               </CardContent>
               <div className="px-6 py-2 bg-muted/30 border-y flex justify-between items-center text-xs">
                  <span className="font-semibold text-muted-foreground">Tasks Completed:</span>
                  <span className="font-bold">{agent.tasksCompleted}</span>
               </div>
               <CardFooter className="pt-4 flex gap-2">
                  <Button 
                    variant={agent.status === 'online' ? 'secondary' : 'default'} 
                    className="flex-1 gap-2 h-9"
                    onClick={() => toggleStatus(agent.id, agent.status)}
                  >
                    {agent.status === 'online' ? <Square size={14} className="fill-current"/> : <Play size={14} className="fill-current"/>} 
                    {agent.status === 'online' ? 'Stop' : 'Start'}
                  </Button>
                  <Link href={`/dashboard/agents/${agent.id}`} className="flex-1">
                    <Button variant="outline" className="w-full gap-2 h-9">
                      <Settings2 size={14} /> Configure
                    </Button>
                  </Link>
               </CardFooter>
             </Card>
           )
        })}
      </div>
    </div>
  );
}
