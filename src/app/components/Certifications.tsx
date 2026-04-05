import { motion } from "motion/react";
import { Award, Shield, Network, Code2, Lock, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { certifications } from "../data/certifications";

const iconMap = {
  Shield,
  Network,
  Code2,
  Lock,
};

const accentColors: Record<string, string> = {
  blue: "#2563EB",
  green: "#10B981",
  orange: "#F59E0B",
  purple: "#8B5CF6",
};

export function Certifications() {
  return (
    <section id="certifications" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Achievements"
          badgeIcon={Award}
          title="My Certifications"
          gradientWord="Certifications"
        />

        {/* Cisco Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 p-6 mb-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="w-14 h-14 rounded-xl bg-[#2563EB] flex items-center justify-center">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-slate-100">
              Cisco Networking Academy
            </h3>
            <p className="text-slate-600 dark:text-slate-300">4 Certifications Completed</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium flex items-center gap-1">
            ✓ Verified
          </span>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => {
            const Icon = iconMap[cert.icon as keyof typeof iconMap] || Shield;
            const color = accentColors[cert.accent] || "#2563EB";
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
                className="relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden group"
              >
                <div
                  className="h-2 w-full"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
                />
                <div className="p-5">
                  <span className="text-3xl mb-3 block">{cert.emoji}</span>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 text-justify">
                    {cert.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color }} className="font-medium">
                      Cisco NetAcad · {cert.year}
                    </span>
                    <ExternalLink size={16} style={{ color }} />
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
