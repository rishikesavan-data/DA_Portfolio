import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useState, useEffect } from "react";

const RadarPulse = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <svg
          key={i}
          className={`absolute animate-radar
            ${i % 2 === 0 ? 'text-indigo-600 dark:text-blue-500' : 'text-purple-600 dark:text-purple-500'}
          `}
          style={{
            width: '120vmax',
            height: '120vmax',
            animationDelay: `-${i * 4}s`,
          }}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="49"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ))}
    </div>
  );
};

const useTypingEffect = (text: string, speed = 80, delay = 400) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return { displayed, done };
};

const Hero = () => {
  const { displayed, done } = useTypingEffect("Hi, I'm Rishi", 70, 600);
  return (
    <section className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden">
      <RadarPulse />

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
          {displayed.includes("Rishi") ? (
            <>
              {displayed.slice(0, displayed.indexOf("Rishi"))}
              <span className="gradient-text">{displayed.slice(displayed.indexOf("Rishi"))}</span>
            </>
          ) : (
            displayed
          )}
          {!done && <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 animate-pulse align-middle" />}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Data Analyst — turning complex data into actionable insights
          with SQL, Excel and Power BI.
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
            href="/Resume/Rishi Kesavan_Data_Analyst_Resume.pdf"
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
          <a href="#about" className="text-muted-foreground dark:text-foreground animate-float block">
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
