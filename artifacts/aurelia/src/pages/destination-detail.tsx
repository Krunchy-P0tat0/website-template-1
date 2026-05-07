import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import {
  destinationContent,
  allDestinationContent,
} from "../lib/destinationContent";
import NotFound from "./not-found";

export default function DestinationDetail() {
  const [, params] = useRoute("/destinations/:slug");
  const slug = params?.slug;
  const dest = slug ? destinationContent[slug] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!dest) return <NotFound />;

  // Suggest two other destinations from the same region (excluding the
  // current one) so the gallery context stays coherent.
  const related = allDestinationContent
    .filter(
      (d) =>
        d.region === dest.region &&
        d.slug !== dest.slug &&
        d.type === dest.type,
    )
    .slice(0, 3);

  return (
    <div className="w-full bg-background">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          src={dest.hero}
          alt={dest.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/10 to-foreground/70" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 text-center text-background"
        >
          <Link
            href="/destinations"
            className="text-[10px] uppercase tracking-[0.3em] text-background/70 hover:text-background transition-colors mb-6"
          >
            ← All Destinations
          </Link>
          <div className="text-[11px] uppercase tracking-[0.3em] text-background/85 mb-4">
            {dest.type === "office" ? "Aurelia Office" : dest.region}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4 max-w-4xl">
            {dest.name}
          </h1>
          <div className="text-sm uppercase tracking-[0.25em] text-background/70">
            {dest.country}
          </div>
        </motion.div>
      </section>

      {/* Tagline + intro paragraphs */}
      <section className="container mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-14"
          >
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-5">
              In a phrase
            </div>
            <p className="font-serif italic text-3xl md:text-4xl leading-tight text-foreground">
              "{dest.tagline}"
            </p>
            <div className="w-12 h-px bg-foreground/25 mx-auto mt-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6"
          >
            {dest.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-foreground/80 leading-[1.85] text-base md:text-lg"
              >
                {p}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery — coherent archetype photos */}
      <section className="container mx-auto px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-14"
          >
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
              Stills from {dest.name}
            </div>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight">
              {dest.type === "office"
                ? "Events from this house"
                : "Events we have produced here"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {dest.gallery.map((src, i) => (
              <motion.div
                key={dest.slug + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative overflow-hidden bg-muted ${
                  i === 0 || i === 3
                    ? "aspect-[4/5] md:aspect-[5/6]"
                    : "aspect-[4/5] md:aspect-[4/5]"
                }`}
              >
                <img
                  src={src}
                  alt={`${dest.name} — event ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature venues / details */}
      {dest.signature && dest.signature.length > 0 && (
        <section className="bg-muted/40 py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-center mb-14"
              >
                <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
                  {dest.type === "office" ? "House Details" : "Where We Work"}
                </div>
                <h2 className="font-serif text-3xl md:text-5xl tracking-tight">
                  {dest.type === "office"
                    ? "Visit the house"
                    : "Signature venues"}
                </h2>
              </motion.div>

              <div className="space-y-2">
                {dest.signature.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-10 py-7 border-t border-border/50 last:border-b"
                  >
                    <div className="font-serif text-xl md:text-2xl tracking-tight text-foreground">
                      {s.label}
                    </div>
                    <div className="text-foreground/70 leading-relaxed text-base">
                      {s.detail}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats / season */}
      {(dest.notableEvents !== undefined || dest.season) && (
        <section className="container mx-auto px-6 md:px-12 py-20 md:py-24">
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {dest.notableEvents !== undefined && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <div className="font-serif text-5xl md:text-6xl text-foreground mb-2">
                  {dest.notableEvents}
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">
                  Events Produced Here
                </div>
              </motion.div>
            )}
            {dest.season && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="text-center"
              >
                <div className="font-serif text-xl md:text-2xl text-foreground mb-2 leading-snug px-2">
                  {dest.season}
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">
                  Best Season
                </div>
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="text-center"
            >
              <div className="font-serif text-xl md:text-2xl text-foreground mb-2 leading-snug">
                {dest.category}
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/55">
                {dest.type === "office" ? "Studio Type" : "Most Common Format"}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-foreground text-background py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6">
              Begin a Conversation
            </div>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight mb-8">
              Imagining a celebration in {dest.name}?
            </h2>
            <p className="text-background/75 leading-relaxed text-lg mb-12 max-w-xl mx-auto">
              We design no more than thirty events a year and accept new
              commissions on a quiet, considered basis. Tell us a little about
              the moment you have in mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inquiry"
                className="bg-background text-foreground px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-background transition-colors"
              >
                Inquire About {dest.name}
              </Link>
              <Link
                href="/portfolio"
                className="border border-background/40 px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
              >
                View Recent Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related destinations from the same region */}
      {related.length > 0 && (
        <section className="container mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center mb-14"
            >
              <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
                Nearby
              </div>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
                More from {dest.region}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((r, i) => (
                <motion.div
                  key={r.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                >
                  <Link
                    href={`/destinations/${r.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-4">
                      <img
                        src={r.hero}
                        alt={r.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
                      {r.category}
                    </div>
                    <div className="font-serif text-2xl md:text-3xl tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {r.name}
                    </div>
                    <div className="text-sm text-foreground/60 mt-1">
                      {r.country}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
