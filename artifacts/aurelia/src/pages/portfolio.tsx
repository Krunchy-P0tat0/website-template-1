import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { portfolioProjects } from "@/lib/data";

const categories = ["All", "Weddings", "Corporate", "Private", "Destinations"];
const INITIAL_VISIBLE = 8;

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    activeCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  const isFiltered = activeCategory !== "All";
  const displayed =
    isFiltered || showAll
      ? filteredProjects
      : filteredProjects.slice(0, INITIAL_VISIBLE);

  const hiddenCount = Math.max(0, filteredProjects.length - INITIAL_VISIBLE);

  return (
    <div className="w-full bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Portfolio
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
            A selection of recent work.
          </h1>
          <p className="text-foreground/70 leading-relaxed">
            A curated view of weddings, corporate productions, private
            celebrations, and destination events from across our four
            ateliers. Many of our most personal projects remain unseen by
            request.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`text-xs uppercase tracking-widest pb-1 border-b transition-colors duration-200 ${
                activeCategory === cat
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <AnimatePresence>
            {displayed.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
                className={`group cursor-pointer ${i % 2 === 1 ? "md:mt-24" : ""}`}
              >
                <Link href={`/portfolio/${project.slug}`}>
                  <div className="overflow-hidden aspect-square mb-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-2xl mb-1">{project.title}</h3>
                      <p className="text-sm text-foreground/60">{project.destination}</p>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-foreground/50">
                      {project.category}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!isFiltered && !showAll && hiddenCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col items-center mt-20 gap-4"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/40">
              {hiddenCount} more project{hiddenCount !== 1 ? "s" : ""} in our archive
            </p>
            <button
              onClick={() => setShowAll(true)}
              className="text-xs uppercase tracking-widest border border-foreground/30 px-10 py-4 hover:border-primary hover:text-primary transition-colors duration-200"
            >
              View More
            </button>
          </motion.div>
        )}

        {(isFiltered || showAll) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mt-20"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/40">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} shown
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
