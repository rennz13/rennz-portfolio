import { motion } from "motion/react";
import { FolderOpen, Github, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { projects } from "../data/projects";
import { techColors } from "../data/constants";

const accentColors: Record<string, string> = {
  blue: "#2563EB",
  green: "#10B981",
  cyan: "#06B6D4",
  orange: "#F59E0B",
  purple: "#8B5CF6",
  pink: "#EC4899",
};

export function Projects() {
  return (
    <section id="projects" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="My Work"
          badgeIcon={FolderOpen}
          title="Featured Projects"
          gradientWord="Projects"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}
              className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <motion.a
                    href={project.githubUrl || "#"}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 rounded-full bg-white text-slate-800"
                    aria-label="View on GitHub"
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href={project.liveUrl || "#"}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 rounded-full bg-white text-slate-800"
                    aria-label="View live site"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
                {project.featured && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-[#2563EB] text-white text-xs font-medium">
                    ⭐ Featured
                  </span>
                )}
                <span
                  className="absolute top-3 right-3 px-2 py-1 rounded-md bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 text-xs font-medium"
                >
                  #{project.id}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-slate-100 mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => {
                    const colors = techColors[tech] || { bg: "#E5E7EB", color: "#6B7280" };
                    return (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{ backgroundColor: colors.bg, color: colors.color }}
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
                <div
                  className="mt-4 h-1 rounded-full"
                  style={{
                    width: "100%",
                    background: `linear-gradient(90deg, ${accentColors[project.accent] || "#2563EB"}, transparent)`,
                  }}
                />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#2563EB] dark:border-blue-400 text-[#2563EB] dark:text-blue-400 font-medium hover:bg-[#2563EB] dark:hover:bg-blue-600 hover:text-white transition-colors"
          >
            View More on GitHub
            <ExternalLink size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
