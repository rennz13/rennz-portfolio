import { useState } from "react";
import { motion } from "motion/react";
import { Award, Shield, Network, Code2, Lock, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { CodePopLayer } from "./CodePopLayer";
import { certifications } from "../data/certifications";

const iconMap = {
  Award,
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
  pink: "#EC4899",
};

export function Certifications() {
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
  const ciscoCount = certifications.filter((cert) => cert.issuer === "Cisco Networking Academy").length;
  const nonCiscoCount = certifications.length - ciscoCount;

  const toggleCardFlip = (id: number) => {
    setFlippedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="certifications" className="code-pop-zone relative mt-10 sm:mt-14 lg:mt-20 py-6 sm:py-10 lg:py-14 bg-[#F8FAFC] dark:bg-slate-900 overflow-hidden">
      <CodePopLayer />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Achievements"
          badgeIcon={Award}
          title="My Certifications"
          gradientWord="Certifications"
          mobileCompact
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 mb-8 sm:mb-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#2563EB] flex items-center justify-center">
            <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100">
              Certifications Overview
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              {ciscoCount} Cisco and {nonCiscoCount} Non-Cisco ({certifications.length} Total Certificates)
            </p>
          </div>
          <span className="px-2.5 py-1 sm:px-3 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-medium">
            Multiple Issuers
          </span>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {certifications.map((cert, i) => {
            const Icon = iconMap[cert.icon as keyof typeof iconMap] || Shield;
            const color = accentColors[cert.accent] || "#2563EB";
            const isFlipped = flippedCardId === cert.id;

            return (
              <motion.button
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
                type="button"
                onClick={() => toggleCardFlip(cert.id)}
                className="group relative h-[280px] sm:h-[360px] text-left cert-flip-scene"
              >
                <motion.div
                  className="cert-flip-inner h-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <div className="cert-flip-face absolute inset-0 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    <div
                      className="h-2 w-full"
                      style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
                    />
                    <div className="p-3.5 sm:p-5">
                      <div
                        className="cert-logo-flip w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-2.5 sm:mb-3"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color }} />
                      </div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 mb-1.5 sm:mb-2">
                        {cert.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4 text-justify line-clamp-4 sm:line-clamp-5">
                        {cert.description}
                      </p>
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span style={{ color }} className="font-medium line-clamp-1 pr-2">
                          {cert.issuer} - {cert.year}
                        </span>
                        <ExternalLink size={14} style={{ color }} />
                      </div>
                      <p className="mt-2 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Tap to flip
                      </p>
                    </div>
                    <div
                      className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  <div className="cert-flip-face cert-flip-back absolute inset-0 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden bg-white dark:bg-slate-800">
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-slate-900/80 to-transparent">
                      <p className="text-[11px] sm:text-xs text-white/95 font-medium">Tap to flip</p>
                    </div>
                  </div>
                </motion.div>
                <span className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 px-2 py-1 rounded-full text-[10px] font-semibold bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80">
                  {isFlipped ? "Image" : "Details"}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

