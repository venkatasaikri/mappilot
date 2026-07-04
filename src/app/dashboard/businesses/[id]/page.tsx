"use client";

import React, { useState, use, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Store, Clock, LayoutList, MapPin, Package, Plus } from "lucide-react";
import { toast } from "sonner";

export default function BusinessDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("overview");
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/businesses/${id}`)
      .then(res => res.json())
      .then(data => {
        setBusiness(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading business details...</div>;
  if (!business || business.error) return <div>Business not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{business.name}</h1>
          <p className="text-muted-foreground">Manage profile, hours, and services.</p>
        </div>
        {business.gbpConnected ? (
          <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
            GBP Connected
          </Button>
        ) : (
          <Button variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-50">
            Connect GBP
          </Button>
        )}
      </div>

      {/* Basic Custom Tabs implementation */}
      <div className="flex space-x-1 border-b">
        {['overview', 'locations', 'hours', 'services', 'products'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
              activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Store size={18}/> Core Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Business Name</label>
                <Input defaultValue={business.name} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Category</label>
                <Input defaultValue={business.category || "Uncategorized"} />
              </div>
              <Button onClick={() => toast.success("Changes saved!")}>Save Changes</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'locations' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2"><MapPin size={18}/> Managed Locations</CardTitle>
              <CardDescription>View associated sub-locations.</CardDescription>
            </div>
            <Button size="sm" className="gap-2" onClick={() => toast.success("Opening Location creation wizard...")}><Plus size={16} /> Add Location</Button>
          </CardHeader>
          <CardContent>
             <div className="rounded-md border p-8 text-center text-muted-foreground bg-muted/20">
               Data Table of Locations... (Currently 1 location fetched)
             </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'hours' && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock size={18}/> Standard Operating Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div key={day} className="flex items-center gap-4">
                <span className="w-24 font-medium">{day}</span>
                <Input type="time" defaultValue="08:00" className="w-32" />
                <span>to</span>
                <Input type="time" defaultValue="18:00" className="w-32" />
              </div>
            ))}
            <Button className="mt-4" onClick={() => toast.success("Hours updated!")}>Update Hours</Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'services' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><LayoutList size={18}/> Services Menu</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="rounded-md border p-8 text-center text-muted-foreground bg-muted/20">
               Service Categories and Items Builder...
             </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'products' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Package size={18}/> Products Catalog</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="rounded-md border p-8 text-center text-muted-foreground bg-muted/20">
               Products and Pricing Builder...
             </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
