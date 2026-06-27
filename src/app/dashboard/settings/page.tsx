"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Global Settings</h1>
          <p className="text-muted-foreground">Manage AI Gateway keys and platform configurations.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>AI Gateway Setup</CardTitle>
            <CardDescription>Provide your own API keys to power the AI features across modules.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <label className="text-sm font-medium">OpenAI API Key</label>
                <Input type="password" placeholder="sk-..." />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium">Anthropic API Key</label>
                <Input type="password" placeholder="sk-ant-..." />
             </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
             <Button onClick={() => toast.success("AI API Keys saved successfully.")}>Save Keys</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agency Branding</CardTitle>
            <CardDescription>Customize the platform appearance for your clients.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input defaultValue="MapPilot OS" />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium">Support Email</label>
                <Input defaultValue="support@mappilot.com" />
             </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
             <Button onClick={() => toast.success("Branding settings saved.")}>Save Branding</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
