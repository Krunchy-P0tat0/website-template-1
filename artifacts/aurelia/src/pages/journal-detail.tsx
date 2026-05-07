import { useParams } from "wouter";
import { journalPosts } from "@/lib/data";
import { motion } from "framer-motion";

export default function JournalDetail() {
  const { slug } = useParams();
  const post = journalPosts.find(p => p.slug === slug);

  if (!post) return <div className="pt-32 text-center">Post not found</div>;

  return (
    <div className="w-full bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-widest text-foreground/50 mb-6">
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">{post.title}</h1>
        </motion.div>

        <img src={post.image} alt={post.title} className="w-full h-[60vh] object-cover mb-16 max-w-5xl mx-auto" />

        <div className="max-w-2xl mx-auto prose prose-lg dark:prose-invert">
          <p className="text-xl leading-relaxed text-foreground/80 font-serif italic mb-8">
            {post.excerpt}
          </p>
          <p className="text-foreground/70 leading-relaxed mb-6">
            {post.content}
          </p>
          <p className="text-foreground/70 leading-relaxed">
            More content would go here, exploring the intricate details and design philosophy 
            that went into the creation of this specific element or event.
          </p>
        </div>
      </div>
    </div>
  );
}