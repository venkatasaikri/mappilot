"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Swords, Globe, Star, Plus } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CompetitorDiscoveryPage() {
  const [keyword, setKeyword] = useState("plumber near me");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    setIsSearching(true);
    toast.info("Scanning Google Maps for top competitors...");
    
    try {
      const res = await fetch('/api/competitors/discover', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, locationId: "local" })
      });
      const data = await res.json();
      if (res.ok) {
        setResults(data.competitors);
        toast.success(`Found ${data.competitors.length} top competitors!`);
      } else {
        toast.error("Failed to discover competitors.");
      }
    } catch (e) {
      toast.error("An error occurred during discovery.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleTrack = (name: string) => {
    toast.success(`Now tracking ${name}! They will appear on your benchmarking dashboard.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/competitors" className="text-sm text-indigo-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Competitor Discovery</h1>
        <p className="text-muted-foreground">Find out who is capturing the search traffic in your area.</p>
      </div>

      <Card className="bg-indigo-50/30 border-indigo-100">
        <CardContent className="p-6">
           <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="space-y-2 flex-1">
                 <label className="text-sm font-medium">Target Keyword</label>
                 <Input 
                   value={keyword} 
                   onChange={(e) => setKeyword(e.target.value)}
                   className="bg-white" 
                 />
              </div>
              <div className="space-y-2 flex-1">
                 <label className="text-sm font-medium flex items-center gap-1"><MapPin size={14}/> Center Location</label>
                 <Input defaultValue="Acme Plumbing (Downtown)" disabled className="bg-muted text-muted-foreground" />
              </div>
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 h-10 px-8" onClick={handleSearch} disabled={isSearching}>
                 <Search size={16} /> {isSearching ? "Scanning..." : "Find Competitors"}
              </Button>
           </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Discovery Results</CardTitle>
            <CardDescription>We found these businesses ranking in the Map Pack for your keyword.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid gap-4 md:grid-cols-2">
                {results.map((comp) => (
                   <div key={comp.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-lg text-muted-foreground border">
                           #{comp.rank}
                         </div>
                         <div>
                            <div className="font-semibold">{comp.name}</div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                               <span className="flex items-center text-amber-500 font-medium"><Star size={12} className="mr-1 fill-amber-500"/> {comp.rating} ({comp.reviews})</span>
                               <span className="flex items-center"><MapPin size={12} className="mr-1"/> {comp.distance}</span>
                            </div>
                         </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" onClick={() => handleTrack(comp.name)}>
                         <Plus size={14} /> Track
                      </Button>
                   </div>
                ))}
             </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
