import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, User, MessageSquare, Github, Linkedin } from "lucide-react";

const CONTACT_EMAIL = "rishikesavan.data@gmail.com"; // TODO: replace with your real email

const socials = [
  {
    platform: "LinkedIn",
    username: "@Rishi Kesavan",
    link: "https://www.linkedin.com/in/rishikesavan-data/",
    icon: Linkedin,
  },
  {
    platform: "GitHub",
    username: "@Rishi Kesavan",
    link: "https://github.com/rishikesavan-data",
    icon: Github,
  },
];

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    );

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
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
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-panel p-8 space-y-5"
          >
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground" />
              <input
                type="text"
                placeholder="Your Name"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground" />
              <input
                type="email"
                placeholder="Your Email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <div className="relative">
              <MessageSquare size={16} className="absolute left-4 top-4 text-foreground" />
              <textarea
                placeholder="Your Message"
                required
                maxLength={1000}
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-foreground text-background font-medium text-sm hover-lift flex items-center justify-center gap-2 transition-all"
            >
              {submitted ? (
                "Message Sent!"
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>
          </motion.form>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center gap-6"
          >
            <div className="glass-panel p-8">
              <h3 className="font-display text-lg font-semibold mb-2">
                Find Me Online
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Connect with me on social platforms or drop a message via the form.
              </p>
              <div className="flex flex-col gap-4">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.platform}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + 0.1 * i }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <s.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{s.platform}</p>
                      <p className="text-xs text-muted-foreground">{s.username}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
