import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSiteSettings } from "@/lib/SiteSettingsContext";

const navLinks = [
  { name: "Weddings", href: "/weddings" },
  {
    name: "Corporate",
    href: "/corporate",
    dropdown: [
      { name: "Galas", href: "/corporate#galas" },
      { name: "Product Launches", href: "/corporate#launches" },
      { name: "Brand Activations", href: "/corporate#activations" },
      { name: "Conferences", href: "/corporate#conferences" },
    ],
  },
  { name: "Private Events", href: "/private-events" },
  {
    name: "Destinations",
    href: "/destinations",
    dropdown: [
      { name: "Italy", href: "/destinations#italy" },
      { name: "France", href: "/destinations#france" },
      { name: "Caribbean", href: "/destinations#caribbean" },
      { name: "Asia", href: "/destinations#asia" },
      { name: "USA", href: "/destinations#usa" },
    ],
  },
  { name: "Europe", href: "/europe" },
  { name: "Inquire", href: "/inquiry" },
  {
    name: "More",
    href: "#",
    dropdown: [
      { name: "About", href: "/about" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Journal", href: "/journal" },
      { name: "Press", href: "/press" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

function LogoMark({ siteName, logoUrl, scrolled }: { siteName: string; logoUrl: string; scrolled: boolean }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={siteName}
        className={`object-contain transition-all duration-500 ${scrolled ? "h-7 md:h-8" : "h-8 md:h-10 lg:h-12"}`}
      />
    );
  }
  return (
    <span
      className={`font-serif tracking-widest text-foreground transition-all duration-500 block ${
        scrolled
          ? "text-lg md:text-xl lg:text-2xl"
          : "text-xl md:text-2xl lg:text-4xl"
      }`}
    >
      {siteName.toUpperCase()}
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { settings } = useSiteSettings();
  const { siteName, logoUrl } = settings;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md py-3 shadow-sm"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex items-center justify-between lg:flex-col lg:items-center lg:gap-6">
            <Link href="/" className="block lg:mb-0" aria-label={`${siteName} Home`}>
              <LogoMark siteName={siteName} logoUrl={logoUrl} scrolled={scrolled} />
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href !== "#" ? link.href : ""}
                    className="text-xs uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors flex items-center gap-1 py-2"
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown className="w-3 h-3" />}
                  </Link>

                  {link.dropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-background border border-border shadow-lg p-6 min-w-[200px] flex flex-col gap-4">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-serif text-foreground/70 hover:text-primary transition-colors whitespace-nowrap"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <button
              className="lg:hidden text-foreground p-2 -mr-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            <div className="p-5 flex justify-between items-center border-b border-border">
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} className="h-8 object-contain" />
              ) : (
                <span className="font-serif text-xl tracking-widest">
                  {siteName.toUpperCase()}
                </span>
              )}
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 -mr-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href !== "#" ? link.href : ""}
                    className="font-serif text-2xl hover:text-primary transition-colors block"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="mt-3 pl-4 flex flex-col gap-2 border-l border-border">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-xs uppercase tracking-wider text-foreground/60 hover:text-primary block py-1"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
