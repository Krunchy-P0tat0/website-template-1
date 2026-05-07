import { motion } from "framer-motion";
import { Link } from "wouter";

const tracks = [
  {
    name: "Design Studio",
    body: "Shadow our creative directors as they develop mood boards, source materials, and translate a couple's story into a visual language. Best for students of fine arts, interior design, or fashion.",
    cities: "Florence · New York",
  },
  {
    name: "Planning & Logistics",
    body: "Build event timelines, coordinate with vendors, manage RSVPs, and travel with the team to site visits. A natural fit for hospitality, business, or international relations students.",
    cities: "New York · Miami",
  },
  {
    name: "Production & Operations",
    body: "Work alongside our on-site producers during load-in, rehearsals, and the event itself. Long days, magical nights. Suited to performing arts, theatre production, or event management students.",
    cities: "Los Angeles · Florence",
  },
  {
    name: "Communications & Editorial",
    body: "Contribute to The Journal, draft press releases, write client briefs, and assist with photography licensing. Built for journalism, marketing, or English literature students.",
    cities: "Los Angeles · New York",
  },
];

const programDetails = [
  { label: "Cohorts", value: "Spring (Feb – May) & Autumn (Sept – Dec)" },
  { label: "Duration", value: "12 weeks, full-time" },
  { label: "Locations", value: "New York · Los Angeles · Miami · Florence" },
  { label: "Compensation", value: "Paid hourly stipend + travel allowance" },
  {
    label: "Class size",
    value: "10 interns per cohort across all four offices",
  },
  { label: "Application opens", value: "Spring: October · Autumn: April" },
];

const week = [
  {
    day: "Monday",
    detail:
      "Studio morning — pinning new references, debriefing the previous weekend's events, and reviewing the week's deliverables with your department lead.",
  },
  {
    day: "Tuesday",
    detail:
      "Vendor walkthroughs and venue site visits, often by car or a short flight. Lunch is usually with a florist, chef, or stylist.",
  },
  {
    day: "Wednesday",
    detail:
      "Quiet day in the studio for design work, document drafting, mood-board production, and timeline revisions.",
  },
  {
    day: "Thursday",
    detail:
      "Client meetings (you'll observe, not lead) followed by an internal critique with the founders or a guest creative director.",
  },
  {
    day: "Friday",
    detail:
      "Production prep — packing tasting kits, finalising vendor briefs, and preparing for the weekend's event load-in.",
  },
];

const eligibility = [
  "Currently enrolled in or recently graduated from an accredited university programme.",
  "Available full-time for the 12-week duration of one cohort.",
  "Comfortable working English; additional Italian, French, or Spanish welcomed for the Florence cohort.",
  "Authorised to work in the country of your selected cohort office (we do not sponsor visas for internships).",
];

const faqs = [
  {
    q: "Is the internship paid?",
    a: "Yes — we pay an hourly stipend at or above local market rate, plus a separate travel allowance for any production-related travel.",
  },
  {
    q: "Can I apply for more than one office?",
    a: "Yes. You may rank up to two preferred offices on your application. Final placement is decided by department fit.",
  },
  {
    q: "What's the application timeline?",
    a: "Spring applications open every October and close in mid-November. Autumn applications open every April and close in mid-May. Decisions are sent within four weeks of the deadline.",
  },
  {
    q: "Do internships lead to full-time roles?",
    a: "About one in three interns is offered a full-time position with us at the end of their cohort. Several department leads began as interns themselves.",
  },
];

export default function Internships() {
  return (
    <div className="w-full bg-background pt-28 md:pt-32 pb-24">
      <div className="container mx-auto px-5 md:px-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
            For Emerging Talent
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-6 tracking-tight">
            The Atelier Internship
          </h1>
          <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
            Twice a year we welcome ten students into our studios for an
            immersive 12-week programme. Interns work on real productions
            from the first week, learn alongside senior designers, and travel
            to events across our four offices.
          </p>
        </motion.div>

        {/* Programme details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="border-y border-border py-12 mb-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 max-w-5xl mx-auto">
            {programDetails.map((d) => (
              <div key={d.label}>
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
                  {d.label}
                </div>
                <div className="font-serif text-base md:text-lg leading-snug">
                  {d.value}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Tracks */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
              Four Tracks
            </div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
              Choose your department
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="border border-border/60 p-7 md:p-8 bg-card flex flex-col"
              >
                <h3 className="font-serif text-2xl mb-2 tracking-tight">
                  {t.name}
                </h3>
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-4">
                  {t.cities}
                </div>
                <p className="text-foreground/65 leading-relaxed">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* A typical week */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="border-t border-border pt-16 mb-24"
        >
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
              A Day in the Atelier
            </div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
              A typical week
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {week.map((w) => (
              <div
                key={w.day}
                className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-6 border-b border-border/60 pb-8 last:border-0"
              >
                <div className="font-serif text-xl text-primary">{w.day}</div>
                <p className="text-foreground/70 leading-relaxed">
                  {w.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Eligibility */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="border-t border-border pt-16 mb-24 max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
              Eligibility
            </div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
              Who we're looking for
            </h2>
          </div>
          <ul className="space-y-4">
            {eligibility.map((e, i) => (
              <li
                key={i}
                className="flex gap-4 text-foreground/70 leading-relaxed"
              >
                <span className="text-primary font-serif">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="border-t border-border pt-16 mb-24 max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
              FAQ
            </div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
              Common questions
            </h2>
          </div>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="border-b border-border/60 pb-6 last:border-0"
              >
                <h3 className="font-serif text-xl mb-3 tracking-tight">
                  {f.q}
                </h3>
                <p className="text-foreground/65 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-border pt-16 text-center max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-5 tracking-tight">
            Apply for the next cohort
          </h2>
          <p className="text-foreground/65 leading-relaxed mb-8">
            Send a one-page CV and a short letter telling us which track and
            office you'd like to join, and why.
          </p>
          <a
            href="mailto:internships@aureliaco.com?subject=Internship%20Application%20—%20Aurelia%20%26%20Co."
            className="inline-block bg-foreground text-background px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-primary transition-colors"
          >
            internships@aureliaco.com
          </a>
          <div className="mt-10">
            <Link
              href="/"
              className="text-[11px] uppercase tracking-[0.25em] text-foreground hover:text-primary transition-colors border-b border-foreground/30 hover:border-primary pb-1"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
