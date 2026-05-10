import { motion } from "framer-motion";

const sections = [
  { heading: "Acceptance of terms", body: "By accessing the Aurelia & Co. website (aureliaco.com) you agree to these Terms of Service. If you do not agree, please discontinue use of the site." },
  { heading: "Use of the site", body: "The content on this site — including text, photography, design, and the Aurelia & Co. brand — is provided for personal, non-commercial reference. You may not copy, reproduce, republish, or redistribute any portion of it without our written consent." },
  { heading: "Inquiries are not contracts", body: "Submitting an inquiry begins a conversation. It does not create a binding agreement. A formal services agreement, signed by both parties, is required before any work commences and will set out scope, fees, payment terms, and cancellation rights." },
  { heading: "Photography & likeness", body: "Photographs and films of the events we produce belong to the contracted photographers and to Aurelia & Co. We display imagery on our portfolio and journal with explicit client and photographer permission." },
  { heading: "Third-party links", body: "Our site may link to other websites — venues, partners, publications, social media. We are not responsible for the content or practices of any site we link to." },
  { heading: "Limitation of liability", body: "The site and its contents are provided 'as is.' To the fullest extent permitted by law, Aurelia & Co. is not liable for indirect, incidental, or consequential damages arising from use of the site." },
  { heading: "Governing law", body: "These Terms are governed by the laws of the State of New York, USA, without regard to its conflict-of-laws provisions. Any disputes will be resolved in the courts of New York County." },
  { heading: "Changes to these terms", body: "We may update these Terms occasionally. The date at the top reflects the most recent revision. Continued use of the site after a change constitutes acceptance of the revised Terms." },
];

export default function Terms() {
  return (
    <div className="w-full bg-[#F3F3F3] pt-36 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="cc-eyebrow mb-4">The Fine Print</p>
          <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light text-[#333333] mb-3">Terms of Service</h1>
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
