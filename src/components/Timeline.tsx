import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const timeline = [
  {
    date: "Jan 2026",
    category: "Certification",
    title: "Data Analytics Virtual Internship",
    issuedBy: "Deloitte",
    description: [
      "Completed a Deloitte job simulation involving data analysis and forensic technology",
      "Created a data dashboard using Tableau",
      "Used Excel to classify data and draw business conclusions",
    ],
    skills: [
      "Data Analysis",
      "Excel",
      "Presentation",
      "Business Insight",
    ],
  },
  {

    date: "Dec 2025 - Jan 2026",
    category: "Project",
    title: "Telco Customer Churn Analysis",
    issuedBy: "Self-Based",
    description:
      "Analyzed 7,000+ telecom customers using SQL & Power BI to uncover a 26.5% churn rate, ~$3M in lost revenue, and $225K at risk. Identified key churn drivers, including month-to-month contracts (42.7%) and electronic check payments (45.3%), to support smarter retention decisions.",
    skills: ["MySQL", "Excel", "Power BI", "DAX", "Power Query", "Data Cleaning", "Data Analysis", "EDA", "Data Visualization"],
  },
  {

    date: "Nov 2025 - Dec 2025",
    category: "Project",
    title: "Superstore Sales Performance Analysis",
    issuedBy: "Self-Based",
    description:
      "Analyzed 9,994 retail orders using SQL & Power BI to uncover $2.3M in revenue and $286K in profit — while identifying $213K in avoidable losses driven by over-discounting, returns, and unprofitable products. Turned four years of raw sales data into clear business decisions.",
    skills: ["MySQL", "Excel", "Power BI", "DAX", "Power Query", "Data Cleaning", "Data Analysis", "EDA", "Data Visualization"],
  },
  {

    date: "Nov 2021 - Sept 2025",
    category: "Education",
    title: "Bachelor of Technology in Information Technology",
    issuedBy: "Misrimal Navajee Munoth Jain Engineering College (Affiliated to Anna University)",
    description: [
      "Completed a structured undergraduate curriculum covering core computer science and information technology subjects.",
      "The program emphasized theoretical understanding and academic assessments aligned with university standards."],
    //skills: ["Power BI", "Data Visualization"],
  },
  {
    date: "Aug 2024 - Sept 2024",
    category: "Certification",
    title: "Data Analytics Course",
    issuedBy: "Infosys & ICT Academy",
    description:
      "Learnt the key steps of taking raw data, cleaning it, analysing it, and sharing dashboards with Power BI service.",
    skills: ["Power BI", "Data Visualization"],
  },
  {
    date: "Jul 2023",
    category: "Certification",
    title: "Introduction to Web Development",
    issuedBy: "Coursera",
    description:
      "Got comfortable building simple web pages and understanding how the front-end works. Developed basic static websites and improved comfort with front-end fundamentals.",
    skills: ["HTML", "CSS", "Web Concepts"],
  },
  {
    date: "Jul 2021",
    category: "Education",
    title: "Senior Secondary Education (Class 12)",
    issuedBy: "Sri Vidya Mandir Senior Secondary School (CBSE)",
    description:
      "Completed Senior Secondary Education under the Central Board of Secondary Education (CBSE) curriculum.",
    //skills: ["HTML", "CSS", "Web Concepts"],
  },
];

