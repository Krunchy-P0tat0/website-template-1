import { Link } from "wouter";
import { useSiteSettings } from "@/lib/SiteSettingsContext";

const col1 = [
  { label: "Weddings", href: "/weddings" },
  { label: "Corporate Events", href: "/corporate" },
  { label: "Private Events", href: "/private-events" },
  { label: "Destinations", href: "/destinations" },
];

const col2 = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Journal", href: "/journal" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/contact" },
];

const col3 = [
  { label: "Vendor Applications", href: "/vendor" },
  { label: "Careers", href: "/careers" },
  { label: "Internships", href: "/internships" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

function IGIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="17" height="17">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="17" height="17">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M11 7.5c2 0 3.7 1.4 3.7 3.6 0 2.3-1.4 4.2-3.4 4.2-.7 0-1.3-.4-1.5-.9l-.6 2.4c-.2.8-.8 1.7-1.2 2.3" />
    </svg>
  );
}
function LIIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="17" height="17">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4M11 17v-7" />
    </svg>
  );
}

export function Footer() {
  const { settings } = useSiteSettings();
  const { siteName, primaryEmail, primaryPhone, instagramUrl, linkedinUrl, pinterestUrl } = settings;

  const socials = [
    { label: "Instagram", href: instagramUrl, icon: <IGIcon /> },
    { label: "Pinterest", href: pinterestUrl, icon: <PinIcon /> },
    { label: "LinkedIn", href: linkedinUrl, icon: <LIIcon /> },
  ].filter((s) => s.href);

  return (
    <footer className="bg-[#1a1a1a] text-white/75 mt-24">
      {/* Upper footer */}
      <div className="container mx-auto px-6 md:px-12 pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand col */}
          <div className="lg:col-span-1">
            <p className="font-serif text-white text-2xl tracking-[0.12em] mb-5">
              {siteName.toUpperCase()}
            </p>
            <p className="text-white/50 text-sm leading-relaxed font-light max-w-[220px] mb-8">
              Design, Planning and Production Services — Los Angeles · New York · Miami · Florence
            </p>
            {/* CTA */}
            <Link
              href="/inquiry"
              className="inline-block border border-white/30 text-white text-[10px] uppercase tracking-[0.22em] px-7 py-3 hover:bg-white hover:text-[#1a1a1a] transition-colors duration-300"
            >
              Submit an Inquiry
            </Link>
          </div>

          {/* Services col */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-6">Services</h4>
            <ul className="space-y-3">
              {col1.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm font-light text-white/65 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company col */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-6">The House</h4>
            <ul className="space-y-3">
              {col2.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm font-light text-white/65 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-6">Contact</h4>
            {primaryEmail && (
              <a href={`mailto:${primaryEmail}`} className="block text-sm font-light text-white/65 hover:text-white transition-colors mb-2">
                {primaryEmail}
              </a>
            )}
            {primaryPhone && (
              <a href={`tel:${primaryPhone}`} className="block text-sm font-light text-white/65 hover:text-white transition-colors mb-8">
                {primaryPhone}
              </a>
            )}
            <ul className="space-y-3">
              {col3.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs font-light text-white/40 hover:text-white/75 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Lower bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            © {new Date().getFullYear()} {siteName} — All Rights Reserved
          </p>
          {socials.length > 0 && (
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
