import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, X, ChevronUp, ChevronDown } from "lucide-react";

const projects = [
  {
    title: "Superstore Sales Performance Analysis",
    startDate: "Nov 2025",
    endDate: "Dec 2025",
    description:
      "Analyzed 9,994 retail orders using SQL & Power BI to uncover $2.3M in revenue and $286K in profit — while identifying $213K in avoidable losses driven by over-discounting, returns, and unprofitable products. Turned four years of raw sales data into clear business decisions.",
    tags: ["MySQL", "Excel", "Power BI", "DAX", "Power Query", "Data Cleaning", "Data Analysis", "EDA", "Data Visualization"],
    image: "/Image/Superstore Sales Performance Analysis Overview.png",
    hasGithub: true,
    github: "https://github.com/rishikesavan-data/Superstore-Sales-Perfomance-Analysis",
    hasLinkedin: true,
    linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7411401154628251648/?originTrackingId=nQl9ZQhPU0XW%2Fe5Gvz1z7w%3D%3D",
  },
  {
    title: "Telco Customer Churn Analysis",
    startDate: "Dec 2025",
    endDate: "Jan 2026",
    description:
      "Analyzed 7,000+ telecom customers using SQL & Power BI to uncover a 26.5% churn rate, ~$3M in lost revenue, and $225K at risk. Identified key churn drivers, including month-to-month contracts (42.7%) and electronic check payments (45.3%), to support smarter retention decisions.",
    tags: ["MySQL", "Excel", "Power BI", "DAX", "Power Query", "Data Cleaning", "Data Analysis", "EDA", "Data Visualization"],
    image: "/Image/Telco Customer Churn Analysis Overview Page.png",
    hasGithub: true,
    github: "https://github.com/rishikesavan-data/Telco-Customer-Churn-Analysis",
    hasLinkedin: true,
    linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7423417371018686464/?originTrackingId=jwv8MNitJdySpg1PGSHI3A%3D%3D",
  },
  {
    title: "Awesome Chocolates Dashboard",
    startDate: "Jun 2025",
    endDate: "Jul 2025",
    description:
      "(Guided Project) This Power BI dashboard analyzes the sales performance of a fictional brand, Awesome Chocolates, using data from a MySQL database. Built as part of my learning journey through Chandoo's Free Data Analyst course on YouTube.",
    tags: ["Power BI Desktop", "Power Query (for data cleaning)", "DAX (for custom KPIs)", "MySQL (connected as backend)"],
    image: "/Image/Awesome Chocolate Overview.png",
    hasGithub: true,
    github: "https://github.com/rishikesavan-data/awesome-chocolates-dashboard",
    hasLinkedin: false,
  },
  {
    title: "Vision Transformer for Autism Spectrum Disorder Classification",
    startDate: "Mar 2025",
    endDate: "May 2025",
    description:
      "This standalone Vision Transformer (ViT) was developed as part of a collaborative academic project to classify Autism Spectrum Disorder using fMRI data. While the broader team goal involved CMCL fusion and microbiome data, this repository focuses specifically on the independent neuroimaging pipeline. Built using an AI-augmented 'vibe coding' workflow, the project involved navigating a steep learning curve in PyTorch to process complex medical scans. Despite accuracy fluctuations between 65% and 80% due to data noise, the final module successfully demonstrates how self-attention can map global brain connectivity.",
    tags: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Hugging Face", "PyTorch", "Transformers", "Collaborative Research & Development"],
    image: "https://media.istockphoto.com/id/1292254104/photo/magnetic-resonance-imaging-mri-photosensitive-epilepsy-seizures-neurological-diseases.jpg?s=612x612&w=0&k=20&c=ODrUc4TJLgh1U9C-i1Q72y3bLEKyRNnflAIU1qWMnDU=",
    hasGithub: true,
    github: "https://github.com/rishikesavan-data/vit-asd-classifier",
    hasLinkedin: false,
  },
];

