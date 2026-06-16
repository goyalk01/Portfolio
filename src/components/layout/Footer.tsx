import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-dark/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <span className="gradient-text text-xl font-bold">Krish Goyal</span>
          <p className="mt-1 text-sm text-text-muted">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="mailto:krishaggarwal1452@gmail.com"
            className="text-text-muted transition-colors hover:text-secondary"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/krish-goyal-b58a31320"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition-colors hover:text-secondary"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/goyalk01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition-colors hover:text-secondary"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
