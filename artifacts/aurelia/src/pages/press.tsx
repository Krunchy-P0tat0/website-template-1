import { motion } from "framer-motion";
import { pressFeatures, pressQuotes } from "@/lib/data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function Press() {
  return (
    <div className="w-full bg-[#F3F3F3] pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20 max-w-2xl mx-auto">
          <p className="cc-eyebrow mb-5">Press & Recognition</p>
          <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light text-[#333333] mb-5">
            Selected mentions, interviews, and accolades.
          </h1>
          <p className="text-[#333333]/60 leading-relaxed font-light">
            For press inquiries, please contact our communications office at{" "}
            <a href="mailto:press@aureliaco.com" className="text-[#003D68] hover:underline">press@aureliaco.com</a>.
          </p>
        </motion.div>

        {/* Publication names — CC masthead style */}
        <section className="mb-20 py-12 border-t border-b border-black/8 bg-white">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
            {pressFeatures.map((f) => (
              <motion.p key={f.publication} {...fadeUp(0)} className="font-serif text-2xl md:text-3xl text-[#333333]/50 hover:text-[#333333] transition-colors cursor-default">
                {f.publication}
              </motion.p>
            ))}
          </div>
        </section>

        {/* Articles grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {pressFeatures.map((f, i) => (
              <motion.article key={f.title} {...fadeUp((i % 2) * 0.08)} className="border-t border-black/10 pt-8 group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/45">{f.publication}</span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/35">{f.date}</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-4 leading-snug text-[#333333] group-hover:text-[#003D68] transition-colors font-light">{f.title}</h3>
                <p className="text-[#333333]/60 leading-relaxed font-light text-sm">{f.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Pull quotes */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pressQuotes.map((q, i) => (
              <motion.div key={q.source} {...fadeUp(i * 0.1)} className="border border-black/10 p-10 text-center bg-white hover:border-[#003D68]/30 transition-colors">
                <p className="font-serif text-xl italic text-[#333333]/70 mb-7 leading-relaxed">"{q.text}"</p>
                <p className="cc-eyebrow text-[#003D68]">{q.source}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
