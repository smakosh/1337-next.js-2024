import Link from "next/link";
import { Home, PlusCircle, User } from "lucide-react";
import { logout } from "@/app/(auth)/_actions/logout";

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-2">
          <Link href="/travel" className="flex flex-col items-center p-2">
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            href="/travel/trip/create"
            className="flex flex-col items-center p-2"
          >
            <PlusCircle className="h-6 w-6" />
            <span className="text-xs">New Trip</span>
          </Link>
          <form action={logout}>
            <button type="submit" className="flex flex-col items-center p-2">
              <User className="h-6 w-6" />
              <span className="text-xs">Logout</span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
