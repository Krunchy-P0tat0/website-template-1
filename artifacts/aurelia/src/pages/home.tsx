import { Link } from "wouter";
import { motion } from "framer-motion";
import { portfolioProjects } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";
import SocialFeed from "@/components/social-feed";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const services = [
  { title: "Weddings", img: scenes.weddingsService, href: "/weddings" },
  { title: "Corporate Events", img: scenes.corporateService, href: "/corporate" },
  { title: "Private Events", img: scenes.privateService, href: "/private-events" },
];

export default function Home() {
  return (
    <div className="w-full bg-[#F3F3F3]">

      {/* ── HERO ── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay muted loop playsInline
            poster={scenes.heroHome}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <img
            src={scenes.heroHome}
            alt="Luxury event"
            className="absolute inset-0 w-full h-full object-cover -z-10"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Centered text — CC style */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-white/55 text-[10px] uppercase tracking-[0.35em] mb-8"
          >
            New York &nbsp;·&nbsp; Los Angeles &nbsp;·&nbsp; Miami &nbsp;·&nbsp; Florence
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-white text-[clamp(3rem,9vw,7rem)] leading-[1.05] font-light mb-10"
          >
            Creating Bespoke<br />Experiences Worldwide
          </motion.h1>

          {/* CC-style pipe-separated links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-0 flex-wrap justify-center"
          >
            {[
              { label: "Weddings", href: "/weddings" },
              { label: "Corporate Events", href: "/corporate" },
              { label: "Milestone Events", href: "/private-events" },
              { label: "Destinations", href: "/destinations" },
            ].map((link, i, arr) => (
              <span key={link.label} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-white/80 text-[11px] uppercase tracking-[0.22em] hover:text-white transition-colors px-4 py-1"
                >
                  {link.label}
                </Link>
                {i < arr.length - 1 && <span className="text-white/30 text-sm">|</span>}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10"
          >
            <Link
              href="/inquiry"
              className="inline-block border border-white/40 text-white text-[10px] uppercase tracking-[0.28em] px-10 py-4 hover:bg-white hover:text-[#333333] transition-all duration-300"
            >
              Submit an Inquiry
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO / BRAND STORY ── */}
      <section className="py-28 px-6 md:px-12 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <motion.p {...fadeUp(0)} className="cc-eyebrow mb-6">
            40 Years of Extraordinary
          </motion.p>
          <motion.h2 {...fadeUp(0.08)} className="font-serif text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.2] font-light text-[#333333] mb-8">
            Design, Planning and Production<br />for the World's Most Discerning Clients
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="text-[#333333]/65 text-base leading-relaxed font-light mb-10 max-w-xl mx-auto">
            Aurelia & Co. is a globally-renowned design and production house. We approach every event with the precision of a couture atelier and the vision of a cinematic director — crafting experiences that are unapologetically luxurious, yet intimately personal.
          </motion.p>
          <motion.div {...fadeUp(0.22)}>
            <Link
              href="/about"
              className="text-[11px] uppercase tracking-[0.22em] text-[#333333] border-b border-[#333333]/30 pb-1 hover:border-[#333333] transition-colors"
            >
              Discover Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES TRIO ── */}
      <section className="py-20 px-6 md:px-12 bg-[#F3F3F3]">
        <div className="max-w-6xl mx-auto">
          <motion.p {...fadeUp(0)} className="cc-eyebrow text-center mb-14">
            Our Services
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} {...fadeUp(i * 0.1)} className="group">
                <Link href={s.href}>
                  <div className="overflow-hidden aspect-[3/4] mb-5">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="font-serif text-[#333333] text-xl mb-1">{s.title}</p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#333333]/45 group-hover:text-[#003D68] transition-colors">
                    Explore →
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-14">
            <motion.div {...fadeUp(0)}>
              <p className="cc-eyebrow mb-3">Our Latest Work</p>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-[#333333]">
                Signature Portfolio
              </h2>
            </motion.div>
            <Link
              href="/portfolio"
              className="hidden md:inline-block text-[10px] uppercase tracking-[0.22em] text-[#333333]/60 border-b border-[#333333]/20 pb-1 hover:text-[#333333] hover:border-[#333333]/50 transition-colors"
            >
              View All Projects
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {portfolioProjects.slice(0, 2).map((p, i) => (
              <motion.div
                key={p.id}
                {...fadeUp(i * 0.1)}
                className={`group ${i === 1 ? "md:mt-20" : ""}`}
              >
                <Link href={`/portfolio/${p.slug}`}>
                  <div className="overflow-hidden aspect-[4/5] mb-5">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-[#333333] text-xl mb-1">{p.title}</h3>
                      <p className="text-sm text-[#333333]/55 font-light">{p.destination}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#333333]/40 mt-1">
                      {p.category}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS / VOGUE BADGE ── */}
      <section className="py-16 bg-[#F3F3F3] border-t border-b border-black/8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
          <motion.p {...fadeUp(0)} className="font-serif text-[clamp(1.3rem,3vw,2rem)] text-[#333333] italic font-light">
            "The World's Premier Luxury Event Design Studio"
          </motion.p>
          <div className="w-px h-12 bg-black/15 hidden md:block" />
          <motion.div {...fadeUp(0.08)}>
            <p className="cc-eyebrow text-[#333333]/60">As featured in</p>
            <p className="font-serif text-[#333333] text-lg tracking-widest mt-1">VOGUE · TATLER · TOWN & COUNTRY</p>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL FEED ── */}
      <div className="bg-white">
        <SocialFeed />
      </div>

      {/* ── INQUIRY CTA ── */}
      <section className="py-28 px-6 bg-[#003D68] text-white text-center">
        <motion.p {...fadeUp(0)} className="cc-eyebrow text-white/50 mb-6">
          Begin Your Journey
        </motion.p>
        <motion.h2 {...fadeUp(0.08)} className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light mb-6">
          Tell Us About Your Vision
        </motion.h2>
        <motion.p {...fadeUp(0.15)} className="text-white/60 text-sm font-light max-w-md mx-auto mb-10 leading-relaxed">
          To send us an inquiry about your special occasion, please submit your information below. A member of our team will be in touch to learn more.
        </motion.p>
        <motion.div {...fadeUp(0.22)}>
          <Link
            href="/inquiry"
            className="inline-block border border-white/40 text-white text-[10px] uppercase tracking-[0.28em] px-12 py-4 hover:bg-white hover:text-[#003D68] transition-all duration-300"
          >
            Submit an Inquiry
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
