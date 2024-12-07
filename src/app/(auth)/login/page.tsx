import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { login } from "@/app/(auth)/_actions/login";
import { SubmitButton } from "@/app/(auth)/_components/submit-button";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to TravelSocial</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <form action={login}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <SubmitButton
              className="w-full"
              title="Sign in"
              pendingMessage="Logging you in..."
            />
            <Link href="/signup" className="w-full">
              <Button variant="outline" className="w-full">
                Create Account
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
