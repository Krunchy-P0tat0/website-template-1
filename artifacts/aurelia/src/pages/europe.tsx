import { motion } from "framer-motion";
import { Link } from "wouter";
import { europeServices } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Europe() {
  return (
    <div className="w-full bg-[#F3F3F3]">
      {/* Hero */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <img src={scenes.europeHero} alt="Lake Como" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/55 text-[10px] uppercase tracking-[0.35em] mb-7">Aurelia & Co. — Florence Atelier</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-white text-[clamp(3rem,8vw,6.5rem)] font-light leading-[1.05] mb-8">Aurelia Europe</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/70 max-w-xl mx-auto leading-relaxed font-light">
            A dedicated atelier rooted in Florence, designing celebrations across Italy, France, Greece, and the Mediterranean.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { number: "12", label: "Years on the continent" },
            { number: "180+", label: "Celebrations across Europe" },
            { number: "60+", label: "Private venues secured for clients" },
          ].map((s, i) => (
            <motion.div key={s.label} {...fadeUp(i * 0.1)}>
              <p className="font-serif text-[clamp(3rem,7vw,5rem)] font-light text-[#333333] mb-2">{s.number}</p>
              <p className="cc-eyebrow">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 md:px-12 bg-[#F3F3F3]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <motion.h2 {...fadeUp(0)} className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-[#333333]">
              The continent, mapped through our network.
            </motion.h2>
            <motion.p {...fadeUp(0.08)} className="text-[#333333]/60 leading-relaxed mt-5 font-light">
              Our European division is built on long-standing relationships with private estates, vineyards, religious authorities, and cultural institutions — many of whom we have worked with for over a decade.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {europeServices.map((s, i) => (
              <motion.div key={s.title} {...fadeUp((i % 2) * 0.08)} className="border-t border-black/10 pt-8">
                <h3 className="font-serif text-2xl mb-4 text-[#333333] font-light">{s.title}</h3>
                <p className="text-[#333333]/60 leading-relaxed font-light text-sm">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Florence — image + copy */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeUp(0)}>
            <p className="cc-eyebrow mb-5">The Florence Atelier</p>
            <h3 className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light text-[#333333] mb-6 leading-snug">Via de' Tornabuoni</h3>
            <p className="text-[#333333]/60 leading-relaxed mb-5 font-light">
              Our European headquarters occupies a historic palazzo in the heart of Florence. From there, our resident producers, florists, and logistics team operate across the Italian peninsula and the wider Mediterranean.
            </p>
            <p className="text-[#333333]/60 leading-relaxed mb-9 font-light">
              Whether you are planning a wedding on the Amalfi Coast or a private dinner in Provence, your project is led by a senior European producer with a single phone number — yours.
            </p>
            <Link href="/inquiry" className="inline-block border border-[#333333]/40 text-[#333333] text-[10px] uppercase tracking-[0.22em] px-10 py-4 hover:bg-[#333333] hover:text-white transition-all duration-300">
              Plan a European Celebration
            </Link>
          </motion.div>
          <motion.div {...fadeUp(0.12)}>
            <img src={scenes.europeAccent} alt="Florence atelier" className="w-full aspect-[4/5] object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
