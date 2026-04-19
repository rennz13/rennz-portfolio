import { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiReact,
} from "react-icons/si";
import { SectionHeader } from "./SectionHeader";
import { CodePopLayer } from "./CodePopLayer";
import { services } from "../data/services";

const iconMap: Record<string, IconType> = {
  Globe: SiHtml5,
  Layout: SiReact,
  Server: SiNodedotjs,
  Layers: SiJavascript,
  Database: SiMysql,
  Smartphone: SiCss,
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

const SPEED = 42;

const wrapLoopX = (value: number, half: number) => {
  if (half <= 0) return 0;
  let next = value;
  while (next >= 0) next -= half;
  while (next < -half) next += half;
  return next;
};

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const x = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (paused || isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (half === 0) return;
    const next = x.get() - (SPEED * delta) / 1000; // right -> left
    x.set(wrapLoopX(next, half));
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX - x.get();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    const half = track ? track.scrollWidth / 2 : 0;
    const next = e.clientX - dragStartX.current;
    x.set(wrapLoopX(next, half));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const doubled = [...services, ...services];

  return (
    <section id="services" className="code-pop-zone relative mt-10 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-10 lg:pb-14 bg-white dark:bg-slate-900 overflow-hidden">
      <CodePopLayer />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 78% at 50% 45%, rgba(16, 185, 129, 0.14) 0%, rgba(37, 99, 235, 0.11) 36%, rgba(15, 23, 42, 0) 74%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="What I Offer"
          title="My Services"
          gradientWord="Services"
        />
      </div>

      <div
        className="relative mt-3 sm:mt-4 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent dark:from-slate-900" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent dark:from-slate-900" />

        <motion.div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 py-3 sm:py-4 cursor-grab active:cursor-grabbing select-none"
          style={{ x, willChange: "transform" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {doubled.map((service, i) => {
            const Icon = iconMap[service.icon] || SiReact;
            const color = accentColors[service.accent] || "#2563EB";
            const gradient = gradientClasses[service.accent] || "from-blue-50 to-blue-50/50";
            return (
              <motion.article
                key={`${service.id}-${i}`}
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
                className={`group relative flex-shrink-0 w-[240px] sm:w-[380px] lg:w-[440px] p-4 sm:p-6 rounded-xl bg-gradient-to-br ${gradient} border border-slate-100 dark:border-slate-700 overflow-hidden`}
                style={{ touchAction: "none" }}
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
                  style={{ backgroundColor: color }}
                />
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-200 text-sm sm:text-base text-justify">
                  {service.description}
                </p>
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: color }}
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


