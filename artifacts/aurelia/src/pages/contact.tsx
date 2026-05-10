import { motion } from "framer-motion";
import { Link } from "wouter";

const offices = [
  { city: "New York", role: "Flagship Atelier", address: ["150 Fifth Avenue, Suite 1200", "New York, NY 10011"], phone: "+1 212 555 0140", email: "newyork@aureliaco.com" },
  { city: "Los Angeles", role: "West Coast Studio", address: ["9000 Sunset Boulevard", "West Hollywood, CA 90069"], phone: "+1 310 555 0188", email: "losangeles@aureliaco.com" },
  { city: "Miami", role: "Tropical Bureau", address: ["100 Biscayne Boulevard", "Miami, FL 33132"], phone: "+1 305 555 0162", email: "miami@aureliaco.com" },
  { city: "Florence", role: "European House", address: ["Via de' Tornabuoni, 15", "50123 Firenze FI, Italy"], phone: "+39 055 555 0117", email: "florence@aureliaco.com" },
];

const departments = [
  { id: "client", eyebrow: "For Future Clients", title: "Begin a New Inquiry", body: "Tell us about the celebration you have in mind — wedding, corporate, or private event — and a member of our atelier will respond within two business days to schedule a consultation.", cta: { label: "Open Inquiry Form →", href: "/inquiry" } },
  { id: "vendor", eyebrow: "For Creative Partners", title: "Vendor Submissions", body: "Florists, photographers, venues, stationers, and artisans — share your portfolio with our producers. We review submissions monthly and add new partners year-round.", cta: { label: "vendors@aureliaco.com", href: "mailto:vendors@aureliaco.com?subject=Vendor%20Submission%20—%20Aurelia%20%26%20Co." } },
  { id: "press", eyebrow: "For Editors & Media", title: "Press & Editorial", body: "Image licensing, interview requests, speaking engagements, and editorial features are handled by our communications team. Please include your publication, deadline, and a brief outline.", cta: { label: "press@aureliaco.com", href: "mailto:press@aureliaco.com?subject=Press%20Request%20—%20Aurelia%20%26%20Co." } },
  { id: "careers", eyebrow: "For Future Team Members", title: "Careers & Internships", body: "We hire designers, planners, producers, and operations talent year-round across our four offices. Our internship programme runs each spring and autumn.", cta: { label: "careers@aureliaco.com", href: "mailto:careers@aureliaco.com?subject=Careers%20—%20Aurelia%20%26%20Co." } },
  { id: "accessibility", eyebrow: "Accessibility", title: "We are listening", body: "We're committed to a website experience that works for everyone. If you encounter a barrier or have a recommendation for improvement, please reach out — we'll address it personally.", cta: { label: "accessibility@aureliaco.com", href: "mailto:accessibility@aureliaco.com?subject=Accessibility%20Feedback" } },
  { id: "privacy", eyebrow: "Privacy & Cookies", title: "Data & Privacy Requests", body: "Requests to access, export, or delete personal data, as well as questions about our cookie practices, are answered by our data protection officer within 30 days of receipt.", cta: { label: "Read our Privacy Policy →", href: "/privacy" } },
];

export default function Contact() {
  return (
    <div className="w-full bg-[#F3F3F3] pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20 max-w-2xl mx-auto">
          <p className="cc-eyebrow mb-5">Get in Touch</p>
          <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light text-[#333333] mb-5">Contact the House</h1>
          <p className="text-[#333333]/60 text-base leading-relaxed font-light">
            Each request is read by a real person. Choose the team that's right for you below — or write to{" "}
            <a href="mailto:concierge@aureliaco.com" className="text-[#003D68] hover:underline underline-offset-4">concierge@aureliaco.com</a>{" "}and we'll route your message internally.
          </p>
        </motion.div>

        {/* Departments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {departments.map((d, i) => (
            <motion.div key={d.id} id={d.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border border-black/10 p-8 bg-white flex flex-col">
              <p className="cc-eyebrow mb-3">{d.eyebrow}</p>
              <h3 className="font-serif text-xl mb-3 text-[#333333] font-light">{d.title}</h3>
              <p className="text-sm text-[#333333]/60 leading-relaxed mb-6 flex-1 font-light">{d.body}</p>
              {d.cta.href.startsWith("/") ? (
                <Link href={d.cta.href} className="text-[10px] uppercase tracking-[0.2em] text-[#333333] hover:text-[#003D68] transition-colors border-b border-[#333333]/20 hover:border-[#003D68] self-start pb-1">
                  {d.cta.label}
                </Link>
              ) : (
                <a href={d.cta.href} className="text-[10px] uppercase tracking-[0.2em] text-[#333333] hover:text-[#003D68] transition-colors border-b border-[#333333]/20 hover:border-[#003D68] self-start pb-1 break-all">
                  {d.cta.label}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Offices */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="border-t border-black/10 pt-16">
          <div className="text-center mb-12">
            <p className="cc-eyebrow mb-4">Our Offices</p>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-[#333333]">Visit Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((o, i) => (
              <motion.div key={o.city} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="border border-black/10 p-7 bg-white">
                <p className="font-serif text-xl mb-1 text-[#333333]">{o.city}</p>
                <p className="cc-eyebrow mb-4">{o.role}</p>
                <address className="not-italic text-sm text-[#333333]/60 leading-relaxed mb-3 font-light">
                  {o.address.map((l) => <div key={l}>{l}</div>)}
                </address>
                <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="block text-sm text-[#333333]/70 hover:text-[#003D68] transition-colors font-light">{o.phone}</a>
                <a href={`mailto:${o.email}`} className="block text-sm text-[#333333]/70 hover:text-[#003D68] transition-colors mt-1 font-light break-all">{o.email}</a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
