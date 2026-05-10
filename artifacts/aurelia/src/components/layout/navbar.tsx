import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSiteSettings } from "@/lib/SiteSettingsContext";

const navLinks = [
  { name: "Weddings", href: "/weddings" },
  { name: "Corporate Events", href: "/corporate" },
  { name: "Private Events", href: "/private-events" },
  { name: "Destinations", href: "/destinations" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Inquire", href: "/inquiry" },
];

const moreLinks = [
  { name: "About", href: "/about" },
  { name: "Journal", href: "/journal" },
  { name: "Press", href: "/press" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { settings } = useSiteSettings();
  const { siteName, logoUrl } = settings;

  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navBg = isHome
    ? scrolled
      ? "bg-white/96 backdrop-blur-sm shadow-[0_1px_0_0_rgba(0,0,0,0.08)]"
      : "bg-transparent"
    : "bg-[#F3F3F3] border-b border-black/8";

  const textColor = isHome && !scrolled ? "text-white" : "text-[#333333]";
  const logoColor = isHome && !scrolled ? "text-white" : "text-[#333333]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}
      >
        {/* Top bar — logo centered */}
        <div className="w-full flex items-center justify-center px-6 md:px-12 py-5 md:py-6">
          <Link href="/" aria-label={`${siteName} home`} className="block">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={siteName}
                className={`h-7 md:h-8 object-contain transition-all duration-400 ${isHome && !scrolled ? "brightness-0 invert" : ""}`}
              />
            ) : (
              <span
                className={`font-serif text-2xl md:text-3xl tracking-[0.18em] transition-colors duration-400 ${logoColor}`}
              >
                {siteName.toUpperCase()}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle — absolute right */}
          <button
            className={`absolute right-5 lg:hidden p-2 ${textColor}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom nav — pipe-separated links (CC style) */}
        <div className="hidden lg:flex items-center justify-center gap-0 pb-4">
          {navLinks.map((link, i) => (
            <span key={link.name} className="flex items-center">
              <Link
                href={link.href}
                className={`text-[11px] font-light tracking-[0.18em] uppercase transition-colors duration-200 hover:opacity-60 px-4 py-1 ${textColor}`}
              >
                {link.name}
              </Link>
              {i < navLinks.length - 1 && (
                <span className={`text-[11px] opacity-30 ${textColor}`}>|</span>
              )}
            </span>
          ))}
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-[#F3F3F3] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
              <span className="font-serif text-xl tracking-[0.18em] text-[#333333]">
                {siteName.toUpperCase()}
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close" className="p-2 -mr-2">
                <X className="w-5 h-5 text-[#333333]" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-8 py-10 flex flex-col gap-7">
              {[...navLinks, ...moreLinks].map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className="font-serif text-3xl text-[#333333] hover:opacity-50 transition-opacity tracking-wide"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
