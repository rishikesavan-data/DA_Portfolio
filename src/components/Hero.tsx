import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import HeroCanvas from "./HeroCanvas";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient blobs */}
      <div className="gradient-blob w-[500px] h-[500px] bg-primary/20 top-[-100px] left-[-100px]" />
      <div className="gradient-blob w-[400px] h-[400px] bg-accent/20 bottom-[-50px] right-[-50px]" />

      <HeroCanvas />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base font-medium tracking-widest uppercase text-muted-foreground mb-4"
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          Hi, I'm{" "}
          <span className="gradient-text">Rishi</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Data Analyst & Data Engineer — turning complex data into actionable insights
          with SQL, Python, and Power BI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full bg-foreground text-background font-medium text-sm hover-lift transition-all"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3.5 rounded-full glass-panel font-medium text-sm hover-lift flex items-center gap-2 text-foreground"
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="text-muted-foreground animate-float block">
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
