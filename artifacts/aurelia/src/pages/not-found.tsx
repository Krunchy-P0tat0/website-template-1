import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found — Aurelia & Co.";
  }, []);

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-[#F3F3F3] px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-xl"
      >
        <p className="cc-eyebrow mb-6">404 — Page Not Found</p>
        <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-light text-[#333333] mb-8 leading-none">
          A quiet<br />corner.
        </h1>
        <p className="text-[#333333]/60 text-base leading-relaxed mb-12 font-light">
          The page you were looking for has either moved or never existed.
          Let's find our way back to something more beautiful.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link href="/" className="inline-block bg-[#333333] text-white px-10 py-4 text-[10px] uppercase tracking-[0.25em] hover:bg-[#003D68] transition-colors">
            Return Home
          </Link>
          <Link href="/inquiry" className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/60 border-b border-[#333333]/20 pb-1 hover:text-[#333333] transition-colors">
            Begin an Inquiry
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
