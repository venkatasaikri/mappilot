"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Save, Send, ArrowLeft, RefreshCw, PenTool } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ContentGeneratorPage() {
  const [contentType, setContentType] = useState("gbp");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    toast.info("Sending prompt to AI Gateway...");
    
    // Simulate streaming AI output
    setTimeout(() => {
      if (contentType === 'gbp') {
        setOutput("🚰 Dealing with a plumbing emergency in Downtown? Don't let a burst pipe ruin your day! \n\nAt Acme Plumbing, we offer 24/7 emergency response times. Our licensed technicians arrive fully equipped to handle leaks, clogs, and water heater failures on the spot.\n\nCall us now or click below to schedule immediate service! 👇\n\n#EmergencyPlumber #DowntownPlumbing #AcmePlumbing");
      } else {
        setOutput("# The Importance of Routine Drain Cleaning Before Winter\n\nAs temperatures drop, the last thing you want is a frozen or backed-up pipe. Winter puts extreme stress on your plumbing system...\n\n[Full Blog Content Generated...]");
      }
      setIsGenerating(false);
      toast.success("Content generated successfully!");
    }, 2500);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
           <Link href="/dashboard/studio" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
             <ArrowLeft size={14} /> Back to Studio
           </Link>
           <h1 className="text-2xl font-bold tracking-tight">Content Generator</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Panel: Configuration */}
        <Card className="lg:w-1/3 flex flex-col h-full overflow-y-auto">
          <CardHeader className="border-b bg-muted/20 pb-4">
            <CardTitle className="text-lg">Generation Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-5">
             
             <div className="space-y-2">
                <label className="text-sm font-medium">1. Content Type</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                >
                  <option value="gbp">Google Business Post (Update/Offer)</option>
                  <option value="blog">SEO Blog Article</option>
                  <option value="service">Local Service Page (Website)</option>
                  <option value="faq">FAQ Schema Generation</option>
                </select>
             </div>

             <div className="space-y-2">
                <label className="text-sm font-medium">2. AI Template (Prompt)</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {contentType === 'gbp' && (
                    <>
                      <option>Emergency Service Promo (Urgent)</option>
                      <option>Seasonal Maintenance Reminder</option>
                      <option>Customer Review Highlight</option>
                    </>
                  )}
                  {contentType !== 'gbp' && (
                    <>
                      <option>Long-form Informational (1,500+ words)</option>
                      <option>Local City Service Page (Highly Geo-targeted)</option>
                    </>
                  )}
                </select>
             </div>

             <div className="space-y-2">
                <label className="text-sm font-medium">3. Target Keywords</label>
                <Input placeholder="e.g. drain cleaning, emergency plumber" />
             </div>

             <div className="space-y-2">
                <label className="text-sm font-medium">4. Tone of Voice</label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs cursor-pointer border border-blue-200">Professional</span>
                  <span className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-xs cursor-pointer">Friendly</span>
                  <span className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-xs cursor-pointer">Urgent</span>
                  <span className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-xs cursor-pointer">Educational</span>
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-sm font-medium">5. Additional Context (Optional)</label>
                <Textarea placeholder="Mention our new 20% off winter special..." className="h-24 resize-none" />
             </div>

             <Button 
                className="w-full gap-2 bg-purple-600 hover:bg-purple-700 text-white mt-4" 
                onClick={handleGenerate}
                disabled={isGenerating}
             >
                {isGenerating ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
                {isGenerating ? "Generating..." : "Generate Content"}
             </Button>

          </CardContent>
        </Card>

        {/* Right Panel: Output Editor */}
        <Card className="lg:w-2/3 flex flex-col h-full">
          <CardHeader className="border-b bg-muted/5 py-3 px-4 flex flex-row items-center justify-between space-y-0">
             <div className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
               <PenTool size={14} /> Output Editor
             </div>
             <div className="flex gap-2">
               <Button variant="outline" size="sm" className="h-8 gap-1" disabled={!output}><Save size={14}/> Save Draft</Button>
               {contentType === 'gbp' && (
                 <Button size="sm" className="h-8 gap-1 bg-blue-600 hover:bg-blue-700" disabled={!output} onClick={() => toast.success("Synced to Google Business Profile!")}>
                   <Send size={14}/> Post to GBP
                 </Button>
               )}
             </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 relative">
             {!output && !isGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-muted/10">
                   <Sparkles size={48} className="opacity-20 mb-4" />
                   <p>Configure settings and click generate to see AI output here.</p>
                </div>
             )}
             {isGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
                   <RefreshCw className="animate-spin text-purple-600 mb-4" size={32} />
                   <p className="font-medium animate-pulse">Crafting local SEO content...</p>
                </div>
             )}
             <textarea 
               className="w-full h-full p-6 resize-none border-0 focus-visible:ring-0 text-foreground bg-transparent"
               value={output}
               onChange={(e) => setOutput(e.target.value)}
               placeholder="Output will appear here. You can edit it manually before publishing."
             />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
