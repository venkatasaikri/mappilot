"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Store, ArrowRight, Trash2 } from "lucide-react";
import { toast } from "sonner";

const initialBusinesses = [
  { id: 1, name: "Starbucks Coffee", category: "Coffee Shop", locationsCount: 142, gbpConnected: true },
  { id: 2, name: "Acme Plumbing", category: "Plumber", locationsCount: 3, gbpConnected: true },
  { id: 3, name: "Downtown Fitness", category: "Gym", locationsCount: 1, gbpConnected: false },
];

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState(initialBusinesses);

  const handleDelete = (id: number, name: string) => {
    // In a real app, you would call an API route (e.g. DELETE /api/businesses) here.
    if(confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
        setBusinesses(businesses.filter(b => b.id !== id));
        toast.success(`${name} deleted successfully.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Businesses</h1>
          <p className="text-muted-foreground">Manage business profiles and Google connections.</p>
        </div>
        <Link href="/dashboard/businesses/new">
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Add Business
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Businesses</CardTitle>
              <CardDescription>View and manage your core business entities.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search businesses..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {businesses.map((business) => (
              <Card key={business.id} className="hover:shadow-md transition-shadow relative group">
                <Button 
                   variant="destructive" 
                   size="icon" 
                   className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 w-8 h-8 rounded-full"
                   onClick={() => handleDelete(business.id, business.name)}
                >
                   <Trash2 size={14} />
                </Button>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Store className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    {business.gbpConnected ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-8">
                        GBP Synced
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 mr-8">
                        Not Connected
                      </span>
                    )}
                  </div>
                  <CardTitle className="mt-4">{business.name}</CardTitle>
                  <CardDescription>{business.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-medium mt-2">
                    {business.locationsCount} {business.locationsCount === 1 ? 'Location' : 'Locations'}
                  </div>
                  <Link href={`/dashboard/businesses/${business.id}`}>
                    <Button variant="outline" className="w-full mt-4 flex items-center justify-between">
                      Manage Profile
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}

            {businesses.length === 0 && (
                <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                   No businesses found. Add your first business to get started.
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
