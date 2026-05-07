import { Link } from "wouter";
import { motion } from "framer-motion";
import { portfolioProjects } from "@/lib/data";
import { scenes } from "@/lib/realPhotos";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={scenes.heroHome}
            alt="Cinematic luxury wedding"
            className="w-full h-full max-w-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 mt-20">
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-white/80 text-xs uppercase tracking-[0.3em] mb-6"
          >
            New York · Los Angeles · Miami · Florence
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-white font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8"
          >
            The Art of<br/>Celebration
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Link href="/inquiry" className="inline-block border border-white/50 text-white text-xs uppercase tracking-widest px-8 py-4 hover:bg-white hover:text-black transition-colors duration-200">
              Inquire Now
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
