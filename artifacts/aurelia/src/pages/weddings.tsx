import { motion } from "framer-motion";
import { Link } from "wouter";
import { portfolioProjects, weddingOfferings } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";

export default function Weddings() {
  const weddings = portfolioProjects.filter((p) => p.category === "Weddings");

  return (
    <div className="w-full bg-background">
      <section className="pt-32 pb-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Bespoke Weddings
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
            Transcendent design.<br />Flawless execution.
          </h1>
          <p className="text-foreground/70 leading-relaxed text-lg">
            We craft deeply personal, architecturally stunning weddings for
            couples who value the extraordinary — and the extraordinary
            stillness that surrounds it.
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 mb-32">
        <div className="container mx-auto">
          <img
            src={scenes.weddingsHero}
            alt="An Aurelia wedding"
            className="w-full max-w-full h-[70vh] object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-secondary/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
              What We Deliver
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              An end-to-end wedding atelier.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {weddingOfferings.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
                className="border-t border-border pt-8"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  0{i + 1}
                </p>
                <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {weddings.length > 0 && (
        <section className="py-32 px-6 md:px-12">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Selected Weddings
              </h2>
              <Link
                href="/portfolio"
                className="text-xs uppercase tracking-widest hover:text-primary transition-colors duration-200 pb-1 border-b border-foreground/20"
              >
                View Full Portfolio
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              {weddings.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`group ${i % 2 === 1 ? "md:mt-32" : ""}`}
                >
                  <Link href={`/portfolio/${project.slug}`}>
                    <div className="overflow-hidden aspect-[4/5] mb-6">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <h3 className="font-serif text-3xl mb-2">{project.title}</h3>
                    <p className="text-sm text-foreground/60">
                      {project.destination}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-32 px-6 md:px-12 border-t border-border text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-8 max-w-3xl mx-auto leading-tight">
          Tell us about your wedding.
        </h2>
        <Link
          href="/inquiry"
          className="inline-block border border-foreground text-foreground text-xs uppercase tracking-widest px-10 py-4 hover:bg-foreground hover:text-background transition-colors duration-200"
        >
          Begin a Conversation
        </Link>
      </section>
    </div>
  );
}
