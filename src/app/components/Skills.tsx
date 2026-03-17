import { motion } from "motion/react";
import { Code } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { skillCategories } from "../data/skills";
import { techColors } from "../data/constants";

const accentColors: Record<string, string> = {
  blue: "#2563EB",
  green: "#10B981",
  orange: "#F59E0B",
  purple: "#8B5CF6",
  pink: "#EC4899",
};

export function Skills() {
  return (
    <section id="skills" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Tech Stack"
          badgeIcon={Code}
          title="Skills & Technologies"
          gradientWord="Technologies"
          description="Here are the technologies and tools I work with to bring ideas to life"
          badgeVariant="muted"
        />

        <div className="grid gap-6 lg:gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4 border-b border-slate-100 dark:border-slate-700">
                <div
                  className="w-1 h-12 rounded-full"
                  style={{ backgroundColor: accentColors[category.accent] || "#2563EB" }}
                />
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100">
                  {category.title}
                </h3>
                <span
                  className="ml-auto px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${accentColors[category.accent] || "#2563EB"}20`,
                    color: accentColors[category.accent] || "#2563EB",
                  }}
                >
                  {category.skills.length} skills
                </span>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                  {category.skills.map((skill, i) => {
                    const colors = techColors[skill.name] || {
                      bg: "#E5E7EB",
                      color: "#6B7280",
                    };
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="group"
                      >
                        <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-md transition-all">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold mb-2"
                            style={{ backgroundColor: colors.bg, color: colors.color }}
                          >
                            {skill.abbr}
                          </div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{skill.name}</p>
                          <div
                            className="mt-2 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded"
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
