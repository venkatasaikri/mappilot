"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Search, MapPin, Radar, Play } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewGridScanPage() {
  const router = useRouter();

  const handleRunScan = () => {
    toast.info("Queuing new grid scan via API...");
    setTimeout(() => {
      toast.success("Scan completed!");
      router.push('/dashboard/grid/scan_new_preview');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Geo Grid Scan</h1>
        <p className="text-muted-foreground">Configure your parameters to generate a new ranking heatmap.</p>
      </div>

      <Card>
        <CardHeader className="bg-muted/30 border-b pb-6">
          <CardTitle className="flex items-center gap-2"><Target size={20} /> Scan Configuration</CardTitle>
          <CardDescription>Select the location, keyword, and grid size to ping Google Places API.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          
          <div className="space-y-3">
             <label className="text-sm font-medium flex items-center gap-2"><MapPin size={16} className="text-muted-foreground"/> Target Location</label>
             <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
               <option>Acme Plumbing - Main St, Downtown</option>
               <option>Acme Plumbing - Northside Branch</option>
             </select>
          </div>

          <div className="space-y-3">
             <label className="text-sm font-medium flex items-center gap-2"><Search size={16} className="text-muted-foreground"/> Target Keyword</label>
             <Input placeholder="e.g. emergency plumber near me" defaultValue="plumber near me" />
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2"><Radar size={16} className="text-muted-foreground"/> Grid Size (Nodes)</label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option value="3">3 x 3 (9 nodes)</option>
                  <option value="5" selected>5 x 5 (25 nodes)</option>
                  <option value="7">7 x 7 (49 nodes)</option>
                  <option value="9">9 x 9 (81 nodes)</option>
                  <option value="11">11 x 11 (121 nodes)</option>
                </select>
             </div>

             <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2"><Target size={16} className="text-muted-foreground"/> Radius (Distance)</label>
                <div className="flex gap-2">
                   <Input type="number" defaultValue="5" className="w-24" />
                   <select className="flex h-10 w-24 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                     <option>Miles</option>
                     <option>KM</option>
                   </select>
                </div>
             </div>
          </div>

          {/* Visual Preview Estimate */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
             <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Scan Cost Estimate</h4>
             <p className="text-xs text-blue-600 dark:text-blue-400">
               Running a <strong>5x5 grid</strong> will consume <strong>25 API Credits</strong>. You currently have 4,500 credits remaining this month.
             </p>
          </div>

        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-end gap-3">
           <Button variant="ghost" onClick={() => router.push('/dashboard/grid')}>Cancel</Button>
           <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleRunScan}><Play size={16} /> Execute Scan</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
