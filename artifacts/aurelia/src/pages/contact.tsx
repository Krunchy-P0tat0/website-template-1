import { motion } from "framer-motion";
import { Link } from "wouter";

const offices = [
  {
    city: "New York",
    role: "Flagship Atelier",
    address: ["150 Fifth Avenue, Suite 1200", "New York, NY 10011"],
    phone: "+1 212 555 0140",
    email: "newyork@aureliaco.com",
  },
  {
    city: "Los Angeles",
    role: "West Coast Studio",
    address: ["9000 Sunset Boulevard", "West Hollywood, CA 90069"],
    phone: "+1 310 555 0188",
    email: "losangeles@aureliaco.com",
  },
  {
    city: "Miami",
    role: "Tropical Bureau",
    address: ["100 Biscayne Boulevard", "Miami, FL 33132"],
    phone: "+1 305 555 0162",
    email: "miami@aureliaco.com",
  },
  {
    city: "Florence",
    role: "European House",
    address: ["Via de' Tornabuoni, 15", "50123 Firenze FI, Italy"],
    phone: "+39 055 555 0117",
    email: "florence@aureliaco.com",
  },
];

const departments = [
  {
    id: "client",
    eyebrow: "For Future Clients",
    title: "Begin a New Inquiry",
    body: "Tell us about the celebration you have in mind — wedding, corporate, or private event — and a member of our atelier will respond within two business days to schedule a consultation.",
    cta: { label: "Open Inquiry Form →", href: "/inquiry" },
    email: "concierge@aureliaco.com",
  },
  {
    id: "vendor",
    eyebrow: "For Creative Partners",
    title: "Vendor Submissions",
    body: "Florists, photographers, venues, stationers, and artisans — share your portfolio with our producers. We review submissions monthly and add new partners to our trusted network year-round.",
    cta: {
      label: "vendors@aureliaco.com",
      href: "mailto:vendors@aureliaco.com?subject=Vendor%20Submission%20—%20Aurelia%20%26%20Co.",
    },
    email: "vendors@aureliaco.com",
  },
  {
    id: "press",
    eyebrow: "For Editors & Media",
    title: "Press & Editorial",
    body: "Image licensing, interview requests, speaking engagements, and editorial features are handled by our communications team. Please include your publication, deadline, and a brief outline.",
    cta: {
      label: "press@aureliaco.com",
      href: "mailto:press@aureliaco.com?subject=Press%20Request%20—%20Aurelia%20%26%20Co.",
    },
    email: "press@aureliaco.com",
  },
  {
    id: "careers",
    eyebrow: "For Future Team Members",
    title: "Careers & Internships",
    body: "We hire designers, planners, producers, and operations talent year-round across our four offices. Our internship programme runs each spring and autumn for university students.",
    cta: {
      label: "careers@aureliaco.com",
      href: "mailto:careers@aureliaco.com?subject=Careers%20—%20Aurelia%20%26%20Co.",
    },
    email: "careers@aureliaco.com",
  },
  {
    id: "accessibility",
    eyebrow: "Accessibility",
    title: "We are listening",
    body: "We're committed to a website experience that works for everyone. If you encounter a barrier or have a recommendation for improvement, please reach out — we'll address it personally.",
    cta: {
      label: "accessibility@aureliaco.com",
      href: "mailto:accessibility@aureliaco.com?subject=Accessibility%20Feedback",
    },
    email: "accessibility@aureliaco.com",
  },
  {
    id: "privacy",
    eyebrow: "Privacy & Cookies",
    title: "Data & Privacy Requests",
    body: "Requests to access, export, or delete personal data, as well as questions about our cookie practices, are answered by our data protection officer within 30 days of receipt.",
    cta: {
      label: "Read our Privacy Policy →",
      href: "/privacy",
    },
    email: "privacy@aureliaco.com",
  },
];

export default function Contact() {
  return (
    <div className="w-full bg-background pt-28 md:pt-32 pb-24">
      <div className="container mx-auto px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24 max-w-3xl mx-auto"
        >
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
            Get in Touch
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-6 tracking-tight">
            Contact the House
          </h1>
          <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
            Each request is read by a real person. Choose the team that's right
            for you below — or write to{" "}
            <a
              href="mailto:concierge@aureliaco.com"
              className="text-primary hover:underline underline-offset-4"
            >
              concierge@aureliaco.com
            </a>{" "}
            and we'll route your message internally.
          </p>
        </motion.div>

        {/* Departments grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24">
          {departments.map((d, i) => (
            <motion.div
              key={d.id}
              id={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="border border-border/70 p-7 md:p-8 bg-card flex flex-col"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
                {d.eyebrow}
              </div>
              <h3 className="font-serif text-2xl mb-3 tracking-tight">
                {d.title}
              </h3>
              <p className="text-sm text-foreground/65 leading-relaxed mb-6 flex-1">
                {d.body}
              </p>
              {d.cta.href.startsWith("/") ? (
                <Link
                  href={d.cta.href}
                  className="text-[11px] uppercase tracking-[0.25em] text-foreground hover:text-primary transition-colors border-b border-foreground/20 hover:border-primary self-start pb-1"
                >
                  {d.cta.label}
                </Link>
              ) : (
                <a
                  href={d.cta.href}
                  className="text-[11px] uppercase tracking-[0.25em] text-foreground hover:text-primary transition-colors border-b border-foreground/20 hover:border-primary self-start pb-1 break-all"
                >
                  {d.cta.label}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Offices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="border-t border-border pt-16"
        >
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
              Our Offices
            </div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
              Visit Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-border/60 p-7"
              >
                <div className="font-serif text-xl mb-1">{office.city}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
                  {office.role}
                </div>
                <address className="not-italic text-sm text-foreground/65 leading-relaxed mb-3">
                  {office.address.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </address>
                <a
                  href={`tel:${office.phone.replace(/\s/g, "")}`}
                  className="block text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  {office.phone}
                </a>
                <a
                  href={`mailto:${office.email}`}
                  className="block text-sm text-foreground/80 hover:text-primary transition-colors mt-1 break-all"
                >
                  {office.email}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
