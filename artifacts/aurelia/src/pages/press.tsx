import { motion } from "framer-motion";
import { pressFeatures, pressQuotes } from "@/lib/data";

export default function Press() {
  return (
    <div className="w-full bg-background pt-32 pb-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
            Press & Recognition
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
            Selected mentions, interviews, and accolades.
          </h1>
          <p className="text-foreground/70 leading-relaxed">
            For press inquiries, please contact our communications office at{" "}
            <a
              href="mailto:press@aureliaco.com"
              className="text-primary hover:underline"
            >
              press@aureliaco.com
            </a>
            .
          </p>
        </motion.div>

        <section className="mb-32">
          <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center">
            Featured In
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 items-center">
            {pressFeatures.map((feature) => (
              <motion.div
                key={feature.publication}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <p className="font-serif text-2xl md:text-3xl text-foreground/70">
                  {feature.publication}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {pressFeatures.map((feature, i) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                className="border-t border-border pt-8 group"
              >
                <div className="flex items-center justify-between mb-4 text-xs uppercase tracking-[0.25em] text-foreground/50">
                  <span>{feature.publication}</span>
                  <span>{feature.date}</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl mb-4 leading-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.excerpt}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pressQuotes.map((quote, i) => (
              <motion.div
                key={quote.source}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="border border-border p-12 text-center hover:border-primary transition-colors"
              >
                <p className="font-serif text-2xl italic text-foreground/80 mb-8 leading-relaxed">
                  "{quote.text}"
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  {quote.source}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
