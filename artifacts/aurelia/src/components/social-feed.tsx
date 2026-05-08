import { motion } from "framer-motion";
import { INSTAGRAM_URL, socialPosts } from "@/lib/socialFeed";

export default function SocialFeed() {
  return (
    <section className="py-32 px-6 md:px-12 bg-background border-t border-border">
      <div className="container mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              On Instagram
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Moments from the atelier.
            </h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-foreground/50 hover:text-primary transition-colors duration-200 pb-1 border-b border-foreground/20 hover:border-primary self-start md:self-auto shrink-0"
          >
            Follow @aureliaandco
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {socialPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative aspect-square overflow-hidden bg-secondary/30 block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-5">
                <p className="text-white text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                  {post.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors duration-200"
          >
            View more on Instagram
          </a>
        </motion.div>

      </div>
    </section>
  );
}
