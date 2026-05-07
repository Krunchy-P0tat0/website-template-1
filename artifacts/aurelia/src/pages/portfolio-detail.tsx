import { useParams } from "wouter";
import { portfolioProjects } from "@/lib/data";
import { motion } from "framer-motion";
import NotFound from "./not-found";

export default function PortfolioDetail() {
  const { slug } = useParams();
  const project = portfolioProjects.find(p => p.slug === slug);

  if (!project) return <NotFound />;

  return (
    <div className="w-full bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="text-xs uppercase tracking-widest text-primary mb-4 block">{project.category}</span>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">{project.title}</h1>
          <p className="text-foreground/70">{project.destination} · {project.date}</p>
        </motion.div>

        <img src={project.image} alt={project.title} className="w-full h-[70vh] object-cover mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl mb-6">The Concept</h2>
            <p className="text-foreground/70 leading-relaxed text-lg">
              {project.description}
            </p>
          </div>
          <div>
            <div className="border-t border-border pt-6 mb-6">
              <h4 className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Location</h4>
              <p>{project.destination}</p>
            </div>
            <div className="border-t border-border pt-6 mb-6">
              <h4 className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Guest Count</h4>
              <p>{project.guestCount}</p>
            </div>
            <div className="border-t border-border pt-6">
              <h4 className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Services</h4>
              <p>{project.services}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}