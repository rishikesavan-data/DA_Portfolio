import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Target, Zap } from "lucide-react";

const cards = [
  {
    icon: User,
    title: "Who I Am",
    description:
      "A passionate Data Analyst with a keen eye for patterns and a commitment to transforming raw data into meaningful business insights.",
  },
  {
    icon: Target,
    title: "What I Do",
    description:
      "I design data pipelines, build interactive dashboards, and create analytical models that drive data-informed decision making.",
  },
  {
    icon: Zap,
    title: "What I Focus On",
    description:
      "End-to-end analytics — from data extraction and cleaning to visualization and storytelling that resonates with stakeholders.",
  },
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">
            Get to know me
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * i }}
              className="glass-panel p-8 hover-lift glow-border group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <card.icon size={22} className="text-primary dark:text-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
