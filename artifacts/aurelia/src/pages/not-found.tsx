import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found — Aurelia & Co.";
  }, []);

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-background px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-xl"
      >
        <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6">
          404 — Page Not Found
        </div>
        <h1 className="font-serif text-5xl md:text-7xl mb-8 tracking-tight leading-none">
          A quiet
          <br />
          corner.
        </h1>
        <p className="text-foreground/65 text-base md:text-lg leading-relaxed mb-12">
          The page you were looking for has either moved or never existed.
          Let's find our way back to something more beautiful.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="bg-foreground text-background px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-primary transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/inquiry"
            className="text-[11px] uppercase tracking-[0.25em] text-foreground hover:text-primary transition-colors border-b border-foreground/30 hover:border-primary pb-1"
          >
            Begin an Inquiry
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
