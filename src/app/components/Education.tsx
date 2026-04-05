import { motion } from "motion/react";
import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const years = [2022, 2023, 2024, 2025, 2026];

export function Education() {
  return (
    <section id="education" className="relative py-20 lg:py-28 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Academic Background"
          badgeIcon={GraduationCap}
          title="My Education"
          gradientWord="Education"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden p-8 lg:p-12"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}
            >
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-slate-100">
                Bachelor of Science in Information Technology
              </h3>
              <p className="text-[#2563EB] dark:text-blue-400 font-semibold text-lg">
                Davao del Norte State College
              </p>
              <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-sm font-medium">
                Currently Enrolled
              </span>
              <div className="flex flex-wrap gap-6 text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  2022 – Present
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  Carmen, Davao del Norte
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen size={18} />
                  BSIT Program
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {[
                  { label: "Program", value: "BSIT", emoji: "🎓" },
                  { label: "Status", value: "Active", emoji: "✅" },
                  { label: "Focus", value: "Web Dev", emoji: "💻" },
                  { label: "Started", value: "2022", emoji: "📅" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-lg bg-white/80 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600"
                  >
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {item.emoji} {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-base pt-2 text-justify">
                Pursuing a degree in Information Technology with a focus on web development and
                software engineering. Actively building projects and applying classroom knowledge
                to real-world applications, growing as a full-stack developer.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 flex items-center justify-between sm:justify-center w-full max-w-[360px] sm:max-w-none mx-auto gap-0 sm:gap-2 px-2 sm:px-0"
        >
          {years.map((year, i) => (
            <div key={year} className="flex items-center flex-1 sm:flex-none min-w-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                    i < years.length - 1 ? "bg-[#2563EB]" : "bg-slate-300"
                  }`}
                />
                <span className="text-[11px] sm:text-sm font-medium text-slate-600 mt-1 sm:mt-2">
                  {year}
                </span>
              </div>
              {i < years.length - 1 && (
                <div
                  className={`flex-1 sm:flex-none w-auto sm:w-16 h-0.5 mx-1 sm:mx-0 ${
                    i < years.length - 1 ? "bg-[#2563EB]" : "bg-slate-300"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
