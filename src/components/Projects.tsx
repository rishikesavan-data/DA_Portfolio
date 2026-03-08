import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";

const projects = [
  {
    title: "Sales Dashboard",
    description:
      "Interactive Power BI dashboard analyzing sales trends across regions with drill-down capabilities.",
    tech: ["Power BI", "SQL", "DAX"],
    github: "#",
    live: "#",
    dataset: "Kaggle Sales Dataset",
  },
  {
    title: "Customer Churn Prediction",
    description:
      "ML model predicting customer churn with 92% accuracy using Python and scikit-learn.",
    tech: ["Python", "Pandas", "Scikit-learn"],
    github: "#",
    live: "#",
    dataset: "Telco Customer Churn",
  },
  {
    title: "ETL Pipeline",
    description:
      "Automated data pipeline extracting, transforming, and loading data from multiple sources into a data warehouse.",
    tech: ["Python", "SQL", "Airflow"],
    github: "#",
    live: "#",
    dataset: "Internal Dataset",
  },
  {
    title: "COVID-19 Data Analysis",
    description:
      "Comprehensive analysis and visualization of global COVID-19 trends using Python and Tableau.",
    tech: ["Python", "Tableau", "Pandas"],
    github: "#",
    live: "#",
    dataset: "Johns Hopkins CSSE",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">
            My work
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              onClick={() => setSelected(i)}
              className="glass-panel p-8 cursor-pointer group hover-lift glow-border"
            >
              <div className="mb-5 h-40 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-background overflow-hidden flex items-center justify-center">
                <span className="text-lg font-semibold text-primary/90 text-center px-6 leading-snug">
                  {project.title}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.github}
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-foreground dark:text-foreground hover:text-foreground transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href={project.live}
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-foreground dark:text-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-6"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel p-10 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
            <h3 className="font-display text-2xl font-bold mb-4">
              {projects[selected].title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {projects[selected].description}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              <span className="font-medium text-foreground">Dataset:</span>{" "}
              {projects[selected].dataset}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {projects[selected].tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a
                href={projects[selected].github}
                className="px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover-lift flex items-center gap-2"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href={projects[selected].live}
                className="px-6 py-2.5 rounded-full glass-panel text-sm font-medium hover-lift flex items-center gap-2 text-foreground"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
