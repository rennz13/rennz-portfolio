import { motion } from "motion/react";
import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { CodePopLayer } from "./CodePopLayer";

const years = [2022, 2023, 2024, 2025, 2026];

const educationStats = [
  { label: "Program", value: "BSIT" },
  { label: "Status", value: "Active" },
  { label: "Focus", value: "Web Dev" },
  { label: "Started", value: "2022" },
];

export function Education() {
  return (
    <section id="education" className="code-pop-zone relative mt-10 sm:mt-14 lg:mt-20 py-6 sm:py-10 lg:py-14 bg-white dark:bg-slate-900 overflow-hidden">
      <CodePopLayer />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Academic Background"
          badgeIcon={GraduationCap}
          title="My Education"
          gradientWord="Education"
          mobileCompact
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden p-4 sm:p-8 lg:p-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 items-start">
            <div
              className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25 border border-white/20"
              style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}
            >
              <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/10" />
              <GraduationCap
                className="relative w-7 h-7 sm:w-10 sm:h-10 text-white drop-shadow-[0_2px_8px_rgba(15,23,42,0.35)]"
                strokeWidth={2.3}
              />
            </div>

            <div className="flex-1 space-y-3 sm:space-y-4">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-slate-100">
                Bachelor of Science in Information Technology
              </h3>
              <p className="text-[#2563EB] dark:text-blue-400 font-semibold text-base sm:text-lg">
                Davao del Norte State College
              </p>
              <span className="inline-block px-2.5 py-1 sm:px-3 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs sm:text-sm font-medium">
                Currently Enrolled
              </span>

              <div className="flex flex-wrap gap-3 sm:gap-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar size={16} />
                  2022 - Present
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <MapPin size={16} />
                  Carmen, Davao del Norte
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <BookOpen size={16} />
                  BSIT Program
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 pt-2 sm:pt-4">
                {educationStats.map((item) => (
                  <div
                    key={item.label}
                    className="p-2 sm:p-3 rounded-lg bg-white/80 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600"
                  >
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base pt-1 sm:pt-2 text-justify">
                Pursuing a degree in Information Technology with a focus on web development and software engineering.
                Actively building projects and applying classroom knowledge to real-world applications, growing as a
                full-stack developer.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 flex items-center justify-center w-full mx-auto"
        >
          {years.map((year, i) => (
            <div key={year} className="flex items-center flex-none">
              <div className="flex flex-col items-center w-11 sm:w-auto">
                <div
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                    i < years.length - 1 ? "bg-[#2563EB]" : "bg-slate-300"
                  }`}
                />
                <span className="text-[11px] sm:text-sm font-medium text-slate-600 mt-1 sm:mt-2 text-center">
                  {year}
                </span>
              </div>
              {i < years.length - 1 && (
                <div
                  className={`w-5 sm:w-16 h-0.5 mx-0.5 sm:mx-0 ${
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

