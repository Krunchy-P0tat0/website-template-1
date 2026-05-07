import { motion } from "framer-motion";
import { Link } from "wouter";
import { studioPrinciples, ateliers } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";

export default function About() {
  return (
    <div className="w-full bg-background">
      <section className="pt-32 pb-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Our Story
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
            A decade of quietly remarkable celebrations.
          </h1>
          <p className="text-foreground/70 leading-relaxed text-lg">
            Founded on the belief that life's most significant moments deserve
            uncompromising beauty and precision, Aurelia & Co. has spent over
            a decade designing events for clients who value discretion as
            deeply as they value the experience itself.
          </p>
        </motion.div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={scenes.aboutAtelier}
              alt="Aurelia & Co. atelier"
              className="w-full max-w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-lg"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              The Philosophy
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
              Precision of a couture atelier.
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-6">
              We approach every event as a singular work of art. From the
              initial conceptual sketches to the final candlelit reveal, our
              process is exhaustive, intentional, and deeply personal. We
              don't plan events; we architect atmospheres.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              With ateliers in New York, Los Angeles, Miami, and Florence,
              our global team of designers, producers, and logistical experts
              execute seamlessly across continents — ensuring that wherever
              your celebration takes place, it unfolds with flawless grace.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 bg-secondary/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
              Studio Principles
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Three values, held without exception.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {studioPrinciples.map((principle, i) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="border-t border-border pt-8"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  0{i + 1}
                </p>
                <h3 className="font-serif text-3xl mb-4">{principle.title}</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
              Our Ateliers
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Four houses, one standard.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ateliers.map((atelier, i) => (
              <motion.div
                key={atelier.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-t border-border pt-8"
              >
                <h3 className="font-serif text-3xl mb-3">{atelier.city}</h3>
                <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
                  {atelier.role}
                </p>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {atelier.address}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 border-t border-border text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-8 max-w-3xl mx-auto leading-tight">
          We would be honoured to design yours.
        </h2>
        <Link
          href="/inquiry"
          className="inline-block border border-foreground text-foreground text-xs uppercase tracking-widest px-10 py-4 hover:bg-foreground hover:text-background transition-colors duration-500"
        >
          Begin a Conversation
        </Link>
      </section>
    </div>
  );
}
