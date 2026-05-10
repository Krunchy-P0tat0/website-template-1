import { motion } from "framer-motion";
import { Link } from "wouter";
import { studioPrinciples, ateliers } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  return (
    <div className="w-full bg-[#F3F3F3]">

      {/* Header */}
      <section className="pt-40 pb-16 px-6 md:px-12 bg-white text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="cc-eyebrow mb-6">
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] font-light text-[#333333] mb-8 max-w-4xl mx-auto"
        >
          A decade of quietly remarkable celebrations.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}
          className="text-[#333333]/60 leading-relaxed text-lg font-light max-w-2xl mx-auto"
        >
          Founded on the belief that life's most significant moments deserve uncompromising beauty and precision.
        </motion.p>
      </section>

      {/* Philosophy — image + text */}
      <section className="py-20 px-6 md:px-12 bg-[#F3F3F3]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0)}>
            <img src={scenes.aboutAtelier} alt="Aurelia & Co. atelier" className="w-full aspect-[4/5] object-cover" loading="lazy" />
          </motion.div>
          <motion.div {...fadeUp(0.12)} className="max-w-lg">
            <p className="cc-eyebrow mb-4">The Philosophy</p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-light text-[#333333] mb-6 leading-snug">
              Precision of a couture atelier.
            </h2>
            <p className="text-[#333333]/65 leading-relaxed mb-5 font-light">
              We approach every event as a singular work of art. From the initial conceptual sketches to the final candlelit reveal, our process is exhaustive, intentional, and deeply personal. We don't plan events; we architect atmospheres.
            </p>
            <p className="text-[#333333]/65 leading-relaxed font-light">
              With ateliers in New York, Los Angeles, Miami, and Florence, our global team of designers, producers, and logistical experts execute seamlessly across continents — ensuring that wherever your celebration takes place, it unfolds with flawless grace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <motion.p {...fadeUp(0)} className="cc-eyebrow mb-5">Studio Principles</motion.p>
            <motion.h2 {...fadeUp(0.08)} className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-[#333333]">
              Three values, held without exception.
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {studioPrinciples.map((p, i) => (
              <motion.div key={p.title} {...fadeUp(i * 0.1)} className="border-t border-black/10 pt-8">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-4">0{i + 1}</p>
                <h3 className="font-serif text-2xl mb-4 text-[#333333] font-light">{p.title}</h3>
                <p className="text-[#333333]/60 leading-relaxed font-light text-sm">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ateliers */}
      <section className="py-20 px-6 md:px-12 bg-[#F3F3F3]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <motion.p {...fadeUp(0)} className="cc-eyebrow mb-5">Our Ateliers</motion.p>
            <motion.h2 {...fadeUp(0.08)} className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-[#333333]">
              Four houses, one standard.
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ateliers.map((a, i) => (
              <motion.div key={a.city} {...fadeUp(i * 0.08)} className="border-t border-black/10 pt-8">
                <h3 className="font-serif text-2xl mb-2 text-[#333333] font-light">{a.city}</h3>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-4">{a.role}</p>
                <p className="text-[#333333]/60 text-sm leading-relaxed font-light">{a.address}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#003D68] text-white text-center">
        <motion.h2 {...fadeUp(0)} className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light mb-8">
          We would be honoured to design yours.
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
