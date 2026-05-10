import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { portfolioProjects } from "@/lib/data";

const categories = ["All", "Weddings", "Corporate", "Private", "Destinations"];
const INITIAL_VISIBLE = 8;

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = activeCategory === "All" ? portfolioProjects : portfolioProjects.filter((p) => p.category === activeCategory);
  const isFiltered = activeCategory !== "All";
  const displayed = isFiltered || showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_VISIBLE);
  const hiddenCount = Math.max(0, filteredProjects.length - INITIAL_VISIBLE);

  return (
    <div className="w-full bg-[#F3F3F3] pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <p className="cc-eyebrow mb-5">Portfolio</p>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light text-[#333333] leading-[1.1] mb-6">
            A selection of recent work.
          </h1>
          <p className="text-[#333333]/60 leading-relaxed font-light max-w-xl mx-auto">
            A curated view of weddings, corporate productions, private celebrations, and destination events from across our four ateliers. Many of our most personal projects remain unseen by request.
          </p>
        </motion.div>

        {/* Filters — CC pipe style */}
        <div className="flex flex-wrap justify-center items-center gap-0 mb-16">
          {categories.map((cat, i) => (
            <span key={cat} className="flex items-center">
              <button
                onClick={() => { setActiveCategory(cat); setShowAll(false); }}
                className={`text-[11px] uppercase tracking-[0.2em] px-5 py-1 transition-colors duration-200 ${
                  activeCategory === cat ? "text-[#333333]" : "text-[#333333]/40 hover:text-[#333333]/70"
                }`}
              >
                {cat}
              </button>
              {i < categories.length - 1 && <span className="text-[#333333]/20 text-sm">|</span>}
            </span>
          ))}
        </div>
        {/* Active underline */}
        <div className="flex justify-center mb-14">
          <div className="w-8 h-px bg-[#333333]/30" />
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <AnimatePresence>
            {displayed.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35 }}
                className={`group ${i % 2 === 1 ? "md:mt-24" : ""}`}
              >
                <Link href={`/portfolio/${project.slug}`}>
                  <div className="overflow-hidden aspect-[4/5] mb-5">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-xl mb-1 text-[#333333]">{project.title}</h3>
                      <p className="text-sm text-[#333333]/55 font-light">{project.destination}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#333333]/35 mt-1">{project.category}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!isFiltered && !showAll && hiddenCount > 0 && (
          <div className="flex flex-col items-center mt-20 gap-5">
            <p className="cc-eyebrow">{hiddenCount} more project{hiddenCount !== 1 ? "s" : ""} in our archive</p>
            <button onClick={() => setShowAll(true)} className="border border-[#333333]/30 text-[#333333] text-[10px] uppercase tracking-[0.22em] px-12 py-4 hover:border-[#333333] transition-colors">
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
