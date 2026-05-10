import { motion } from "framer-motion";
import { Link } from "wouter";
import { privateOfferings, portfolioProjects } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function PrivateEvents() {
  const privateProjects = portfolioProjects.filter((p) => p.category === "Private");

  return (
    <div className="w-full bg-[#F3F3F3]">
      {/* Hero */}
      <section className="relative h-[80vh] w-full flex items-end overflow-hidden">
        <img src={scenes.privateHero} alt="Private celebration" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 pb-20 max-w-5xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-5">Private Events</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-white text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.1]">
            Celebrations that feel<br />like a chapter, not<br />a single evening.
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 {...fadeUp(0)} className="font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-light text-[#333333] leading-snug mb-6">
            We have spent a decade designing the most personal moments in our clients' lives — quietly, and almost always behind closed doors.
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="text-[#333333]/60 leading-relaxed font-light">
            From milestone birthdays in private estates to multi-day yacht programs across the Mediterranean, every private event is led by a single producer and protected by absolute discretion.
          </motion.p>
        </div>
      </section>

      {/* Offerings grid */}
      <section className="py-20 px-6 md:px-12 bg-[#F3F3F3]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {privateOfferings.map((item, i) => (
            <motion.div key={item.title} {...fadeUp((i % 3) * 0.08)} className="border-t border-black/10 pt-8">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-4">0{i + 1}</p>
              <h3 className="font-serif text-xl mb-4 text-[#333333] font-light">{item.title}</h3>
              <p className="text-[#333333]/60 leading-relaxed font-light text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Approach — image + copy */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeUp(0)}>
            <img src={scenes.privateAccent} alt="Private atelier" className="w-full aspect-[4/5] object-cover" loading="lazy" />
          </motion.div>
          <motion.div {...fadeUp(0.12)}>
            <p className="cc-eyebrow mb-5">The Approach</p>
            <h3 className="font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light text-[#333333] mb-7 leading-snug">
              Designed in private. Delivered in confidence.
            </h3>
            <p className="text-[#333333]/60 leading-relaxed mb-5 font-light">
              Our private clients work with us across years, sometimes decades. We learn how a family hosts, where they entertain, what their guests remember. Every event begins with that intimacy — and is built on a dedicated producer present from the first call to the last guest.
            </p>
            <p className="text-[#333333]/60 leading-relaxed mb-9 font-light">
              Discretion is not a service we offer; it is the structure of everything we do. Our team operates with NDAs in place and with the understanding that our work should never be seen unless our clients choose to share it.
            </p>
            <Link href="/inquiry" className="inline-block border border-[#333333]/40 text-[#333333] text-[10px] uppercase tracking-[0.22em] px-10 py-4 hover:bg-[#333333] hover:text-white transition-all duration-300">
              Begin a Private Conversation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Portfolio */}
      {privateProjects.length > 0 && (
        <section className="py-20 px-6 md:px-12 bg-[#F3F3F3]">
          <div className="max-w-6xl mx-auto">
            <motion.h2 {...fadeUp(0)} className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-[#333333] text-center mb-14">Selected Private Work</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {privateProjects.map((project, i) => (
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
        <motion.h2 {...fadeUp(0)} className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light mb-8">Speak with us in confidence.</motion.h2>
        <motion.div {...fadeUp(0.1)}>
          <Link href="/inquiry" className="inline-block border border-white/40 text-white text-[10px] uppercase tracking-[0.28em] px-12 py-4 hover:bg-white hover:text-[#003D68] transition-all duration-300">
            Begin a Private Conversation
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
