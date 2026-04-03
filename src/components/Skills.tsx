import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Database,
  Code,
  BarChart3,
  GitBranch,
  Terminal,
  FileSpreadsheet,
  LineChart,
  BookOpen,
  Bot,
  Sparkles,
  Command,
  MonitorSmartphone,
  Cpu,
  Heart,
  Monitor,
} from "lucide-react";

const skillGroups = [
  {
    category: "Data Analysis",
    skills: [
      { name: "SQL", icon: Database },
      { name: "MySQL", icon: Database },
      { name: "Excel", icon: FileSpreadsheet },
      { name: "Power Query", icon: FileSpreadsheet },
      { name: "DAX", icon: Code },
    ],
  },
  {
    category: "Visualization",
    skills: [
      { name: "Power BI", icon: BarChart3 },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "GitHub", icon: GitBranch },
      { name: "VS Code", icon: Terminal },
    ],
  },
  /* {
    category: "AI Tools",
    skills: [
      { name: "ChatGPT", icon: Bot },
      { name: "Claude", icon: Command },
      { name: "Gemini", icon: Sparkles },
      { name: "Lovable", icon: Heart },
      { name: "Cursor", icon: Monitor },
      { name: "Antigravity", icon: Monitor },
    ],
  }, */
];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="grid grid-cols-3 md:grid-cols-2 gap-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass-panel h-16 md:h-20 flex flex-col items-center justify-center gap-1 md:gap-2 hover-lift glow-border group cursor-default"
                  >
                    <skill.icon
                      size={isMobile ? 18 : 24}
                      className="text-primary dark:text-foreground group-hover:rotate-12 transition-transform"
                    />
                    <span className="text-[10px] md:text-xs font-medium text-center">{skill.name}</span>
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
