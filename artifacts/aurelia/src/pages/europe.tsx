import { motion } from "framer-motion";
import { Link } from "wouter";
import { europeServices } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";

export default function Europe() {
  return (
    <div className="w-full bg-background">
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <img
          src={scenes.europeHero}
          alt="Lake Como"
          className="absolute inset-0 w-full h-full max-w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white/80 text-xs uppercase tracking-[0.3em] mb-6"
          >
            Aurelia & Co. — Florence Atelier
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-white font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-8"
          >
            Aurelia Europe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            A dedicated atelier rooted in Florence, designing celebrations
            across Italy, France, Greece, and the Mediterranean.
          </motion.p>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 text-center">
          {[
            { number: "12", label: "Years on the continent" },
            { number: "180+", label: "Celebrations across Europe" },
            { number: "60+", label: "Private venues secured for clients" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <p className="font-serif text-6xl md:text-7xl mb-4">
                {stat.number}
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-secondary/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
              The continent, mapped through our network.
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Our European division is built on long-standing relationships
              with private estates, vineyards, religious authorities, and
              cultural institutions — many of whom we have worked with for
              over a decade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {europeServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                className="border-t border-border pt-8"
              >
                <h3 className="font-serif text-3xl mb-4">{service.title}</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
              The Florence Atelier
            </p>
            <h3 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
              Via de' Tornabuoni
            </h3>
            <p className="text-foreground/70 leading-relaxed mb-6">
              Our European headquarters occupies a historic palazzo in the
              heart of Florence. From there, our resident producers,
              florists, and logistics team operate across the Italian
              peninsula and the wider Mediterranean.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-8">
              Whether you are planning a wedding on the Amalfi Coast or a
              private dinner in Provence, your project is led by a senior
              European producer with a single phone number — yours.
            </p>
            <Link
              href="/inquiry"
              className="inline-block border border-foreground text-foreground text-xs uppercase tracking-widest px-8 py-4 hover:bg-foreground hover:text-background transition-colors duration-500"
            >
              Plan a European Celebration
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={scenes.europeAccent}
              alt="Florence atelier"
              className="w-full max-w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
