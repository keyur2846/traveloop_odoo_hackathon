import Link from "next/link";
import { BarChart3, MapPin, Compass, TrendingUp, Users } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: BarChart3, exact: true },
  { href: "/admin/cities", label: "Cities", icon: MapPin },
  { href: "/admin/activities", label: "Activities", icon: Compass },
  { href: "/admin/trends", label: "Trends", icon: TrendingUp },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-border bg-surface p-4 flex flex-col gap-2">
        <div className="mb-4 px-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">Admin Panel</h2>
        </div>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-background hover:text-text-primary transition-colors"
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
