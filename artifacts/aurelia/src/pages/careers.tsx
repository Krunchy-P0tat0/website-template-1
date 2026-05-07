import { motion } from "framer-motion";
import { Link } from "wouter";

const principles = [
  {
    title: "Craft over speed",
    body: "We move at the pace the work demands. Beautiful events take patience, and we build the timelines to allow for it.",
  },
  {
    title: "Client confidentiality",
    body: "Discretion is the foundation of our practice. What happens at our productions stays inside the team that produced it.",
  },
  {
    title: "A flat creative voice",
    body: "Interns and senior designers sit at the same table. The best idea wins, regardless of who brought it.",
  },
  {
    title: "Travel as a way of working",
    body: "We work where the events are. Most of our team takes 8–12 international trips a year — passport pages fill quickly.",
  },
];

const benefits = [
  {
    title: "Compensation",
    body: "Above-market base salary benchmarked twice yearly against luxury hospitality, fashion, and events firms in each city.",
  },
  {
    title: "Annual bonus",
    body: "Performance and project-based bonuses paid each January, in addition to base salary.",
  },
  {
    title: "Health & wellness",
    body: "Full medical, dental, and vision in the US; private supplementary insurance in Italy. A monthly wellness stipend.",
  },
  {
    title: "Travel & per diem",
    body: "Business-class travel on long-haul productions, generous per diems, and a personal travel credit each year.",
  },
  {
    title: "Time to recover",
    body: "Six weeks of paid leave including a mandatory studio shutdown each August and the last week of December.",
  },
  {
    title: "Continuing education",
    body: "An annual learning budget for courses, workshops, and conferences in design, hospitality, and the arts.",
  },
];

const openRoles = [
  {
    title: "Senior Event Designer",
    department: "Design Studio",
    location: "Florence, Italy",
    type: "Full-time",
    summary:
      "Lead the visual concept for a portfolio of European weddings and private events, from first sketch through to on-site styling.",
    posted: "Posted 2 weeks ago",
  },
  {
    title: "Production Manager",
    department: "Production & Operations",
    location: "New York, NY",
    type: "Full-time",
    summary:
      "Own load-in, rehearsal, and on-site execution for a roster of US-based productions of 200–800 guests. Heavy travel.",
    posted: "Posted 3 weeks ago",
  },
  {
    title: "Floral Lead",
    department: "Design Studio",
    location: "Los Angeles, CA",
    type: "Full-time",
    summary:
      "Bring a distinct floral point of view to our West Coast productions. Five+ years' experience leading large-scale installations.",
    posted: "Posted 1 month ago",
  },
  {
    title: "Client Director, Corporate",
    department: "Planning & Logistics",
    location: "New York, NY",
    type: "Full-time",
    summary:
      "Own the client relationship and commercial outcome for a portfolio of brand experiences, gala dinners, and product launches.",
    posted: "Posted 1 month ago",
  },
  {
    title: "Junior Planner",
    department: "Planning & Logistics",
    location: "Miami, FL",
    type: "Full-time",
    summary:
      "Support senior planners across a multi-event portfolio. The right entry point for a hospitality graduate with one to two years' experience.",
    posted: "Posted 5 days ago",
  },
  {
    title: "Communications Associate",
    department: "Communications & Editorial",
    location: "New York, NY",
    type: "Full-time",
    summary:
      "Manage press requests, image licensing, and the editorial calendar for The Journal. A writer at heart.",
    posted: "Posted 2 weeks ago",
  },
];

const process = [
  {
    step: "01",
    title: "Application",
    body: "Send a one-page CV and a short letter to careers@aureliaco.com noting the role and office you're applying for.",
  },
  {
    step: "02",
    title: "Initial screen",
    body: "A 30-minute conversation with our talent partner to discuss your background and why this role interests you.",
  },
  {
    step: "03",
    title: "Studio interviews",
    body: "Two or three conversations with the department lead, a peer, and a senior partner. We try to compress these into a single visit.",
  },
  {
    step: "04",
    title: "Portfolio review",
    body: "For creative roles, a 60-minute review of your past work and a brief conversation about how you'd approach a recent Aurelia & Co. brief.",
  },
  {
    step: "05",
    title: "Offer",
    body: "Decision and offer typically within ten business days of the final conversation.",
  },
];

