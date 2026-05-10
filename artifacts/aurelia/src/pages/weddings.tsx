import { motion } from "framer-motion";
import { Link } from "wouter";
import { portfolioProjects, weddingOfferings } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Weddings() {
  const weddings = portfolioProjects.filter((p) => p.category === "Weddings");

  return (
    <div className="w-full bg-[#F3F3F3]">
      {/* Hero text */}
      <section className="pt-40 pb-16 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="cc-eyebrow mb-6"
          >
            Bespoke Weddings
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-light text-[#333333] mb-8"
          >
            Transcendent design.<br />Flawless execution.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}
            className="text-[#333333]/60 leading-relaxed text-lg font-light max-w-2xl mx-auto"
          >
            We craft deeply personal, architecturally stunning weddings for couples who value the extraordinary — and the extraordinary stillness that surrounds it.
          </motion.p>
        </div>
      </section>

      {/* Hero image — full bleed */}
      <section className="px-0 mb-0">
        <img
          src={scenes.weddingsHero}
          alt="An Aurelia wedding"
          className="w-full h-[72vh] object-cover"
          loading="lazy"
        />
      </section>

      {/* Offerings */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <motion.p {...fadeUp(0)} className="cc-eyebrow mb-5">What We Deliver</motion.p>
            <motion.h2 {...fadeUp(0.08)} className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-[#333333]">
              An end-to-end wedding atelier.
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
            {weddingOfferings.map((item, i) => (
              <motion.div key={item.title} {...fadeUp((i % 3) * 0.08)} className="border-t border-black/10 pt-8">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-4">0{i + 1}</p>
                <h3 className="font-serif text-xl mb-4 text-[#333333]">{item.title}</h3>
                <p className="text-[#333333]/60 leading-relaxed text-sm font-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      {weddings.length > 0 && (
        <section className="py-20 px-6 md:px-12 bg-[#F3F3F3]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
              <motion.h2 {...fadeUp(0)} className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-[#333333]">
                Selected Weddings
              </motion.h2>
              <Link href="/portfolio" className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/50 border-b border-[#333333]/20 pb-1 hover:text-[#333333] transition-colors">
                View Full Portfolio
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {weddings.map((project, i) => (
                <motion.div key={project.id} {...fadeUp(i * 0.08)} className={`group ${i % 2 === 1 ? "md:mt-24" : ""}`}>
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
        <motion.h2 {...fadeUp(0)} className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light mb-8">
          Tell us about your wedding.
        </motion.h2>
        <motion.div {...fadeUp(0.1)}>
          <Link href="/inquiry" className="inline-block border border-white/40 text-white text-[10px] uppercase tracking-[0.28em] px-12 py-4 hover:bg-white hover:text-[#003D68] transition-all duration-300">
            Begin a Conversation
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
