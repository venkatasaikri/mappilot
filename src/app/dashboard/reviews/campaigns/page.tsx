"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Smartphone, Users, Send, Upload, Star } from "lucide-react";
import { toast } from "sonner";

export default function ReviewCampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/reviews/campaigns')
      .then(res => res.json())
      .then(data => setCampaigns(data))
      .catch(console.error);
  }, []);

  const activeCampaigns = campaigns.filter(c => c.status === 'Running').length;
  const totalSent = campaigns.reduce((acc, curr) => acc + (curr.sent || 0), 0);
  const totalGenerated = campaigns.reduce((acc, curr) => acc + (curr.generated || 0), 0);
  const conversionRate = totalSent > 0 ? ((totalGenerated / totalSent) * 100).toFixed(1) : "0.0";

  const handleLaunch = () => {
    toast.success("Campaign launched successfully. Background workers are processing...");
    // Ideally this would POST to /api/reviews/campaigns to save the new campaign.
    fetch('/api/reviews/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: "New SMS Blast", type: "SMS" })
    }).then(() => {
      // Refresh list
      fetch('/api/reviews/campaigns').then(res => res.json()).then(setCampaigns);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Request Campaigns</h1>
          <p className="text-muted-foreground">Automate SMS and Email requests to generate new 5-star reviews.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Send className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCampaigns}</div>
            <p className="text-xs text-muted-foreground mt-1">Running right now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requests Sent</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSent}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Star className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">{totalGenerated} new reviews generated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="bg-blue-50/50 border-b pb-4">
            <CardTitle>Create New Campaign</CardTitle>
            <CardDescription>Upload contacts and trigger a review request blast.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            
            <div className="space-y-3">
               <label className="text-sm font-medium">1. Select Channel</label>
               <div className="grid grid-cols-2 gap-4">
                 <div className="border-2 border-blue-600 bg-blue-50 rounded-md p-4 flex flex-col items-center cursor-pointer">
                    <Smartphone className="text-blue-600 mb-2" size={24} />
                    <span className="font-semibold">SMS (Text)</span>
                 </div>
                 <div className="border-2 border-transparent hover:border-muted-foreground bg-muted/20 rounded-md p-4 flex flex-col items-center cursor-pointer transition-colors">
                    <Mail className="text-muted-foreground mb-2" size={24} />
                    <span className="font-semibold">Email</span>
                 </div>
               </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">2. Audience (Upload CSV)</label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload size={24} className="mb-2" />
                <span className="text-sm font-medium text-foreground">Click to upload CSV</span>
                <span className="text-xs mt-1">Required columns: Name, Phone</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">3. Message Template</label>
              <Textarea 
                className="min-h-[100px]" 
                defaultValue="Hi {{FirstName}}, thank you for choosing Acme Plumbing! If you have a minute, we'd love it if you could leave us a review here: {{ReviewLink}}"
              />
              <p className="text-xs text-muted-foreground">The <code>{`{{ReviewLink}}`}</code> tag will automatically route customers to Google.</p>
            </div>

          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button className="w-full gap-2" onClick={handleLaunch}><Send size={16} /> Launch Campaign</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
             <CardTitle>Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {campaigns.length === 0 ? (
               <p className="text-sm text-muted-foreground">No campaigns found.</p>
             ) : (
               campaigns.map((c) => (
                 <div key={c.id} className={`border rounded-lg p-4 ${c.status === 'Running' ? 'bg-muted/10' : ''}`}>
                    <div className="flex justify-between items-center mb-2">
                       <h3 className="font-bold">{c.name}</h3>
                       <span className={`text-xs px-2 py-1 rounded-full ${c.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                         {c.status}
                       </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">Sending via {c.type} to {c.sent} contacts</div>
                    
                    {c.status === 'Completed' ? (
                      <div className="flex gap-4 text-sm">
                         <div><span className="font-semibold">{c.sent}</span> Sent</div>
                         <div><span className="font-semibold text-green-600">{c.generated}</span> Reviews Generated</div>
                      </div>
                    ) : (
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    )}
                 </div>
               ))
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
