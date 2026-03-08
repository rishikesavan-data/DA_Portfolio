import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    title: "Building Scalable ETL Pipelines with Python",
    summary:
      "A deep dive into designing efficient data pipelines that handle millions of records with grace.",
    link: "#",
  },
  {
    title: "SQL Window Functions Demystified",
    summary:
      "Understanding ROW_NUMBER, RANK, and LEAD/LAG with real-world analytical examples.",
    link: "#",
  },
  {
    title: "Power BI Best Practices for Enterprise",
    summary:
      "Optimizing DAX queries and data models for performance at scale.",
    link: "#",
  },
];

const Articles = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="articles" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">
            Technical writing
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Featured <span className="gradient-text">Articles</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.a
              key={article.title}
              href={article.link}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="glass-panel p-8 group hover-lift glow-border block"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display text-lg font-semibold group-hover:text-primary transition-colors pr-4">
                  {article.title}
                </h3>
                <ArrowUpRight
                  size={18}
                  className="text-foreground group-hover:text-primary transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flex-shrink-0 mt-1"
                />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {article.summary}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
