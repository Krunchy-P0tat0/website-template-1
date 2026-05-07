import { Link } from "wouter";
import { motion } from "framer-motion";
import { journalPosts } from "@/lib/data";

export default function Journal() {
  return (
    <div className="w-full bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">
            The Journal
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
            Notes from the atelier.
          </h1>
          <p className="text-foreground/70 leading-relaxed">
            Field reports, design dispatches, and quiet observations from our
            ateliers in New York, Los Angeles, Miami, and Florence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {journalPosts.map((post, i) => (
            <motion.div 
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group"
            >
              <Link href={`/journal/${post.slug}`}>
                <div className="overflow-hidden aspect-[16/10] mb-6">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                </div>
                <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-foreground/50 mb-3">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
                <h2 className="font-serif text-3xl mb-3 group-hover:text-primary transition-colors duration-200">{post.title}</h2>
                <p className="text-foreground/70">{post.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