export default function Careers() {
  return (
    <div className="w-full bg-background pt-28 md:pt-32 pb-24">
      <div className="container mx-auto px-5 md:px-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
            Join the Atelier
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-6 tracking-tight">
            Careers
          </h1>
          <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
            Aurelia & Co. is a small, deliberate team — 64 people across four
            cities — producing some of the most beautiful celebrations in the
            world. We hire for craft, calm under pressure, and the kind of
            taste that lifts every room.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="border-y border-border py-12 mb-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "64", label: "Team Members" },
              { value: "4", label: "Studio Cities" },
              { value: "120+", label: "Events Per Year" },
              { value: "12 yrs", label: "Average Tenure" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-4xl md:text-5xl mb-2">
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Principles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
              How We Work
            </div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
              Four working principles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto">
            {principles.map((p) => (
              <div key={p.title}>
                <h3 className="font-serif text-2xl mb-3 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-foreground/65 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Open roles */}
        <motion.section
          id="open-roles"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="border-t border-border pt-16 mb-24"
        >
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
              Now Hiring
            </div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
              Open positions
            </h2>
          </div>
          <div className="border-t border-border max-w-5xl mx-auto">
            {openRoles.map((r) => (
              <a
                key={r.title}
                href={`mailto:careers@aureliaco.com?subject=${encodeURIComponent(
                  `Application — ${r.title} (${r.location})`,
                )}`}
                className="group block border-b border-border py-7 hover:bg-card transition-colors px-2 md:px-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
                      {r.department}
                    </div>
                    <h3 className="font-serif text-2xl mb-2 tracking-tight group-hover:text-primary transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-sm text-foreground/65 leading-relaxed max-w-2xl">
                      {r.summary}
                    </p>
                  </div>
                  <div className="md:text-right text-sm text-foreground/55 space-y-1 md:min-w-[180px]">
                    <div>{r.location}</div>
                    <div>{r.type}</div>
                    <div className="text-xs text-foreground/40">
                      {r.posted}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.25em] text-foreground group-hover:text-primary transition-colors mt-2">
                      Apply →
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <p className="text-center text-sm text-foreground/55 mt-8">
            Don't see your role?{" "}
            <a
              href="mailto:careers@aureliaco.com?subject=General%20Application%20—%20Aurelia%20%26%20Co."
              className="text-primary hover:underline underline-offset-4"
            >
              Send us your portfolio anyway.
            </a>
          </p>
        </motion.section>

        {/* Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="border-t border-border pt-16 mb-24"
        >
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
              The Offer
            </div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
              What we provide
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-border/60 p-7 bg-card"
              >
                <h3 className="font-serif text-xl mb-3 tracking-tight">
                  {b.title}
                </h3>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  {b.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Process */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="border-t border-border pt-16 mb-24 max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
              Hiring Process
            </div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
              How we hire
            </h2>
          </div>
          <div className="space-y-8">
            {process.map((p) => (
              <div
                key={p.step}
                className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-6 border-b border-border/60 pb-8 last:border-0"
              >
                <div className="font-serif text-3xl text-primary">
                  {p.step}
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-foreground/65 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="border-t border-border pt-16 text-center max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-5 tracking-tight">
            Apply now
          </h2>
          <p className="text-foreground/65 leading-relaxed mb-8">
            All applications are read by a real person on our talent team.
            We respond to every candidate within ten business days.
          </p>
          <a
            href="mailto:careers@aureliaco.com"
            className="inline-block bg-foreground text-background px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-primary transition-colors"
          >
            careers@aureliaco.com
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
