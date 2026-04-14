import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Code, Briefcase, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

const scrollToSection = (target: string) => {
  const id = target.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const navOffset = 88;
  const y = el.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  const handleMobileNavigate = (href: string) => {
    setIsOpen(false);
    window.setTimeout(() => scrollToSection(href), 180);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      const scrollY = window.scrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 font-heading font-bold text-xl text-slate-900 dark:text-slate-100 hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors"
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#06B6D4]"
              style={{ background: "linear-gradient(135deg, #2563EB20, #10B98120)" }}
            >
              <Code size={18} />
            </span>
            Rence.
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => scrollToSection(id)}
                  className={`relative py-2 font-medium transition-colors ${
                    isActive
                      ? "text-[#2563EB] dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-blue-400"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-blue-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection("contact")}
              className="px-5 py-2.5 rounded-lg bg-[#2563EB] dark:bg-blue-600 text-white font-medium flex items-center gap-2"
            >
              <Briefcase size={18} />
              Hire Me
            </motion.button>
          </div>

          {/* Mobile: theme toggle + menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => handleMobileNavigate(link.href)}
                  className="block w-full text-left py-2 text-slate-600 dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-blue-400 font-medium"
                >
                  {link.label}
                </button>
              ))}
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => handleMobileNavigate("#contact")}
                className="w-full mt-4 py-3 rounded-lg bg-[#2563EB] dark:bg-blue-600 text-white font-medium flex items-center justify-center gap-2"
              >
                <Briefcase size={18} />
                Hire Me
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={toggleTheme}
                className="w-full py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium flex items-center justify-center gap-2"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
