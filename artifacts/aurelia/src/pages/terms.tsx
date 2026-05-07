import { motion } from "framer-motion";

const sections = [
  {
    heading: "Acceptance of terms",
    body: "By accessing the Aurelia & Co. website (aureliaco.com) you agree to these Terms of Service. If you do not agree, please discontinue use of the site.",
  },
  {
    heading: "Use of the site",
    body: "The content on this site — including text, photography, design, and the Aurelia & Co. brand — is provided for personal, non-commercial reference. You may not copy, reproduce, republish, or redistribute any portion of it without our written consent.",
  },
  {
    heading: "Inquiries are not contracts",
    body: "Submitting an inquiry begins a conversation. It does not create a binding agreement. A formal services agreement, signed by both parties, is required before any work commences and will set out scope, fees, payment terms, and cancellation rights.",
  },
  {
    heading: "Photography & likeness",
    body: "Photographs and films of the events we produce belong to the contracted photographers and to Aurelia & Co. We display imagery on our portfolio and journal with explicit client and photographer permission.",
  },
  {
    heading: "Third-party links",
    body: "Our site may link to other websites — venues, partners, publications, social media. We are not responsible for the content or practices of any site we link to.",
  },
  {
    heading: "Limitation of liability",
    body: "The site and its contents are provided 'as is.' To the fullest extent permitted by law, Aurelia & Co. is not liable for indirect, incidental, or consequential damages arising from use of the site.",
  },
  {
    heading: "Governing law",
    body: "These Terms are governed by the laws of the State of New York, USA, without regard to its conflict-of-laws provisions. Any disputes will be resolved in the courts of New York County.",
  },
  {
    heading: "Changes to these terms",
    body: "We may update these Terms occasionally. The date at the top reflects the most recent revision. Continued use of the site after a change constitutes acceptance of the revised Terms.",
  },
];

export default function Terms() {
  return (
    <div className="w-full bg-background pt-28 md:pt-32 pb-24">
      <div className="container mx-auto px-5 md:px-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
            The Fine Print
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-foreground/55 text-sm">
            Last updated: April 2026
          </p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((s, i) => (
            <motion.section
              key={s.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h2 className="font-serif text-2xl md:text-3xl mb-4 tracking-tight">
                {s.heading}
              </h2>
              <p className="text-foreground/70 leading-relaxed text-base">
                {s.body}
              </p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
