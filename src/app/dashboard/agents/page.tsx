"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Settings2, Activity, Play, Square, MessageSquare, TrendingUp, Search, PenTool, Swords } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Helper to map DB agent names to icons and roles
const getAgentMeta = (name: string) => {
  if (name.includes("Review")) return { icon: MessageSquare, role: "Reputation Manager" };
  if (name.includes("SEO")) return { icon: TrendingUp, role: "Technical Analyst" };
  if (name.includes("GBP")) return { icon: Search, role: "Profile Manager" };
  if (name.includes("Content")) return { icon: PenTool, role: "Copywriter" };
  if (name.includes("Competitor")) return { icon: Swords, role: "Reconnaissance" };
  return { icon: Bot, role: "General Agent" };
};

export default function AgentsDashboardPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agents/registry')
      .then(res => res.json())
      .then(data => {
        setAgents(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "online" ? "offline" : "online";
    
    // Optimistic UI update
    setAgents(agents.map(a => a.id === id ? { ...a, status: newStatus } : a));
    
    try {
      const res = await fetch('/api/agents/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success(`Agent ${newStatus === 'online' ? 'started' : 'stopped'} successfully.`);
    } catch (e) {
      toast.error("Failed to update agent status");
      // Revert on failure
      setAgents(agents.map(a => a.id === id ? { ...a, status: currentStatus } : a));
    }
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading Workforce...</div>;

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
           const meta = getAgentMeta(agent.name);
           const Icon = meta.icon;
           
           // Clean up the URL slug based on the name
           const slug = agent.name.toLowerCase().replace(/\s+/g, '-');

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
                          <div className="text-xs font-semibold text-muted-foreground">{meta.role}</div>
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
                 {/* Extract description from systemPrompt for UI display */}
                 {agent.systemPrompt ? agent.systemPrompt.replace(`You are the ${agent.name}. `, '') : "No description available."}
               </CardContent>
               <div className="px-6 py-2 bg-muted/30 border-y flex justify-between items-center text-xs">
                  <span className="font-semibold text-muted-foreground">Tasks Completed:</span>
                  <span className="font-bold">{agent.tasks ? agent.tasks.length : 0}</span>
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
                  <Link href={`/dashboard/agents/${slug}`} className="flex-1">
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
