import { motion } from "framer-motion";

const sections = [
  { heading: "What we collect", body: "We collect the information you give us directly — your name, email address, telephone number, and the details you share about an event you're considering — together with limited technical information (IP address, device type, pages visited) needed to operate the website securely." },
  { heading: "How we use it", body: "Your information is used to respond to your inquiry, schedule consultations, send the seasonal Atelier Letter (only if you've subscribed), and improve the way our website performs. We do not sell, rent, or trade personal information to third parties." },
  { heading: "Newsletter & cookies", body: "You can subscribe to or unsubscribe from our seasonal letter at any time using the link in any email. Our website uses essential cookies to remember preferences (such as whether you've already seen our newsletter invitation). We do not place advertising cookies." },
  { heading: "Data retention", body: "Inquiry submissions are kept for as long as we are in active conversation about an event, plus seven years for record-keeping in line with international tax and contract law. Newsletter subscriptions are kept until you unsubscribe." },
  { heading: "Your rights", body: "You may request a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it. Write to privacy@aureliaco.com and our data protection officer will respond within 30 days." },
  { heading: "Contact", body: "If you have any questions about this policy or how your information is handled, please write to privacy@aureliaco.com or by post to: Aurelia & Co., 150 Fifth Avenue, Suite 1200, New York, NY 10011." },
];

export default function Privacy() {
  return (
    <div className="w-full bg-[#F3F3F3] pt-36 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="cc-eyebrow mb-4">Our Promise</p>
          <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light text-[#333333] mb-3">Privacy Policy</h1>
          <p className="text-[#333333]/45 text-sm font-light">Last updated: April 2026</p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((s, i) => (
            <motion.section key={s.heading} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-3">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-serif text-xl md:text-2xl font-light text-[#333333] mb-4">{s.heading}</h2>
              <p className="text-[#333333]/65 leading-relaxed font-light">{s.body}</p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
