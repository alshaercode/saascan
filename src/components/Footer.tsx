import React from "react";
import { Heart, Code, Github } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import Logo from "./Logo";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer
      dir="ltr"
      className="bg-[hsl(var(--footer-bg))] text-[hsl(var(--footer-text))] py-6 mb-0 mt-auto"
      style={{ minHeight: "80px" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Logo / App Title */}
        <Logo />

        {/* Contribution and credit links */}
        <div className="flex gap-6 text-sm text-[hsl(var(--footer-text-secondary))] justify-center sm:justify-end">
          <a
            href="https://github.com/your-github-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <Github size={16} /> Contribute on GitHub
          </a>
          <span className="flex items-center gap-1">
            Made by <Code size={16} /> Baraa
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
