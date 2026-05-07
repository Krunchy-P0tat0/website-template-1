import { motion } from "framer-motion";
import { Link } from "wouter";
import { corporateOfferings, portfolioProjects } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";

export default function Corporate() {
  const corporateProjects = portfolioProjects.filter(
    (p) => p.category === "Corporate",
  );

  return (
    <div className="w-full bg-background">
      <section className="relative h-[80vh] w-full flex items-end overflow-hidden">
        <img
          src={scenes.galaHero}
          alt="Corporate gala"
          className="absolute inset-0 w-full h-full max-w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 md:px-12 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-white/80 text-xs uppercase tracking-[0.3em] mb-6"
          >
            Corporate
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-white font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl leading-[1.05]"
          >
            High-impact moments,<br/>quietly choreographed.
          </motion.h1>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-serif text-3xl md:text-4xl leading-snug mb-8"
          >
            We produce the room your brand walks into — the lighting, the
            pacing, the press preview, the after-party.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-foreground/70 leading-relaxed"
          >
            Our corporate division partners with global brands, foundations,
            and institutions on the events that define a year. Every
            engagement is led by a senior producer and supported by our
            full creative atelier.
          </motion.p>
        </div>
      </section>

      <section className="bg-secondary/30">
        {corporateOfferings.map((offering, i) => (
          <div
            key={offering.id}
            id={offering.id}
            className={`py-24 px-6 md:px-12 ${
              i !== corporateOfferings.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="container mx-auto">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={offering.image}
                    alt={offering.title}
                    className="w-full aspect-[4/5] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
                    0{i + 1} — Service
                  </p>
                  <h3 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
                    {offering.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed mb-8">
                    {offering.description}
                  </p>
                  <ul className="space-y-3">
                    {offering.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-4 text-foreground/80"
                      >
                        <span className="block w-6 h-px bg-primary mt-3" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {corporateProjects.length > 0 && (
        <section className="py-32 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <h2 className="font-serif text-4xl md:text-5xl">
                Recent Corporate Work
              </h2>
              <Link
                href="/portfolio"
                className="text-xs uppercase tracking-widest hover:text-primary transition-colors duration-200 pb-1 border-b border-foreground/20"
              >
                View Full Portfolio
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {corporateProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`group ${i === 1 ? "md:mt-24" : ""}`}
                >
                  <Link href={`/portfolio/${project.slug}`}>
                    <div className="overflow-hidden aspect-[4/5] mb-6">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <h3 className="font-serif text-2xl mb-1">
                      {project.title}
                    </h3>
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

      <section className="py-32 px-6 md:px-12 bg-background border-t border-border text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-8 max-w-3xl mx-auto leading-tight">
          Tell us about your next gathering.
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
