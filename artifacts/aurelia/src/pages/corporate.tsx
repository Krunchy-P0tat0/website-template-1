import { motion } from "framer-motion";
import { Link } from "wouter";
import { corporateOfferings, portfolioProjects } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Corporate() {
  const corporateProjects = portfolioProjects.filter((p) => p.category === "Corporate");

  return (
    <div className="w-full bg-[#F3F3F3]">
      {/* Hero */}
      <section className="relative h-[80vh] w-full flex items-end overflow-hidden">
        <img src={scenes.galaHero} alt="Corporate gala" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-20 max-w-5xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-5">Corporate Events</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-white text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.1]">
            High-impact moments,<br />quietly choreographed.
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 {...fadeUp(0)} className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-light text-[#333333] leading-snug mb-6">
            We produce the room your brand walks into — the lighting, the pacing, the press preview, the after-party.
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="text-[#333333]/60 leading-relaxed font-light">
            Our corporate division partners with global brands, foundations, and institutions on the events that define a year. Every engagement is led by a senior producer and supported by our full creative atelier.
          </motion.p>
        </div>
      </section>

      {/* Offerings */}
      <section className="bg-[#F3F3F3]">
        {corporateOfferings.map((offering, i) => (
          <div key={offering.id} id={offering.id} className={`py-20 px-6 md:px-12 ${i !== corporateOfferings.length - 1 ? "border-b border-black/8" : ""}`}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <motion.div {...fadeUp(0)} className={i % 2 === 1 ? "lg:order-2" : ""}>
                <img src={offering.image} alt={offering.title} className="w-full aspect-[4/5] object-cover" />
              </motion.div>
              <motion.div {...fadeUp(0.1)}>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-4">0{i + 1} — Service</p>
                <h3 className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light text-[#333333] mb-5 leading-snug">{offering.title}</h3>
                <p className="text-[#333333]/60 leading-relaxed mb-7 font-light">{offering.description}</p>
                <ul className="space-y-3">
                  {offering.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-4 text-[#333333]/75 font-light text-sm">
                      <span className="block w-5 h-px bg-[#003D68] mt-3 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        ))}
      </section>

      {/* Portfolio */}
      {corporateProjects.length > 0 && (
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
              <motion.h2 {...fadeUp(0)} className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-[#333333]">Recent Corporate Work</motion.h2>
              <Link href="/portfolio" className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/50 border-b border-[#333333]/20 pb-1 hover:text-[#333333] transition-colors">View Full Portfolio</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {corporateProjects.map((project, i) => (
                <motion.div key={project.id} {...fadeUp(i * 0.08)} className={`group ${i === 1 ? "md:mt-24" : ""}`}>
                  <Link href={`/portfolio/${project.slug}`}>
                    <div className="overflow-hidden aspect-[4/5] mb-5">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    </div>
                    <h3 className="font-serif text-xl mb-1 text-[#333333]">{project.title}</h3>
                    <p className="text-sm text-[#333333]/55 font-light">{project.destination}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6 bg-[#003D68] text-white text-center">
        <motion.h2 {...fadeUp(0)} className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light mb-8">Tell us about your next gathering.</motion.h2>
        <motion.div {...fadeUp(0.1)}>
          <Link href="/inquiry" className="inline-block border border-white/40 text-white text-[10px] uppercase tracking-[0.28em] px-12 py-4 hover:bg-white hover:text-[#003D68] transition-all duration-300">
            Begin a Conversation
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
