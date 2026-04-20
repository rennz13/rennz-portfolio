import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Download,
  Github,
  Facebook,
  Instagram,
} from "lucide-react";
import { floatingTechBadges } from "../data/constants";
import profileImage from "../../assets/images/profile.jpeg";

const roles = [
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Enthusiast",
];

const topFloatingRoles = [
  "Full-Stack Developer",
  "React / TS / Node.js",
  "API / Database Integration",
];

const bottomFloatingRoles = [
  "BSIT Student at DNSC",
  "HTML / CSS / Tailwind",
  "UI/UX & Responsive Design",
];

const mobileAvatarBadgePositions = [
  "-top-8 -right-20",
  "-top-8 -left-20",
  "top-1/2 -right-24 -translate-y-1/2",
  "top-1/2 -left-24 -translate-y-1/2",
  "-bottom-8 -right-20",
  "-bottom-8 -left-20",
];

type BinaryStream = {
  id: number;
  left: string;
  duration: number;
  delay: number;
  intensityClass: string;
  content: string;
};

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [topFloatingIndex, setTopFloatingIndex] = useState(0);
  const [bottomFloatingIndex, setBottomFloatingIndex] = useState(0);
  const binaryStreams = useMemo<BinaryStream[]>(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        left: `${(index / 26) * 100}%`,
        duration: 16 + (index % 7) * 2.3,
        delay: -index * 1.4,
        intensityClass: `binary-rain-stream-${(index % 4) + 1}`,
        content: Array.from({ length: 58 }, () => (Math.random() > 0.5 ? "1" : "0")).join("\n"),
      })),
    []
  );

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const pauseTime = isDeleting ? 500 : 2200;

    if (!isDeleting && displayText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setDisplayText((prev) =>
          isDeleting ? currentRole.slice(0, prev.length - 1) : currentRole.slice(0, prev.length + 1)
        );
      },
      typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const topTimer = window.setInterval(() => {
      setTopFloatingIndex((prev) => (prev + 1) % topFloatingRoles.length);
    }, 25000);

    const bottomTimer = window.setInterval(() => {
      setBottomFloatingIndex((prev) => (prev + 1) % bottomFloatingRoles.length);
    }, 15000);

    return () => {
      window.clearInterval(topTimer);
      window.clearInterval(bottomTimer);
    };
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/rennz13", label: "GitHub" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61557206666104", label: "Facebook" },
    {
      icon: Instagram,
      href: "https://www.instagram.com/melonkikk?igsh=MW92MTduNTltMHU3MA==",
      label: "Instagram",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[clamp(740px,88svh,780px)] sm:min-h-screen flex items-start sm:items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
    >
      {/* Binary code rain background (Home only) */}
      <div className="binary-rain-layer absolute inset-0 pointer-events-none" aria-hidden="true">
        {binaryStreams.map((stream) => (
          <span
            key={stream.id}
            className={`binary-rain-stream ${stream.intensityClass} absolute whitespace-pre select-none`}
            style={{
              left: stream.left,
              animationDuration: `${stream.duration}s`,
              animationDelay: `${stream.delay}s`,
            }}
          >
            {stream.content}
          </span>
        ))}
      </div>

      {/* Dotted pattern overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #2563EB 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #10B981 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative blur blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-400/30 rounded-full blur-3xl" />

      {/* Floating tech badges - desktop only */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {floatingTechBadges.map((badge, i) => (
          <motion.div
            key={badge.name}
            className="absolute px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2"
            style={{
              left: badge.left,
              top: badge.top,
              backgroundColor: `${badge.color}20`,
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: badge.color }}
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{badge.name}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-10 pb-8 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-2 sm:mt-0 space-y-4 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-1 sm:gap-2 px-2 py-0.5 sm:px-4 sm:py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-[#2563EB] dark:text-blue-300 text-[10px] sm:text-sm font-medium ml-0 sm:ml-20 mt-1 sm:mt-0">
              <span className="relative flex h-1 w-1 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1 w-1 sm:h-2 sm:w-2 bg-green-500" />
              </span>
              Available for opportunities
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl xl:text-6xl text-slate-900 dark:text-slate-100 leading-tight">
              Hi, I'm{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #2563EB, #10B981)" }}
              >
                Rence
              </span>
              .<span className="text-[#2563EB] animate-pulse">|</span>
            </h1>

            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">Eal Lourence R. Boco</p>

            <div className="h-7 sm:h-8 flex items-center">
              <span className="text-lg sm:text-2xl text-slate-700 dark:text-slate-200 font-medium">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg text-justify max-w-xl leading-relaxed">
              I am a passionate developer who enjoys building modern, responsive, and user-friendly
              web applications that solve real-world problems.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-3 rounded-md sm:rounded-lg text-[13px] sm:text-base text-white font-medium"
                style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}
              >
                View Projects
                <ArrowRight className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-3 rounded-md sm:rounded-lg border-2 border-[#2563EB] dark:border-blue-400 text-[#2563EB] dark:text-blue-400 text-[13px] sm:text-base font-medium hover:bg-[#2563EB] dark:hover:bg-blue-600 hover:text-white transition-colors"
              >
                Contact Me
                <MessageCircle className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
              </motion.button>
              <motion.a
                href="/cv.pdf"
                download="Eal-Lourence-Boco-CV.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-3 rounded-md sm:rounded-lg border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-[13px] sm:text-base font-medium hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Download CV
                <Download className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
              </motion.a>
            </div>

            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 sm:p-2.5 rounded-md sm:rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#2563EB] dark:hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end mt-6 sm:mt-0"
          >
            <div className="relative">
              {/* Rotating rings */}
              <motion.div
                className="absolute inset-0 -m-3 sm:-m-4 rounded-full border-2 border-dashed border-[#2563EB]/30 w-[200px] h-[200px] sm:w-[248px] sm:h-[248px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 -m-5 sm:-m-6 rounded-full border-2 border-dashed border-[#10B981]/30 w-[232px] h-[232px] sm:w-[280px] sm:h-[280px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              <div
                className="relative w-44 h-44 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full p-1"
                style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-200">
                  <img
                    src={profileImage}
                    alt="Rence - Full-Stack Developer"
                    className="w-full h-full object-cover object-[center_30%]"
                  />
                </div>
              </div>

              {/* Decorative blur behind image */}
              <div
                className="absolute -z-10 inset-0 w-44 h-44 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full blur-2xl opacity-40"
                style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}
              />

              {/* Floating tech badges near avatar (mobile only) */}
              <div className="sm:hidden pointer-events-none absolute inset-0">
                {floatingTechBadges.map((badge, i) => (
                  <motion.div
                    key={`mobile-badge-${badge.name}`}
                    className={`absolute ${mobileAvatarBadgePositions[i]} px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1`}
                    style={{
                      backgroundColor: `${badge.color}0D`,
                      border: `1px solid ${badge.color}20`,
                      opacity: 0.5,
                    }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.18 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: badge.color }} />
                    <span className="text-[10px] font-medium text-slate-700/65 dark:text-slate-200/65 whitespace-nowrap">
                      {badge.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 lg:right-0 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 min-w-[160px] sm:min-w-0"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={bottomFloatingRoles[bottomFloatingIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="block w-full text-center text-[11px] sm:text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap"
                  >
                    {bottomFloatingRoles[bottomFloatingIndex]}
                  </motion.span>
                </AnimatePresence>
                <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded bg-[#2563EB]" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 lg:left-0 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 min-w-[160px] sm:min-w-0"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={topFloatingRoles[topFloatingIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="block w-full text-center text-[11px] sm:text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap"
                  >
                    {topFloatingRoles[topFloatingIndex]}
                  </motion.span>
                </AnimatePresence>
                <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded bg-[#10B981]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-sm text-slate-500 dark:text-slate-400">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-slate-400 dark:border-slate-500 flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-slate-500 dark:bg-slate-400"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

