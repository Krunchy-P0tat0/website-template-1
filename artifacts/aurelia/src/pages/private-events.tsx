import { motion } from "framer-motion";
import { Link } from "wouter";
import { privateOfferings, portfolioProjects } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";

export default function PrivateEvents() {
  const privateProjects = portfolioProjects.filter(
    (p) => p.category === "Private",
  );

  return (
    <div className="w-full bg-background">
      <section className="relative h-[80vh] w-full flex items-end overflow-hidden">
        <img
          src={scenes.privateHero}
          alt="Private celebration"
          className="absolute inset-0 w-full h-full max-w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 md:px-12 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white/80 text-xs uppercase tracking-[0.3em] mb-6"
          >
            Private Events
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-white font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl leading-[1.05]"
          >
            Celebrations that feel<br/>like a chapter, not<br/>a single evening.
          </motion.h1>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-4xl leading-snug mb-8"
          >
            We have spent a decade designing the most personal moments in our
            clients' lives — quietly, and almost always behind closed doors.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-foreground/70 leading-relaxed"
          >
            From milestone birthdays in private estates to multi-day yacht
            programs across the Mediterranean, every Aurelia private event is
            led by a single producer and protected by absolute discretion.
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-secondary/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {privateOfferings.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
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

      <section className="py-32 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={scenes.privateAccent}
              alt="Atelier"
              className="w-full max-w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
              The Approach
            </p>
            <h3 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
              Designed in private. Delivered in confidence.
            </h3>
            <p className="text-foreground/70 leading-relaxed mb-6">
              Our private clients work with us across years, sometimes
              decades. We learn how a family hosts, where they entertain,
              what their guests remember. Every Aurelia private event begins
              with that intimacy — and is built on a single, dedicated
              producer who is present from the first call to the last guest.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-8">
              Discretion is not a service we offer; it is the structure of
              everything we do. Our team operates without third-party
              vendors when possible, with NDAs in place when not, and with
              the understanding that our work should never be seen unless
              our clients choose to share it.
            </p>
            <Link
              href="/inquiry"
              className="inline-block border border-foreground text-foreground text-xs uppercase tracking-widest px-8 py-4 hover:bg-foreground hover:text-background transition-colors duration-500"
            >
              Begin a Private Conversation
            </Link>
          </motion.div>
        </div>
      </section>

      {privateProjects.length > 0 && (
        <section className="py-32 px-6 md:px-12 border-t border-border">
          <div className="container mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl mb-16 text-center">
              Selected Private Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {privateProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className={`group ${i === 1 ? "md:mt-24" : ""}`}
                >
                  <Link href={`/portfolio/${project.slug}`}>
                    <div className="overflow-hidden aspect-[4/5] mb-6">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
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

      <section className="py-32 px-6 md:px-12 border-t border-border text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-8 max-w-3xl mx-auto leading-tight">
          Speak with us in confidence.
        </h2>
        <Link
          href="/inquiry"
          className="inline-block border border-foreground text-foreground text-xs uppercase tracking-widest px-10 py-4 hover:bg-foreground hover:text-background transition-colors duration-500"
        >
          Begin a Private Conversation
        </Link>
      </section>
    </div>
  );
}
