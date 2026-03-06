import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin } from "lucide-react";

const profiles = [
  {
    platform: "LinkedIn",
    username: "@rishi-kesavan",
    link: "https://linkedin.com",
    icon: Linkedin,
    color: "from-sky-500 to-sky-600",
  },
  {
    platform: "GitHub",
    username: "@rishi",
    link: "https://github.com",
    icon: Github,
    color: "from-foreground/80 to-foreground",
  },
];

const CodingProfiles = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="profiles" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3">
           Let's connect
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Find Me <span className="gradient-text">Online</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-md mx-auto">
          {profiles.map((profile, i) => (
            <motion.a
              key={profile.platform}
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * i }}
              whileHover={{ y: -8, rotateY: 5, rotateX: -5 }}
              className="glass-panel p-6 text-center group glow-border"
              style={{ perspective: "800px" }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <profile.icon
                  size={22}
                  className="text-primary"
                />
              </div>
              <h3 className="font-display font-semibold text-sm mb-1">
                {profile.platform}
              </h3>
              <p className="text-xs text-muted-foreground">
                {profile.username}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
