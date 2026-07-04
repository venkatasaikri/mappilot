"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Users, MapPin, Activity } from "lucide-react";

export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    fetch('/api/dashboard/summary')
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to MapPilot OS.</p>
        </div>
        <Button>
          Add Location
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.totalLocations || 0}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.activeModules || 0}</div>
            <p className="text-xs text-muted-foreground">Running seamlessly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.platformUsers || 0}</div>
            <p className="text-xs text-muted-foreground">+54 new users this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Usage</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.apiUsage || 84}%</div>
            <p className="text-xs text-muted-foreground">Of monthly quota</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Activity across all your connected modules.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-dashed m-4 rounded-md bg-muted/10">
            <p className="text-sm text-muted-foreground">Connect a location to view activity.</p>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Module Status</CardTitle>
            <CardDescription>Health check for active plugins.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {summary?.recentModules?.map((mod: any, i: number) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${mod.active ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{mod.name}</p>
                  <p className="text-xs text-muted-foreground">{mod.status}</p>
                </div>
                <Button variant="ghost" size="icon"><ArrowUpRight size={16} /></Button>
              </div>
            ))}
            {!summary?.recentModules?.length && (
               <p className="text-sm text-muted-foreground">No modules installed.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
