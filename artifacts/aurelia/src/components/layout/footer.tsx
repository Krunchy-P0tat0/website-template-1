import { Link } from "wouter";
import { motion } from "framer-motion";

const servicesLinks = [
  { label: "Vendor Applications", href: "/vendor" },
  { label: "Internships", href: "/internships" },
  { label: "Careers", href: "/careers" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
        <rect x="3" y="3" width="18" height="18" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M11 7.5c2 0 3.7 1.4 3.7 3.6 0 2.3-1.4 4.2-3.4 4.2-.7 0-1.3-.4-1.5-.9l-.6 2.4c-.2.8-.8 1.7-1.2 2.3" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4M11 17v-7" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-32">
      <div className="container mx-auto px-6 md:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10"
        >
          {/* Column 1 — Brand */}
          <div>
            <h3 className="font-serif text-2xl tracking-wider mb-5">
              AURELIA <span className="text-primary">&</span> CO.
            </h3>
            <p className="text-background/65 text-sm leading-relaxed max-w-xs">
              Luxury destination events across the globe.
            </p>
          </div>

          {/* Column 2 — Services / About */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-primary mb-6">
              The House
            </h4>
            <ul className="space-y-3">
              {servicesLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-background/75 hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Legal + Socials */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-primary mb-6">
              Legal & Social
            </h4>
            <ul className="space-y-3 mb-6">
              {policyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-background/75 hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-10 h-10 border border-background/20 flex items-center justify-center text-background/70 hover:text-primary hover:border-primary transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-primary mb-6">
              Get in Touch
            </h4>
            <a
              href="mailto:hello@aureliaco.com"
              className="block text-sm text-background/85 hover:text-primary transition-colors mb-2"
            >
              hello@aureliaco.com
            </a>
            <a
              href="tel:+12125550123"
              className="block text-sm text-background/85 hover:text-primary transition-colors mb-6"
            >
              +1 (212) 555-0123
            </a>

            <Link
              href="/inquiry"
              className="inline-block bg-primary text-foreground px-6 py-3 text-[11px] uppercase tracking-[0.25em] hover:bg-background hover:text-foreground transition-colors"
            >
              Inquire Now
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-6 md:px-12 py-6 text-[11px] uppercase tracking-[0.2em] text-background/50 text-center md:text-left">
          © {new Date().getFullYear()} Aurelia & Co. — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