/** Returns true when viewport width < 768px (Tailwind's md breakpoint) */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  // 1 project per page on mobile, 2 on desktop
  const projectsPerPage = isMobile ? 1 : 2;

  const sortedProjects = [...projects].sort((a, b) => {
    const parseDate = (dateStr: string) => {
      if (dateStr === "Present") return new Date();
      return new Date(dateStr);
    };
    return parseDate(b.endDate).getTime() - parseDate(a.endDate).getTime();
  });

  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);

  const currentProjects = sortedProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setExpandedIndex(null);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setExpandedIndex(null);
    }
  };

  // Shared button style helper
  const navBtnClass = (disabled: boolean) =>
    `p-2 md:p-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition-all shadow-sm ${
      disabled
        ? "opacity-50 cursor-not-allowed text-muted-foreground"
        : "hover:bg-primary/10 hover:text-primary hover:border-primary/30 active:scale-95 shadow-lg shadow-primary/5"
    }`;

  // Page indicator
  const PageIndicator = () => (
    <div className={`flex items-center text-xs md:text-sm font-medium text-muted-foreground gap-1 ${isMobile ? "flex-row" : "flex-col"}`}>
      <span>{currentPage}</span>
      <div className={`${isMobile ? "w-2 h-px mx-1" : "w-4 h-px my-1"} bg-border`} />
      <span>{totalPages}</span>
    </div>
  );

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">
            My work
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* ── Mobile layout: arrows above/below ── */}
        {isMobile ? (
          <div className="flex flex-col items-center gap-4">
            {/* Top controls */}
            <div className="flex items-center gap-4">
              <button onClick={handlePrevPage} disabled={currentPage === 1} className={navBtnClass(currentPage === 1)}>
                <ChevronUp size={22} className="rotate-[-90deg] md:rotate-0" />
              </button>
              <PageIndicator />
              <button onClick={handleNextPage} disabled={currentPage === totalPages} className={navBtnClass(currentPage === totalPages)}>
                <ChevronDown size={22} className="rotate-[-90deg] md:rotate-0" />
              </button>
            </div>

            {/* Project card */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {currentProjects.map((project, i) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="glass-panel cursor-pointer group glow-border flex flex-col relative overflow-hidden"
                      onClick={() =>
                        setExpandedIndex(expandedIndex === i ? null : i)
                      }
                    >
                      {/* Image */}
                      <div className="rounded-t-xl bg-gradient-to-br from-primary/20 via-primary/5 to-background overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto block"
                        />
                      </div>

                      {/* Card info */}
                      <div className="p-4 flex justify-between items-start gap-3">
                        <h3 className="font-display text-base font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-xs font-medium text-primary shrink-0 bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {project.startDate} – {project.endDate}
                        </span>
                      </div>

                      {/* Tap hint */}
                      {expandedIndex !== i && (
                        <p className="text-xs text-muted-foreground px-4 pb-3">
                          Tap to view details
                        </p>
                      )}

                      {/* Description panel — slides up over the card */}
                      <AnimatePresence>
                        {expandedIndex === i && (
                          <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute inset-0 z-20 bg-background backdrop-blur-md p-5 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => setExpandedIndex(null)}
                              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground z-30 p-1 rounded-full hover:bg-muted/50 transition-colors"
                            >
                              <X size={18} />
                            </button>

                            <div className="overflow-y-auto flex-1 pr-1">
                              <h3 className="font-display text-lg font-bold mb-1 pr-6 leading-snug">
                                {project.title}
                              </h3>
                              <div className="inline-block bg-primary/10 text-primary text-[10px] font-medium px-2.5 py-0.5 rounded-full mb-4">
                                {project.startDate} – {project.endDate}
                              </div>

                              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                                {project.description}
                              </p>

                              <div className="mb-5">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                  Technologies Used
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {project.tags.map((t) => (
                                    <span
                                      key={t}
                                      className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/5"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex gap-3 pb-2">
                                {project.hasGithub && (
                                  <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover-lift"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Github size={13} /> GitHub
                                  </a>
                                )}
                                {project.hasLinkedin && (
                                  <a
                                    href={project.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-border/50 text-foreground text-xs font-semibold hover-lift"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Linkedin size={13} /> LinkedIn
                                  </a>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* ── Desktop layout: arrows on the side ── */
          <div className="relative flex items-center gap-8">
            <div className="flex-1 min-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {currentProjects.map((project, i) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      onMouseEnter={() => setExpandedIndex(i)}
                      onMouseLeave={() => setExpandedIndex(null)}
                      className="glass-panel p-8 cursor-pointer group hover-lift glow-border flex flex-col h-full relative overflow-hidden"
                    >
                      {/* Front Content */}
                      <div className="mb-5 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-background overflow-hidden relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500 block"
                        />
                      </div>
                      <div className="flex justify-between items-start mb-3 gap-4">
                        <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-xs font-medium text-primary shrink-0 bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {project.startDate} - {project.endDate}
                        </span>
                      </div>

                      {/* In-Place Description Panel */}
                      <AnimatePresence>
                        {expandedIndex === i && (
                          <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute inset-0 z-20 bg-background/95 backdrop-blur-md p-8 flex flex-col cursor-default"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => setExpandedIndex(null)}
                              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-30 p-1 rounded-full hover:bg-muted/50 transition-colors"
                            >
                              <X size={20} />
                            </button>

                            <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
                              <h3 className="font-display text-2xl font-bold mb-2 pr-8">
                                {project.title}
                              </h3>
                              <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-6">
                                {project.startDate} - {project.endDate}
                              </div>

                              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                                {project.description}
                              </p>

                              <div className="mb-8">
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                  Technologies Used
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {project.tags.map((t) => (
                                    <span
                                      key={t}
                                      className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/5"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex gap-4 pb-4">
                                {project.hasGithub && (
                                  <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover-lift"
                                  >
                                    <Github size={14} /> GitHub
                                  </a>
                                )}
                                {project.hasLinkedin && (
                                  <a
                                    href={project.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2 rounded-full glass-panel border-border/50 text-foreground text-xs font-semibold hover-lift"
                                  >
                                    <Linkedin size={14} /> LinkedIn
                                  </a>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Side Navigation Controls */}
            <div className="flex flex-col items-center gap-6 shrink-0 z-10 w-16 -translate-y-24">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={navBtnClass(currentPage === 1)}
              >
                <ChevronUp size={24} />
              </button>
              <PageIndicator />
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={navBtnClass(currentPage === totalPages)}
              >
                <ChevronDown size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
