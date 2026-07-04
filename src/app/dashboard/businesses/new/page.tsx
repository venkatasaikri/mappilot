"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building, MapPin, Search, Plus, Store, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewBusinessPage() {
  const [searchLocation, setSearchLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedBizIds, setSelectedBizIds] = useState<Set<string>>(new Set());

  const handleSearch = async () => {
    if (!searchLocation.trim()) {
        toast.error("Please enter a location to search.");
        return;
    }
    
    setIsSearching(true);
    setResults([]);
    setSelectedBizIds(new Set());

    try {
      const res = await fetch(`/api/places?query=${encodeURIComponent(searchLocation)}`);
      const data = await res.json();

      if (!res.ok) {
         toast.error(data.error || "Failed to fetch places from Google API");
         setIsSearching(false);
         return;
      }

      setResults(data.results);
      toast.success(`Found ${data.results.length} businesses!`);
    } catch (err) {
      toast.error("An error occurred while connecting to the API.");
    } finally {
      setIsSearching(false);
    }
  };

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedBizIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedBizIds(newSelected);
  };

  const handleAddSelected = async () => {
    if (selectedBizIds.size === 0) {
       toast.error("Please select at least one business to add.");
       return;
    }

    toast.info("Saving businesses to your workspace...");

    try {
      const selectedBusinesses = results.filter(biz => selectedBizIds.has(biz.id));
      
      const promises = selectedBusinesses.map(biz => 
        fetch('/api/businesses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: biz.name, address: biz.address })
        })
      );

      await Promise.all(promises);

      toast.success(`${selectedBizIds.size} businesses added to your workspace!`);
      setTimeout(() => {
          window.location.href = "/dashboard/businesses";
      }, 1000);
    } catch (e) {
      toast.error("Failed to save businesses. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 mb-12">
      <div>
        <Link href="/dashboard/businesses" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
          <ArrowLeft size={14} /> Back to Businesses
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Add New Businesses</h1>
        <p className="text-muted-foreground">Search an area and select the businesses you want to manage.</p>
      </div>

      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MapPin className="text-blue-600"/> Find by Location</CardTitle>
          <CardDescription>Enter a city, neighborhood, or zip code. We will list the businesses found in that area.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
             <div className="relative flex-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                   placeholder="e.g. Brooklyn, NY or 90210" 
                   className="pl-10 h-11 bg-white"
                   value={searchLocation}
                   onChange={(e) => setSearchLocation(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
             </div>
             <Button className="h-11 px-8 gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleSearch} disabled={isSearching}>
                <Search size={16} /> {isSearching ? "Searching..." : "Search Location"}
             </Button>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
           <div className="flex items-center justify-between mt-8">
              <h3 className="text-lg font-semibold">Businesses found in "{searchLocation}"</h3>
              {selectedBizIds.size > 0 && (
                 <Button className="bg-green-600 hover:bg-green-700 gap-2" onClick={handleAddSelected}>
                    <CheckCircle2 size={16} /> Add Selected ({selectedBizIds.size})
                 </Button>
              )}
           </div>
           
           <div className="grid gap-4 md:grid-cols-2">
              {results.map((biz) => {
                 const isSelected = selectedBizIds.has(biz.id);
                 return (
                 <Card 
                    key={biz.id} 
                    className={`cursor-pointer transition-all ${isSelected ? 'border-green-500 bg-green-50/30 shadow-md ring-1 ring-green-500' : 'hover:border-blue-300'}`}
                    onClick={() => toggleSelection(biz.id)}
                 >
                    <CardHeader className="pb-2">
                       <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                             <div className={`p-2 rounded-lg ${isSelected ? 'bg-green-100' : 'bg-muted'}`}>
                                <Store size={20} className={`${isSelected ? 'text-green-700' : 'text-muted-foreground'}`} />
                             </div>
                             <div>
                                <CardTitle className="text-base">{biz.name}</CardTitle>
                                <CardDescription className="text-xs">{biz.category} • {biz.rating} Stars</CardDescription>
                             </div>
                          </div>
                          <div className="pt-1">
                             <input 
                               type="checkbox" 
                               checked={isSelected}
                               onChange={() => {}} // Handle via Card onClick
                               className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer pointer-events-none"
                             />
                          </div>
                       </div>
                    </CardHeader>
                    <CardContent>
                       <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                          <MapPin size={12}/> {biz.address}
                       </p>
                    </CardContent>
                 </Card>
                 )
              })}
           </div>
        </div>
      )}
    </div>
  );
}
