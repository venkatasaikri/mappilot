"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Download, Printer, Settings } from "lucide-react";

export default function ReviewQrPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QR Code Generator</h1>
          <p className="text-muted-foreground">Generate scannable codes for your physical locations.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-purple-200 shadow-sm flex flex-col items-center justify-center py-12">
           {/* Mock QR Code Visual */}
           <div className="w-64 h-64 bg-white border-8 border-white shadow-lg flex items-center justify-center relative rounded-xl">
             <QrCode size={200} className="text-foreground" />
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg">
                <span className="font-bold text-xl tracking-tighter text-blue-600">G</span>
             </div>
           </div>
           
           <h3 className="text-xl font-bold mt-8 mb-2">Acme Plumbing Review Link</h3>
           <p className="text-sm text-muted-foreground text-center max-w-sm">
             When scanned, customers will be redirected directly to your Google Business Profile review screen.
           </p>

           <div className="flex gap-4 mt-8">
             <Button className="gap-2"><Download size={16} /> Download PNG</Button>
             <Button variant="outline" className="gap-2"><Printer size={16} /> Print Flyer</Button>
           </div>
        </Card>

        <Card>
          <CardHeader>
             <CardTitle className="flex items-center gap-2"><Settings size={18} /> QR Settings</CardTitle>
             <CardDescription>Customize the destination and appearance of your code.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="space-y-3 border-b pb-6">
                <label className="text-sm font-medium">Destination URL</label>
                <div className="flex gap-2">
                  <input type="text" readOnly value="https://g.page/r/Cdf342s/review" className="w-full h-10 rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground" />
                  <Button variant="secondary">Copy</Button>
                </div>
                <p className="text-xs text-muted-foreground">Currently linked directly to your connected Google Business Profile.</p>
             </div>

             <div className="space-y-3 border-b pb-6">
                <label className="text-sm font-medium">Scan Funnel (Optional)</label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option>Direct to Google</option>
                  <option>MapPilot Interceptor (Filter bad reviews)</option>
                  <option>Linktree Style (Choose platform)</option>
                </select>
                <p className="text-xs text-muted-foreground">The Interceptor acts as a middleman, asking for a thumbs up/down before sending them to Google.</p>
             </div>

             <div className="space-y-3">
                <label className="text-sm font-medium">Visual Branding</label>
                <div className="grid grid-cols-4 gap-2">
                  <div className="h-10 rounded bg-black cursor-pointer border-2 border-blue-500"></div>
                  <div className="h-10 rounded bg-blue-600 cursor-pointer"></div>
                  <div className="h-10 rounded bg-red-600 cursor-pointer"></div>
                  <div className="h-10 rounded bg-purple-600 cursor-pointer"></div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
