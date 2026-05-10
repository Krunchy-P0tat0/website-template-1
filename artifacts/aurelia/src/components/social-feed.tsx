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
    <section aria-labelledby="social-feed-heading" className="py-20 px-6 md:px-12 border-t border-black/8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <p className="cc-eyebrow mb-4">On Instagram</p>
            <h2 id="social-feed-heading" className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-[#333333]">
              Moments from the atelier.
            </h2>
          </div>
          <a
            href={INSTAGRAM_CONFIG.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/50 border-b border-[#333333]/20 pb-1 hover:text-[#333333] hover:border-[#333333]/50 transition-colors self-start md:self-auto shrink-0"
          >
            Follow {INSTAGRAM_CONFIG.handle}
          </a>
        </motion.div>

        <div role="list" aria-label="Instagram feed" className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {posts.map((post, i) => (
            <motion.a
              key={post.id}
              role="listitem"
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${post.alt} — view on Instagram`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden bg-[#e8e8e8] block"
            >
              <div className="absolute inset-0">
                <img
                  src={post.image}
                  alt={post.alt}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
              <div aria-hidden className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-5">
                <p className="text-white text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                  {post.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          <a
            href={INSTAGRAM_CONFIG.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/40 hover:text-[#333333] transition-colors"
          >
            View more on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
