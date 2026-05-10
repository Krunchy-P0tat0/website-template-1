import { useParams } from "wouter";
import { journalPosts } from "@/lib/data";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function JournalDetail() {
  const { slug } = useParams();
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) return (
    <div className="pt-36 text-center text-[#333333]/60 font-light">Post not found</div>
  );

  return (
    <div className="w-full bg-white pt-36 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/45">{post.category}</span>
            <span className="text-[#333333]/25">·</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/45">{post.date}</span>
          </div>
          <h1 className="font-serif text-[clamp(2rem,5vw,4rem)] font-light text-[#333333] leading-[1.1]">{post.title}</h1>
        </motion.div>

        <img src={post.image} alt={post.title} className="w-full h-[60vh] object-cover mb-16 max-w-5xl mx-auto" />

        <div className="max-w-2xl mx-auto">
          <p className="font-serif text-xl italic text-[#333333]/70 mb-8 leading-relaxed">{post.excerpt}</p>
          <p className="text-[#333333]/65 leading-relaxed mb-6 font-light">{post.content}</p>
          <p className="text-[#333333]/65 leading-relaxed font-light">
            More content would go here, exploring the intricate details and design philosophy that went into the creation of this specific element or event.
          </p>
        </div>

        <div className="border-t border-black/10 pt-10 text-center mt-16">
          <Link href="/journal" className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/50 border-b border-[#333333]/20 pb-1 hover:text-[#333333] transition-colors">
            ← Back to the Journal
          </Link>
        </div>
      </div>
    </div>
  );
}
