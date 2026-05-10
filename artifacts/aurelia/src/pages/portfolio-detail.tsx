import { useParams } from "wouter";
import { portfolioProjects } from "@/lib/data";
import { motion } from "framer-motion";
import { Link } from "wouter";
import NotFound from "./not-found";

export default function PortfolioDetail() {
  const { slug } = useParams();
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) return <NotFound />;

  return (
    <div className="w-full bg-[#F3F3F3] pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14 max-w-3xl mx-auto">
          <p className="cc-eyebrow mb-4">{project.category}</p>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light text-[#333333] mb-4">{project.title}</h1>
          <p className="text-[#333333]/50 text-sm font-light tracking-wide">{project.destination} · {project.date}</p>
        </motion.div>

        {/* Hero image */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <img src={project.image} alt={project.title} className="w-full h-[72vh] object-cover mb-16" />
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="md:col-span-2">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="font-serif text-2xl font-light text-[#333333] mb-5">The Concept</h2>
              <p className="text-[#333333]/65 leading-relaxed text-base font-light">{project.description}</p>
            </motion.div>
          </div>
          <div className="space-y-0">
            {[
              { label: "Location", value: project.destination },
              { label: "Guest Count", value: project.guestCount },
              { label: "Services", value: project.services },
            ].map((item) => (
              <div key={item.label} className="border-t border-black/10 pt-5 pb-5">
                <p className="cc-eyebrow mb-1">{item.label}</p>
                <p className="text-[#333333] font-light text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="border-t border-black/10 pt-10 text-center">
          <Link href="/portfolio" className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/50 border-b border-[#333333]/20 pb-1 hover:text-[#333333] transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
