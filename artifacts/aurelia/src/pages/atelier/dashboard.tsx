import { useEffect, useState } from "react";
import { Link } from "wouter";
import { FileText, Mail, Users, ArrowRight } from "lucide-react";
import { atelierFetch } from "@/lib/atelierAuth";

interface Counts {
  inquiries: number | null;
  subscribers: number | null;
  vendors: number | null;
}

export default function AtelierDashboard() {
  const [counts, setCounts] = useState<Counts>({
    inquiries: null,
    subscribers: null,
    vendors: null,
  });

  useEffect(() => {
    Promise.allSettled([
      atelierFetch<{ total: number }>("/inquiries"),
      atelierFetch<{ total: number }>("/newsletter"),
      atelierFetch<{ total: number }>("/vendors"),
    ]).then(([inq, news, ven]) => {
      setCounts({
        inquiries: inq.status === "fulfilled" ? inq.value.total : null,
        subscribers: news.status === "fulfilled" ? news.value.total : null,
        vendors: ven.status === "fulfilled" ? ven.value.total : null,
      });
    });
  }, []);

  const cards = [
    {
      label: "Inquiries",
      count: counts.inquiries,
      icon: FileText,
      href: "/atelier/inquiries",
      description: "Client event inquiries",
    },
    {
      label: "Newsletter",
      count: counts.subscribers,
      icon: Mail,
      href: "/atelier/newsletter",
      description: "Email subscribers",
    },
    {
      label: "Vendor Applications",
      count: counts.vendors,
      icon: Users,
      href: "/atelier/vendors",
      description: "Pending & reviewed",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-2">Overview</p>
        <h2 className="font-serif text-3xl text-foreground/80">Good morning.</h2>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {cards.map(({ label, count, icon: Icon, href, description }) => (
          <Link key={label} href={href}>
            <div className="bg-white border border-[#e8e5df] p-6 hover:border-foreground/20 transition-colors duration-200 cursor-pointer group">
              <div className="flex items-start justify-between mb-6">
                <Icon className="w-4 h-4 text-foreground/30" />
                <ArrowRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-foreground/50 transition-colors" />
              </div>
              <div className="font-serif text-4xl text-foreground/80 mb-1">
                {count === null ? (
                  <span className="text-foreground/20 text-2xl">—</span>
                ) : (
                  count.toLocaleString()
                )}
              </div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40 mt-2">{label}</p>
              <p className="text-xs text-foreground/30 mt-1">{description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white border border-[#e8e5df] p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-5">Quick Access</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "Instagram Settings", href: "/atelier/instagram" },
            { label: "Telegram Bot", href: "/atelier/telegram" },
            { label: "Site Settings", href: "/atelier/settings" },
          ].map(({ label, href }) => (
            <Link key={href} href={href}>
              <div className="border border-[#e8e5df] px-4 py-3 text-xs uppercase tracking-widest text-foreground/50 hover:text-foreground/80 hover:border-foreground/20 transition-colors duration-150 cursor-pointer">
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
