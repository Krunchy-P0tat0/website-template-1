import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Mail,
  FileText,
  Users,
  Instagram,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAtelierAuth } from "@/lib/atelierAuth";

const NAV = [
  { label: "Dashboard", href: "/atelier/dashboard", icon: LayoutDashboard },
  { label: "Inquiries", href: "/atelier/inquiries", icon: FileText },
  { label: "Newsletter", href: "/atelier/newsletter", icon: Mail },
  { label: "Vendor Applications", href: "/atelier/vendors", icon: Users },
  { label: "Instagram Feed", href: "/atelier/instagram", icon: Instagram },
  { label: "Telegram Bot", href: "/atelier/telegram", icon: MessageSquare },
  { label: "Site Settings", href: "/atelier/settings", icon: Settings },
];

export function AtelierLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAtelierAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeLabel = NAV.find((n) => n.href === location)?.label ?? "Atelier";

  return (
    <div className="min-h-screen bg-[#f7f6f3] flex">
      {/* ── Sidebar ───────────────────────────────────────────── */}
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#0f0e0c] flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Brand */}
        <div className="px-8 py-8 border-b border-white/10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Internal</p>
          <p className="font-serif text-xl tracking-widest text-white">Aurelia & Co.</p>
          <p className="text-[10px] tracking-widest text-white/30 mt-1 uppercase">Atelier Portal</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = location === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs tracking-widest uppercase transition-colors duration-150
                  ${active
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-150"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-[#e8e5df] flex items-center px-6 gap-4 shrink-0">
          <button
            className="lg:hidden text-foreground/60 hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-serif text-lg text-foreground/80 tracking-wide flex-1">
            {activeLabel}
          </h1>
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-foreground/30">
            Internal use only
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
