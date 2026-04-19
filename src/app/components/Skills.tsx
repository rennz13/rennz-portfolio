import { motion } from "motion/react";
import { Code } from "lucide-react";
import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiBootstrap,
  SiCss,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiRender,
  SiSass,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { SectionHeader } from "./SectionHeader";
import { CodePopLayer } from "./CodePopLayer";
import { skillCategories } from "../data/skills";
import { techColors } from "../data/constants";

const accentColors: Record<string, string> = {
  blue: "#2563EB",
  green: "#10B981",
  orange: "#F59E0B",
  purple: "#8B5CF6",
  pink: "#EC4899",
  cyan: "#06B6D4",
};

const skillIcons: Record<string, IconType> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  PHP: SiPhp,
  Java: FaJava,
  HTML: SiHtml5,
  CSS: SiCss,
  React: SiReact,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  SASS: SiSass,
  Flutter: SiFlutter,
  "React Native": SiReact,
  "Node.js": SiNodedotjs,
  Laravel: SiLaravel,
  MySQL: SiMysql,
  Firebase: SiFirebase,
  Supabase: SiSupabase,
  Git: SiGit,
  GitHub: SiGithub,
  "VS Code": VscVscode,
  Figma: SiFigma,
  Vercel: SiVercel,
  Render: SiRender,
};

export function Skills() {
  return (
    <section id="skills" className="code-pop-zone relative pt-6 sm:pt-10 lg:pt-14 pb-2 sm:pb-4 lg:pb-6 bg-[#F8FAFC] dark:bg-slate-900 overflow-hidden">
      <CodePopLayer />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Tech Stack"
          badgeIcon={Code}
          title="Skills & Technologies"
          gradientWord="Technologies"
          description="Here are the technologies and tools I work with to bring ideas to life"
          badgeVariant="muted"
          mobileCompact
        />

        <div className="grid gap-4 sm:gap-6 lg:gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
              className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-2 sm:gap-4 p-2.5 sm:p-4 border-b border-slate-100 dark:border-slate-700">
                <div
                  className="w-1 h-8 sm:h-12 rounded-full"
                  style={{ backgroundColor: accentColors[category.accent] || "#2563EB" }}
                />
                <h3 className="font-heading font-bold text-sm sm:text-lg text-slate-900 dark:text-slate-100 leading-tight">
                  {category.title}
                </h3>
                <span
                  className="ml-auto px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap"
                  style={{
                    backgroundColor: `${accentColors[category.accent] || "#2563EB"}20`,
                    color: accentColors[category.accent] || "#2563EB",
                  }}
                >
                  {category.skills.length} skills
                </span>
              </div>
              <div className="p-2.5 sm:p-6">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4">
                  {category.skills.map((skill, i) => {
                    const colors = techColors[skill.name] || {
                      bg: "#E5E7EB",
                      color: "#6B7280",
                    };
                    const SkillIcon = skillIcons[skill.name];
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="group"
                      >
                        <div className="p-2 sm:p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-md transition-all">
                          <div
                            className="w-7 h-7 sm:w-10 sm:h-10 rounded-md sm:rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold mb-1 sm:mb-2"
                            style={{ backgroundColor: colors.bg, color: colors.color }}
                          >
                            {SkillIcon ? (
                              <SkillIcon className="w-3.5 h-3.5 sm:w-5 sm:h-5" aria-hidden="true" />
                            ) : (
                              skill.abbr
                            )}
                          </div>
                          <p className="text-[11px] sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-tight">
                            {skill.name}
                          </p>
                          <div
                            className="mt-1.5 sm:mt-2 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded"
                            style={{ backgroundColor: accentColors[category.accent] || "#2563EB" }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

