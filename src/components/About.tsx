import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Target, Zap } from "lucide-react";

const cards = [
  {
    icon: User,
    title: "Who I Am",
    description:
      "I’m a Data Analyst with a background in Information Technology who enjoys working with data to understand patterns and extract useful insights from datasets.",
  },
  {
    icon: Target,
    title: "What I Do",
    description:
      "I use SQL, MySQL, Excel, and Power Query to clean, explore, and analyze datasets. I build DAX measures and KPI dashboards in Power BI to present insights clearly and support business decision making.",
  },
  {
    icon: Zap,
    title: "What I Focus On",
    description:
      "I focus on practical data analysis — preparing datasets, exploring data to identify patterns, and building dashboards that clearly present the results of the analysis.",
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

        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 w-full text-center glass-panel p-6 glow-border"
        >
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            ⚡ <span className="font-semibold text-foreground text-base">AI-Augmented Workflow</span> — I actively use AI tools to accelerate my analytics process: query optimization, faster debugging, smarter documentation, and sharper problem framing. Less time on repetition. More time on thinking.
          </p>
        </motion.div> */}
      </div>
    </section>
  );
};

export default About;
