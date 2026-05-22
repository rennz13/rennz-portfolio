import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "motion/react";
import { Award, Shield, Network, Code2, Lock, X, ZoomIn, ZoomOut, RotateCcw, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { CodePopLayer } from "./CodePopLayer";
import { certifications, badges } from "../data/certifications";

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
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const ciscoCount = certifications.filter((cert) => cert.issuer === "Cisco Networking Academy").length;
  const nonCiscoCount = certifications.length - ciscoCount;

  const handleClose = useCallback(() => {
    setActiveCertIndex(null);
    setZoomScale(1);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
        animate(y, 0, { type: "spring", stiffness: 300, damping: 30 });
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomScale(1);
    animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    animate(y, 0, { type: "spring", stiffness: 300, damping: 30 });
  };

  useEffect(() => {
    if (activeCertIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCertIndex, handleClose]);

  return (
    <>
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

        {/* Main 4 Certificates */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {certifications.slice(0, 4).map((cert, i) => {
            const Icon = iconMap[cert.icon as keyof typeof iconMap] || Shield;
            const color = accentColors[cert.accent] || "#2563EB";

            return (
              <motion.button
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
                type="button"
                onClick={() => setActiveCertIndex(i)}
                className="group relative h-[230px] sm:h-[340px] text-left bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col justify-between w-full"
              >
                <div
                  className="h-2 w-full shrink-0"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
                />
                <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between w-full">
                  <div>
                    <div
                      className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-2 sm:mb-3 transition-colors duration-300"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6" style={{ color }} />
                    </div>
                    <h3 className="font-heading font-bold text-sm sm:text-lg text-slate-900 dark:text-slate-100 mb-1 sm:mb-1.5 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] sm:text-sm mb-2 sm:mb-3 text-justify line-clamp-2 sm:line-clamp-4">
                      {cert.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-[11px] sm:text-sm border-t border-slate-100 dark:border-slate-700/50 pt-2 sm:pt-3">
                      <span style={{ color }} className="font-medium line-clamp-1 pr-2">
                        {cert.issuer} - {cert.year}
                      </span>
                    </div>
                    <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <Eye size={12} className="text-slate-400 dark:text-slate-500" />
                      <span>View Certificate</span>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: color }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Smooth Animating Drawer for Extra Certificates */}
        {certifications.length > 4 && (
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4 sm:pt-6">
                  {certifications.slice(4).map((cert, idx) => {
                    const i = idx + 4;
                    const Icon = iconMap[cert.icon as keyof typeof iconMap] || Shield;
                    const color = accentColors[cert.accent] || "#2563EB";

                    return (
                      <motion.button
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
                        type="button"
                        onClick={() => setActiveCertIndex(i)}
                        className="group relative h-[230px] sm:h-[340px] text-left bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col justify-between w-full"
                      >
                        <div
                          className="h-2 w-full shrink-0"
                          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
                        />
                        <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between w-full">
                          <div>
                            <div
                              className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-2 sm:mb-3 transition-colors duration-300"
                              style={{ backgroundColor: `${color}20` }}
                            >
                              <Icon className="w-4 h-4 sm:w-6 sm:h-6" style={{ color }} />
                            </div>
                            <h3 className="font-heading font-bold text-sm sm:text-lg text-slate-900 dark:text-slate-100 mb-1 sm:mb-1.5 line-clamp-2">
                              {cert.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 text-[11px] sm:text-sm mb-2 sm:mb-3 text-justify line-clamp-2 sm:line-clamp-4">
                              {cert.description}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-[11px] sm:text-sm border-t border-slate-100 dark:border-slate-700/50 pt-2 sm:pt-3">
                              <span style={{ color }} className="font-medium line-clamp-1 pr-2">
                                {cert.issuer} - {cert.year}
                              </span>
                            </div>
                            <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                              <Eye size={12} className="text-slate-400 dark:text-slate-500" />
                              <span>View Certificate</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                          style={{ backgroundColor: color }}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {certifications.length > 4 && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp size={18} className="text-slate-500 group-hover:-translate-y-0.5 transition-transform" />
                </>
              ) : (
                <>
                  <span>View All Certificates</span>
                  <ChevronDown size={18} className="text-slate-500 group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </motion.button>
          </div>
        )}

        {/* Simple Plain Badges Display */}
        <div className="mt-6 sm:mt-8">
          <div className="flex justify-start items-center gap-4 sm:gap-6">
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: badge.id * 0.1 }}
                whileHover={{ scale: 1.15, rotate: 2 }}
                className="w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center relative group"
              >
                {/* Subtle accent glow behind the badge image on hover */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-300"
                  style={{ backgroundColor: accentColors[badge.accent] || "#2563EB" }}
                />
                <img
                  src={badge.image}
                  alt={`${badge.title} badge`}
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300 select-none relative z-10"
                  draggable={false}
                  title={`${badge.title} - ${badge.issuer} (${badge.year})`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* Premium Certificate Dialog Modal */}
      <AnimatePresence>
        {activeCertIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <motion.div 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="relative flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0"
              >
                <div className="max-w-[30%] sm:max-w-[45%] md:max-w-[50%] min-w-0 pr-2">
                  <h3 className="font-heading font-bold text-sm sm:text-base md:text-lg text-slate-900 dark:text-white truncate" title={certifications[activeCertIndex].title}>
                    {certifications[activeCertIndex].title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                    {certifications[activeCertIndex].issuer} • {certifications[activeCertIndex].year}
                  </p>
                </div>

                {/* Center Zoom Panel */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700/50">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomScale <= 1}
                    className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut size={15} />
                  </button>
                  <span className="text-[10px] sm:text-xs font-semibold px-0.5 sm:px-1 min-w-[28px] sm:min-w-[34px] text-center select-none text-slate-700 dark:text-slate-300">
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomScale >= 3}
                    className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn size={15} />
                  </button>
                  <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-slate-600 mx-0.5 sm:mx-1" />
                  <button
                    onClick={handleResetZoom}
                    disabled={zoomScale === 1}
                    className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors shrink-0"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </button>
              </motion.div>

              {/* Viewport Area */}
              <div className="relative flex-1 bg-slate-50 dark:bg-slate-950 overflow-hidden flex items-center justify-center p-4 min-h-[300px]">
                {/* Certificate Image Frame with Entry Scale Animation */}
                <div className="w-full h-full flex items-center justify-center relative overflow-hidden select-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <motion.img
                      key={certifications[activeCertIndex].id}
                      src={certifications[activeCertIndex].image}
                      alt={`${certifications[activeCertIndex].title} certificate`}
                      className={`max-h-[50vh] sm:max-h-[55vh] max-w-full object-contain rounded-lg shadow-lg select-none transition-shadow ${
                        zoomScale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                      }`}
                      draggable={false}
                      style={{ x, y }}
                      animate={{ scale: zoomScale }}
                      drag={zoomScale > 1}
                      dragConstraints={{
                        left: -200 * (zoomScale - 1),
                        right: 200 * (zoomScale - 1),
                        top: -150 * (zoomScale - 1),
                        bottom: 150 * (zoomScale - 1),
                      }}
                      dragElastic={0.15}
                      onDoubleClick={() => {
                        if (zoomScale > 1) {
                          handleResetZoom();
                        } else {
                          setZoomScale(2);
                        }
                      }}
                    />
                  </motion.div>
                </div>


              </div>

              {/* Modal Footer Description */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.4 }}
                className="px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 shrink-0"
              >
                <p className="text-slate-600 dark:text-slate-350 text-xs sm:text-sm leading-relaxed text-justify">
                  {certifications[activeCertIndex].description}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


