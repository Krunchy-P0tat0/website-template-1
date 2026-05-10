import { Link } from "wouter";
import { motion } from "framer-motion";
import { journalPosts } from "@/lib/data";

export default function Journal() {
  return (
    <div className="w-full bg-[#F3F3F3] pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <p className="cc-eyebrow mb-5">The Journal</p>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light text-[#333333] leading-[1.1] mb-6">Notes from the atelier.</h1>
          <p className="text-[#333333]/60 leading-relaxed font-light max-w-xl mx-auto">
            Field reports, design dispatches, and quiet observations from our ateliers in New York, Los Angeles, Miami, and Florence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {journalPosts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }} className="group">
              <Link href={`/journal/${post.slug}`}>
                <div className="overflow-hidden aspect-[16/10] mb-6">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/45">{post.category}</span>
                  <span className="text-[#333333]/25">·</span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/45">{post.date}</span>
                </div>
                <h2 className="font-serif text-2xl mb-3 text-[#333333] group-hover:text-[#003D68] transition-colors font-light">{post.title}</h2>
                <p className="text-[#333333]/60 font-light text-sm leading-relaxed">{post.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
