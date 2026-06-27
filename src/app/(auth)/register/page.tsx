"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MapPin, Mail, Lock, User, Building } from "lucide-react";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to create account");
        setIsLoading(false);
        return;
      }
      
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-8">
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <MapPin className="text-white" size={20} />
           </div>
           <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
             MapPilot
           </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h2>
        <p className="text-muted-foreground mt-2">
          Start automating your local SEO and building your agency.
        </p>
      </div>

      <div className="grid gap-4">
         <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-sm font-medium leading-none" htmlFor="firstName">
                    First Name
                  </label>
                  <div className="relative">
                     <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Input id="firstName" name="firstName" placeholder="John" className="pl-10 h-10" required />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium leading-none" htmlFor="lastName">
                    Last Name
                  </label>
                  <div className="relative">
                     <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Input id="lastName" name="lastName" placeholder="Doe" className="pl-10 h-10" required />
                  </div>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-medium leading-none" htmlFor="agencyName">
                 Agency / Company Name
               </label>
               <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="agencyName" name="agencyName" placeholder="Acme Marketing" className="pl-10 h-10" required />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-medium leading-none" htmlFor="email">
                 Work Email
               </label>
               <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" name="email" type="email" placeholder="john@acme.com" className="pl-10 h-10" required />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-medium leading-none" htmlFor="password">
                 Password
               </label>
               <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" name="password" type="password" className="pl-10 h-10" required />
               </div>
            </div>
            
            <Button className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-base mt-4" disabled={isLoading}>
               {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
         </form>

         <p className="px-8 text-center text-xs text-muted-foreground mt-4">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-indigo-600">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-indigo-600">Privacy Policy</Link>.
         </p>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
          Sign in here
        </Link>
      </p>
    </div>
  );
}
