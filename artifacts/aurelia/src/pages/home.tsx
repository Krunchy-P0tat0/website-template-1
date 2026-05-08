import { Link } from "wouter";
import { motion } from "framer-motion";
import { portfolioProjects } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative h-[85vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Video background with image fallback */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={scenes.heroHome}
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          {/* Fallback image shown while video loads or if unsupported */}
          <img
            src={scenes.heroHome}
            alt="Cinematic luxury wedding"
            className="absolute inset-0 w-full h-full object-cover object-center -z-10"
            loading="eager"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/35" />
          {/* Gradient: dark at bottom for text separation from page */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-black/10" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center gap-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-[10px] uppercase tracking-[0.45em]"
          >
            New York &nbsp;·&nbsp; Los Angeles &nbsp;·&nbsp; Miami &nbsp;·&nbsp; Florence
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-white font-serif text-[clamp(2.8rem,8vw,6.5rem)] leading-[1.04] tracking-[-0.01em]"
          >
            The Art of<br />Celebration
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-px h-10 bg-white/25" />
            <Link
              href="/inquiry"
              className="group relative inline-flex items-center gap-3 border border-white/30 text-white/90 text-[10px] uppercase tracking-[0.3em] px-12 py-[14px] overflow-hidden transition-colors duration-300 hover:border-white/70 hover:text-white"
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/8 transition-colors duration-300" />
              <span className="relative">Inquire Now</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-32 px-6 md:px-12 bg-background text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-serif text-3xl md:text-5xl leading-tight mb-8"
          >
            We design impossibly beautiful celebrations for discerning clients worldwide.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-foreground/70 leading-relaxed mb-12"
          >
            Aurelia & Co. is a globally-renowned design and production house. We approach every event with the precision of a couture atelier and the vision of a cinematic director. From Lake Como to Aspen, we craft experiences that are unapologetically luxurious, yet intimately personal.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link href="/about" className="text-xs uppercase tracking-widest font-semibold hover:text-primary transition-colors pb-1 border-b border-foreground/20 hover:border-primary">
              Discover Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-24 bg-secondary/30 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Weddings", img: scenes.weddingsService, href: "/weddings" },
              { title: "Corporate", img: scenes.corporateService, href: "/corporate" },
              { title: "Private Events", img: scenes.privateService, href: "/private-events" }
            ].map((service, i) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group cursor-pointer block"
              >
                <Link href={service.href}>
                  <div className="overflow-hidden aspect-[3/4] mb-6">
                    <img 
                      src={service.img} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="font-serif text-2xl mb-2">{service.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-foreground/50 group-hover:text-primary transition-colors duration-200">Explore</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Work */}
      <section className="py-32 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-serif text-4xl md:text-5xl">Signature Work</h2>
            <Link href="/portfolio" className="hidden md:inline-block text-xs uppercase tracking-widest hover:text-primary transition-colors duration-200 pb-1 border-b border-foreground/20">
              View Full Portfolio
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {portfolioProjects.slice(0, 2).map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`group ${i === 1 ? 'md:mt-24' : ''}`}
              >
                <Link href={`/portfolio/${project.slug}`}>
                  <div className="overflow-hidden aspect-square mb-6">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-2xl mb-1">{project.title}</h3>
                      <p className="text-sm text-foreground/60">{project.destination}</p>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-foreground/50">{project.category}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
