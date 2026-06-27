import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full max-w-md shadow-lg border-muted">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full">Send Reset Link</Button>
        <div className="text-sm text-center text-muted-foreground mt-4">
          <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Back to login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
