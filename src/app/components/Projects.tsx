import { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";
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
  violet: "#7C3AED",
};

const SPEED = 48; // px per second — gentle drift

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const x = useMotionValue(0);

  // --- Seamless ticker loop ---
  useAnimationFrame((_, delta) => {
    if (paused || isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (half === 0) return;
    let next = x.get() - (SPEED * delta) / 1000;
    if (next <= -half) next += half; // snap reset for seamless loop
    x.set(next);
  });

  // Drag handlers — offset current x on pointer down/move/up
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX - x.get();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    const half = track ? track.scrollWidth / 2 : 0;
    let next = e.clientX - dragStartX.current;
    // keep in bounds so loop stays coherent
    if (next > 0) next = next % -half + (-half === 0 ? 0 : 0); // clamp right
    if (next < -half) next += half;
    x.set(next);
  };
  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const doubled = [...projects, ...projects];

  return (
    <section id="projects" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-slate-900">
      {/* Header inside max-width container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="My Work"
          badgeIcon={FolderOpen}
          title="Featured Projects"
          gradientWord="Projects"
        />
      </div>

      {/* Full-bleed ticker */}
      <div
        className="relative mt-12 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Soft edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-[#F8FAFC] to-transparent dark:from-slate-900" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-[#F8FAFC] to-transparent dark:from-slate-900" />

        {/* Track */}
        <motion.div
          ref={trackRef}
          className="flex gap-6 py-4 cursor-grab active:cursor-grabbing select-none"
          style={{ x, willChange: "transform" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {doubled.map((project, i) => (
            <article
              key={`${project.id}-${i}`}
              className="group flex-shrink-0 w-72 sm:w-80 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              style={{ touchAction: "none" }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a
                    href={project.githubUrl || "#"}
                    className="p-2 rounded-full bg-white text-slate-800 hover:scale-110 transition-transform"
                    aria-label="GitHub"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={project.liveUrl || "#"}
                    className="p-2 rounded-full bg-white text-slate-800 hover:scale-110 transition-transform"
                    aria-label="Live site"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
                {project.featured && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-[#2563EB] text-white text-xs font-medium">
                    ⭐ Featured
                  </span>
                )}
                <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 text-xs font-medium">
                  #{project.id}
                </span>
              </div>

              {/* Body */}
              <div className="p-4">
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 mb-1.5">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
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
                  className="mt-3 h-0.5 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${accentColors[project.accent] || "#2563EB"}, transparent)`,
                  }}
                />
              </div>
            </article>
          ))}
        </motion.div>
      </div>

      {/* GitHub CTA inside max-width container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
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
