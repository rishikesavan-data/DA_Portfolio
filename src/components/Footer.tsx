import { Github, Linkedin, Mail, Globe } from "lucide-react";

const links = [
  { icon: Linkedin, href: "https://linkedin.com/in/rishikesavan-data/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/rishikesavan-data", label: "GitHub" },
  { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=rishikesavan.data@gmail.com", label: "Email" },
  //{ icon: Globe, href: "#", label: "Portfolio" },
];

const Footer = () => (
  <footer className="py-12 px-6 border-t border-border">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Rishi. All rights reserved.
      </p>
      <div className="flex gap-5">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="text-foreground hover:text-primary hover:-translate-y-0.5 transition-all"
            aria-label={link.label}
          >
            <link.icon size={20} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