const Timeline = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Reverse chronological order (newest date first)
  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const ITEMS_PER_PAGE = 3;
  const pages = [];
  for (let i = 0; i < sortedTimeline.length; i += ITEMS_PER_PAGE) {
    pages.push(sortedTimeline.slice(i, i + ITEMS_PER_PAGE));
  }

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const getGradientColor = (index: number, total: number) => {
    if (total <= 1) return '#3b82f6';
    const ratio = index / (total - 1);
    const colors = [
      { r: 59, g: 130, b: 246 },   // blue-500
      { r: 139, g: 92, b: 246 },   // violet-500
      { r: 244, g: 63, b: 94 },    // rose-500
      { r: 251, g: 146, b: 60 }    // orange-400
    ];
    const step = 1 / (colors.length - 1);
    const i = Math.floor(ratio / step);
    if (i >= colors.length - 1) return `rgb(${colors[colors.length - 1].r}, ${colors[colors.length - 1].g}, ${colors[colors.length - 1].b})`;

    const c1 = colors[i];
    const c2 = colors[i + 1];
    const localRatio = (ratio - i * step) / step;

    const r = Math.round(c1.r + (c2.r - c1.r) * localRatio);
    const g = Math.round(c1.g + (c2.g - c1.g) * localRatio);
    const b = Math.round(c1.b + (c2.b - c1.b) * localRatio);

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <section id="timeline" className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">
            Journey So Far
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Education & <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="flex items-center gap-4 md:gap-8 relative">

          {/* Fixed Scroll Window */}
          <div className="flex-1 h-[480px] md:h-[550px] relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_2%,black_98%,transparent)]">

            <motion.div
              className="w-full relative flex flex-col pt-4"
              style={{ height: `${pages.length * 100}%` }}
              animate={{ y: `-${(currentPage / pages.length) * 100}%` }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }} // smooth ease out
            >
              {/* Central vertical line spans all pages */}
              <div
                className="absolute left-1/2 top-4 bottom-4 w-1 transform -translate-x-1/2 z-0"
                style={{ backgroundImage: "linear-gradient(to bottom, #3b82f6, #8b5cf6, #f43f5e, #fb923c)" }}
              />

              {pages.map((page, pageIndex) => (
                <div key={pageIndex} className="w-full h-full flex flex-col justify-evenly relative z-10 py-2">
                  {page.map((item, localIndex) => {
                    const globalIndex = pageIndex * ITEMS_PER_PAGE + localIndex;
                    const isLeft = globalIndex % 2 === 0;
                    const circleColorHex = getGradientColor(globalIndex, sortedTimeline.length);

                    return (
                      <div
                        key={`${item.category}-${item.date}-${globalIndex}`}
                        className="relative w-full mb-6 md:mb-10 group"
                      >
                        <div className="flex items-center">
                          {/* Left side */}
                          <div className={`w-1/2 ${isLeft ? "pr-6 md:pr-10" : "pl-6 md:pl-10"}`}>
                            {isLeft && (
                              <div className="text-right flex justify-end">
                                <div
                                  className="inline-block"
                                  onMouseEnter={() => setHoveredIndex(globalIndex)}
                                  onMouseLeave={() => setHoveredIndex(null)}
                                >
                                  <p className="text-xs font-medium text-muted-foreground mb-2">
                                    {item.category}
                                  </p>
                                  <h3 className="text-sm md:text-base font-semibold text-foreground leading-snug max-w-xs ml-auto">
                                    {item.title}
                                  </h3>
                                  <p className="text-sm font-medium text-blue-500 mt-1">
                                    {item.issuedBy}
                                  </p>
                                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                                    {item.date}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Center circle */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                            <div
                              className="w-5 h-5 rounded-full border-4 border-background shadow-md transition-all duration-200 cursor-pointer relative z-20 group-hover:scale-125 hover:scale-125"
                              style={{ backgroundColor: circleColorHex }}
                              onMouseEnter={() => setHoveredIndex(globalIndex)}
                              onMouseLeave={() => setHoveredIndex(null)}
                            />
                          </div>

                          {/* Right side */}
                          <div className={`w-1/2 ${!isLeft ? "pl-6 md:pl-10" : "pr-6 md:pr-10"}`}>
                            {!isLeft && (
                              <div
                                className="text-left inline-block"
                                onMouseEnter={() => setHoveredIndex(globalIndex)}
                                onMouseLeave={() => setHoveredIndex(null)}
                              >
                                <p className="text-xs font-medium text-muted-foreground mb-2">
                                  {item.category}
                                </p>
                                <h3 className="text-sm md:text-base font-semibold text-foreground leading-snug max-w-xs">
                                  {item.title}
                                </h3>
                                <p className="text-sm font-medium text-blue-500 mt-1">
                                  {item.issuedBy}
                                </p>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                                  {item.date}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Hover tooltip */}
                        <AnimatePresence>
                          {hoveredIndex === globalIndex && (
                            <motion.div
                              initial={{ opacity: 0, y: localIndex === 0 ? -10 : localIndex === 2 ? 10 : 0 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: localIndex === 0 ? -10 : localIndex === 2 ? 10 : 0 }}
                              transition={{ duration: 0.2 }}
                              className={`absolute ${isLeft ? 'right-0 md:right-auto md:left-1/2 md:translate-x-8' : 'left-0 md:left-auto md:right-1/2 md:-translate-x-8'} ${localIndex === 0 ? 'top-10' : localIndex === 2 ? 'bottom-10' : 'top-1/2 -translate-y-1/2'} w-[calc(100vw-4rem)] md:w-96 max-w-[360px] z-50 bg-background border border-border/60 rounded-xl shadow-2xl p-4 md:p-5 pointer-events-none`}
                            >
                              <div className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                                {Array.isArray(item.description) ? (
                                  <ul className="list-disc pl-4 space-y-1">
                                    {item.description.map((desc, i) => (
                                      <li key={i}>{desc.replace(/^\*\s*/, '')}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p>{item.description}</p>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {(item.skills || []).map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[10px] md:text-[11px] font-medium"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls (Fixed on the right side) */}
          <div className="flex flex-col items-center justify-center gap-6 shrink-0 z-10 w-[40px] md:w-16">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`p-2 md:p-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition-all shadow-sm ${currentPage === 0
                ? "opacity-50 cursor-not-allowed text-muted-foreground"
                : "hover:bg-primary/10 hover:text-primary hover:border-primary/30 active:scale-95"
                }`}
              aria-label="Previous timeline entries"
            >
              <ChevronUp size={24} />
            </button>
            <div className="text-xs md:text-sm font-medium text-muted-foreground flex flex-col items-center gap-1">
              <span>{currentPage + 1}</span>
              <span className="w-4 h-px bg-border"></span>
              <span>{pages.length}</span>
            </div>
            <button
              onClick={handleNext}
              disabled={currentPage === pages.length - 1}
              className={`p-2 md:p-3 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition-all shadow-sm ${currentPage === pages.length - 1
                ? "opacity-50 cursor-not-allowed text-muted-foreground"
                : "hover:bg-primary/10 hover:text-primary hover:border-primary/30 active:scale-95"
                }`}
              aria-label="Next timeline entries"
            >
              <ChevronDown size={24} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Timeline;

