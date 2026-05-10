import Link from "next/link";
import { Search, Bell, Settings } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Header Toolbar */}
      <header className="flex h-14 items-center border-b border-border bg-background px-6 shrink-0">
        
        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link 
            href="/dashboard" 
            className="relative text-[13px] font-bold text-text-primary py-1.5"
          >
            Home
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-primary" />
          </Link>
          <Link 
            href="/trips/new" 
            className="text-[13px] font-semibold text-text-secondary hover:text-text-primary transition-colors py-1.5"
          >
            Book
          </Link>
          <Link 
            href="/trips" 
            className="text-[13px] font-semibold text-text-secondary hover:text-text-primary transition-colors py-1.5"
          >
            My Trips
          </Link>
          <Link
            href="/profile"
            className="text-[13px] font-semibold text-text-secondary hover:text-text-primary transition-colors py-1.5"
          >
            Profile
          </Link>
          <Link
            href="/community"
            className="text-[13px] font-semibold text-text-secondary hover:text-text-primary transition-colors py-1.5"
          >
            Community
          </Link>
          <Link
            href="/admin"
            className="text-[13px] font-semibold text-text-muted hover:text-text-primary transition-colors py-1.5"
          >
            Admin
          </Link>
        </nav>

        {/* Right: Notifications & Profile */}
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative size-8 text-text-primary hover:bg-surface-raised rounded-full">
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 flex size-1.5 rounded-full bg-primary ring-2 ring-background" />
          </Button>

          <div className="flex items-center gap-2">
            <Avatar size="sm" src="https://i.pravatar.cc/150?u=cynthia" fallback="CW" className="cursor-pointer border-none size-8" />
            <div className="hidden flex-col md:flex">
              <span className="text-xs font-bold text-text-primary leading-none">Cynthia Wolf</span>
              <span className="text-[9px] text-text-secondary mt-0.5">@c_wolf89</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
