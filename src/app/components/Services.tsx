import { motion } from "motion/react";
import {
  Globe,
  Layout,
  Server,
  Layers,
  Database,
  Smartphone,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { services } from "../data/services";

const iconMap = {
  Globe,
  Layout,
  Server,
  Layers,
  Database,
  Smartphone,
};

const accentColors: Record<string, string> = {
  blue: "#2563EB",
  green: "#10B981",
  orange: "#F59E0B",
  purple: "#8B5CF6",
  pink: "#EC4899",
  cyan: "#06B6D4",
};

const gradientClasses: Record<string, string> = {
  blue: "from-blue-50 to-blue-50/50 dark:from-slate-800 dark:to-slate-900",
  green: "from-green-50 to-green-50/50 dark:from-slate-800 dark:to-slate-900",
  orange: "from-orange-50 to-orange-50/50 dark:from-slate-800 dark:to-slate-900",
  purple: "from-purple-50 to-purple-50/50 dark:from-slate-800 dark:to-slate-900",
  pink: "from-pink-50 to-pink-50/50 dark:from-slate-800 dark:to-slate-900",
  cyan: "from-cyan-50 to-cyan-50/50 dark:from-slate-800 dark:to-slate-900",
};

export function Services() {
  return (
    <section id="services" className="relative py-20 lg:py-28 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="absolute top-20 left-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="What I Offer"
          title="My Services"
          gradientWord="Services"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Globe;
            const color = accentColors[service.accent] || "#2563EB";
            const gradient = gradientClasses[service.accent] || "from-blue-50 to-blue-50/50";
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
                className={`relative p-6 rounded-xl bg-gradient-to-br ${gradient} border border-slate-100 dark:border-slate-700 overflow-hidden group`}
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
                  style={{ backgroundColor: color }}
                />
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-200 text-base text-justify">
                  {service.description}
                </p>
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
