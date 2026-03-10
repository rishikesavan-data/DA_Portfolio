import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink, FileText } from "lucide-react";

const certifications = [
  {
    title: "Deloitte Australia - Data Analytics Job Simulation",
    issuer: "Forage",
    date: "Jan 2026",
    link: "/Certificate Pdf/Deloitte Australia - Data Analytics Job Simulation certificate.pdf",
  },
  {
    title: "Certificate Course on Data Analytics (under Infosys Foundation Finishing School for Employability Program)",
    issuer: "Infosys Foundation and ICT Academy",
    date: "Aug 2024 - Sep 2024",
    link: "/Certificate Pdf/Infosys Foundation and ICT Academy Data Analytics Course.pdf",
  },
  {
    title: "Introduction to Web Development",
    issuer: "Coursera",
    date: "Jul 2023",
    websiteLink: "https://www.coursera.org/account/accomplishments/verify/H6JXJCD5ZUVS",
    certificatePdf: "/Certificate Pdf/Coursera - Introduction to Web Development Certificate.pdf",
  },
  /*{
    title: "Python for Data Analysis",
    issuer: "DataCamp",
    date: "2023",
    link: "https://www.datacamp.com/statement-of-accomplishment/your-python-for-data-analysis-id",
  },*/
];

const Certifications = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">
            Credentials
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Certifi<span className="gradient-text">cations</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {certifications.map((cert, i) => {
            const hasTwoLinks = "websiteLink" in cert && "certificatePdf" in cert;
            const cardContent = (
              <>
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Award size={20} className="text-primary dark:text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm font-semibold mb-1 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {cert.issuer} · {cert.date}
                  </p>
                  {hasTwoLinks && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      <a
                        href={cert.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={12} />
                        Website
                      </a>
                      <a
                        href={cert.certificatePdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FileText size={12} />
                        Certificate (PDF)
                      </a>
                    </div>
                  )}
                </div>
                {!hasTwoLinks && (
                  <ExternalLink
                    size={14}
                    className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0"
                  />
                )}
              </>
            );
            return hasTwoLinks ? (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 * i }}
                whileHover={{ y: -4 }}
                className="glass-panel p-6 group glow-border flex items-start gap-4"
              >
                {cardContent}
              </motion.div>
            ) : (
              <motion.a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 * i }}
                whileHover={{ y: -4 }}
                className="glass-panel p-6 group glow-border flex items-start gap-4"
              >
                {cardContent}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
