import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { INSTAGRAM_CONFIG } from "@/lib/config";
import { fetchInstagramFeed, PLACEHOLDER_POSTS, type SocialPost } from "@/lib/socialFeed";

export default function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>(PLACEHOLDER_POSTS);

  useEffect(() => {
    fetchInstagramFeed().then(setPosts);
  }, []);

  return (
    <section
      aria-labelledby="social-feed-heading"
      className="py-32 px-6 md:px-12 bg-background border-t border-border"
    >
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
            <h2
              id="social-feed-heading"
              className="font-serif text-4xl md:text-5xl leading-tight"
            >
              Moments from the atelier.
            </h2>
          </div>
          <a
            href={INSTAGRAM_CONFIG.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow Aurelia & Co. on Instagram (opens in new tab)`}
            className="text-xs uppercase tracking-widest text-foreground/50 hover:text-primary transition-colors duration-200 pb-1 border-b border-foreground/20 hover:border-primary self-start md:self-auto shrink-0"
          >
            Follow {INSTAGRAM_CONFIG.handle}
          </a>
        </motion.div>

        {/* Grid */}
        <div
          role="list"
          aria-label="Instagram feed"
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {posts.map((post, i) => (
            <motion.a
              key={post.id}
              role="listitem"
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${post.alt} — view on Instagram (opens in new tab)`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative aspect-square overflow-hidden bg-secondary/30 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              {/* Sized container prevents layout shift */}
              <div className="absolute inset-0">
                <img
                  src={post.image}
                  alt={post.alt}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>

              {/* Caption overlay — hidden until hover/focus */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-5"
              >
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
            href={INSTAGRAM_CONFIG.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View more posts on Instagram (opens in new tab)"
            className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors duration-200"
          >
            View more on Instagram
          </a>
        </motion.div>

      </div>
    </section>
  );
}
