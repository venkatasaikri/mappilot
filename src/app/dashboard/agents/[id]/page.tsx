"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, ShieldAlert, Bot, History, CheckCircle2, Play, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import React, { use, useEffect, useState } from "react";

export default function AgentConfigurationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [executingTask, setExecutingTask] = useState(false);
  
  // Form State
  const [autonomy, setAutonomy] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [permissions, setPermissions] = useState({ gbp: false, competitor: false, billing: false });

  const fetchAgent = () => {
    fetch(`/api/agents/${id}`)
      .then(res => res.json())
      .then(data => {
        setAgent(data);
        setAutonomy(data.autonomy);
        setSystemPrompt(data.systemPrompt || "");
        if (data.permissions) {
          try {
            setPermissions(JSON.parse(data.permissions));
          } catch (e) {}
        }
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchAgent();
  }, [id]);

  const handleSave = async () => {
    toast.info("Saving configuration...");
    try {
      const res = await fetch(`/api/agents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ autonomy, systemPrompt, permissions })
      });
      if (res.ok) {
        toast.success(`${agent?.name || 'Agent'} configuration saved successfully!`);
      } else {
        toast.error("Failed to save configuration.");
      }
    } catch (e) {
      toast.error("An error occurred while saving.");
    }
  };

  const handleTriggerTestTask = async () => {
    if (!agent) return;
    setExecutingTask(true);
    toast.info("Task added to queue. Agent is processing...");

    try {
      const res = await fetch(`/api/agents/queue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          agentId: agent.id, 
          taskType: "custom", 
          payload: { description: "Analyzed local market trends for Q3" } 
        })
      });
      
      if (res.ok) {
        toast.success("Task completed successfully!");
        fetchAgent(); // Refresh task memory
      } else {
        toast.error("Task execution failed.");
      }
    } catch (e) {
      toast.error("An error occurred during execution.");
    } finally {
      setExecutingTask(false);
    }
  };

  if (loading) return <div className="p-8 text-muted-foreground">Loading agent configuration...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
           <Link href="/dashboard/agents" className="text-sm text-purple-600 hover:underline flex items-center gap-1 mb-2">
             <ArrowLeft size={14} /> Back to Roster
           </Link>
           <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
             <Bot className="text-purple-600" size={32} /> 
             {agent?.name} Configuration
           </h1>
           <p className="text-muted-foreground mt-1">Set permissions, guardrails, and review task history.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2 border-purple-200 text-purple-700 hover:bg-purple-50" onClick={handleTriggerTestTask} disabled={executingTask}>
             {executingTask ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
             {executingTask ? "Executing..." : "Trigger Test Task"}
           </Button>
           <Button className="gap-2 bg-purple-600 hover:bg-purple-700" onClick={handleSave}>
              <Save size={16} /> Save Changes
           </Button>
        </div>
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
                   <select 
                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                     value={autonomy}
                     onChange={(e) => setAutonomy(e.target.value)}
                   >
                     <option>Draft Only (Requires Manual Approval)</option>
                     <option>Fully Autonomous (Execute immediately)</option>
                   </select>
                   <p className="text-xs text-muted-foreground">If set to Draft Only, tasks will appear in your queue for review before publishing.</p>
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-medium">System Prompt / Brand Voice</label>
                   <Textarea 
                      className="h-32 resize-none" 
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
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
                   <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
                      checked={permissions.gbp}
                      onChange={(e) => setPermissions({ ...permissions, gbp: e.target.checked })}
                   />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                   <div>
                      <div className="font-semibold text-sm">Competitor Intelligence Data</div>
                      <div className="text-xs text-muted-foreground">Allows the agent to read competitor tracking data.</div>
                   </div>
                   <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
                      checked={permissions.competitor}
                      onChange={(e) => setPermissions({ ...permissions, competitor: e.target.checked })}
                   />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                   <div>
                      <div className="font-semibold text-sm">Billing Engine</div>
                      <div className="text-xs text-muted-foreground">Allows the agent to purchase more SMS credits.</div>
                   </div>
                   <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
                      checked={permissions.billing} disabled 
                   />
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
                   {agent?.tasks?.length > 0 ? agent.tasks.map((task: any) => (
                     <div key={task.id} className="p-4">
                        <div className="flex items-center gap-2 font-semibold text-green-700 mb-1">
                          {task.status === "Pending Review" ? <History size={14} className="text-amber-600"/> : <CheckCircle2 size={14}/>} 
                          <span className={task.status === "Pending Review" ? "text-amber-600" : ""}>{task.status}</span>
                        </div>
                        <p className="text-muted-foreground line-clamp-2">{task.description}</p>
                        <span className="text-[10px] text-muted-foreground mt-2 block">{new Date(task.createdAt).toLocaleString()}</span>
                     </div>
                   )) : (
                     <div className="p-4 text-muted-foreground">No recent tasks.</div>
                   )}
                </div>
             </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
}
