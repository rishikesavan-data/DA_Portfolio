import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Database,
  Code,
  BarChart3,
  GitBranch,
  Terminal,
  FileSpreadsheet,
  LineChart,
  BookOpen,
} from "lucide-react";

const skillGroups = [
  {
    category: "Data Analysis",
    skills: [
      { name: "SQL", icon: Database },
      { name: "Python", icon: Code },
      { name: "Excel", icon: FileSpreadsheet },
      { name: "Pandas", icon: Terminal },
      { name: "NumPy", icon: Terminal },
    ],
  },
  {
    category: "Visualization",
    skills: [
      { name: "Power BI", icon: BarChart3 },
      { name: "Matplotlib", icon: LineChart },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: GitBranch },
      { name: "Jupyter", icon: BookOpen },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">
            My toolkit
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * gi }}
            >
              <h3 className="font-display text-lg font-semibold mb-5 text-muted-foreground">
                {group.category}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass-panel p-4 flex items-center gap-3 hover-lift glow-border group cursor-default"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <skill.icon
                        size={18}
                        className="text-primary group-hover:rotate-12 transition-transform"
                      />
                    </div>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
