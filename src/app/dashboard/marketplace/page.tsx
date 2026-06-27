"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, CheckCircle2, AlertCircle, RefreshCw, Key } from "lucide-react";
import { toast } from "sonner";

const availablePlugins = [
  { id: "mod_dhanda", name: "Dhanda Engine", description: "Advanced local SEO analytics and grid tracking.", version: "1.2.0", author: "MapPilot Core", installed: true, active: true, requiresLicense: true, licenseValid: true },
  { id: "mod_falcon", name: "Local Falcon Sync", description: "Deep integration with Local Falcon API for scan credits.", version: "2.0.1", author: "MapPilot Core", installed: true, active: false, requiresLicense: true, licenseValid: false },
  { id: "mod_review", name: "ReviewTrackers", description: "Automated review generation and response AI.", version: "1.0.5", author: "MapPilot Core", installed: false, active: false, requiresLicense: true, licenseValid: false },
  { id: "mod_agency", name: "Agency Whitelabel", description: "Custom domains and branding for your clients.", version: "3.1.0", author: "MapPilot Core", installed: false, active: false, requiresLicense: false, licenseValid: true },
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("browse");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plugin Marketplace</h1>
          <p className="text-muted-foreground">Extend MapPilot functionality with modules.</p>
        </div>
      </div>

      <div className="flex space-x-1 border-b">
        {['browse', 'installed', 'updates'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
              activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'browse' ? 'Browse Directory' : tab}
          </button>
        ))}
      </div>

      <div className="relative max-w-md my-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search modules..." className="pl-9" />
      </div>

      {activeTab === 'browse' && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {availablePlugins.map((plugin) => (
            <Card key={plugin.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{plugin.name}</CardTitle>
                    <CardDescription className="mt-1">By {plugin.author}</CardDescription>
                  </div>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded-md">v{plugin.version}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{plugin.description}</p>
                {plugin.requiresLicense && (
                  <div className="mt-4 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-200 dark:border-amber-900">
                    <Key size={14} /> Premium License Required
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4 bg-muted/10">
                {plugin.installed ? (
                  <Button variant="secondary" className="w-full text-green-700 bg-green-100 hover:bg-green-200">
                    <CheckCircle2 size={16} className="mr-2" /> Installed
                  </Button>
                ) : (
                  <Button className="w-full" onClick={() => toast.success(`Started installing ${plugin.name}`)}>
                    <Download size={16} className="mr-2" /> Install Now
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'installed' && (
        <div className="space-y-4">
          {availablePlugins.filter(p => p.installed).map((plugin) => (
            <Card key={plugin.id}>
              <div className="flex flex-col sm:flex-row items-center p-6 gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{plugin.name}</h3>
                  <p className="text-sm text-muted-foreground">{plugin.description}</p>
                  
                  {plugin.requiresLicense && !plugin.licenseValid && (
                     <div className="mt-3 flex items-center gap-3">
                       <Input placeholder="Enter License Key..." className="max-w-xs h-8 text-sm" />
                       <Button size="sm" variant="outline" onClick={() => toast.success("License validated successfully!")}>Validate</Button>
                     </div>
                  )}
                  {plugin.requiresLicense && plugin.licenseValid && (
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <CheckCircle2 size={12} /> License Active
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-4 border-l pl-6">
                  {plugin.active ? (
                    <span className="text-sm font-medium text-green-600">Active</span>
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">Inactive</span>
                  )}
                  <Button variant={plugin.active ? "outline" : "default"} className={plugin.active ? "text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50" : ""} onClick={() => toast.success(`${plugin.name} is now ${plugin.active ? 'deactivated' : 'activated'}!`)}>
                    {plugin.active ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
