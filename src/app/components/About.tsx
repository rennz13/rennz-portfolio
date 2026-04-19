import { motion } from "motion/react";
import { User, MapPin, Mail, Phone, GraduationCap, Heart } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { CodePopLayer } from "./CodePopLayer";

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const infoCards = [
  {
    icon: MapPin,
    label: "Location",
    value: "Carmen, Davao del Norte",
    color: "text-[#2563EB]",
  },
  {
    icon: Mail,
    label: "Email",
    value: "eallourenceb13@gmail.com",
    color: "text-[#10B981]",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "09929533615",
    color: "text-orange-500",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "BSIT Student",
    color: "text-purple-500",
  },
];

const stats = [
  { value: "6+", label: "Projects Completed" },
  { value: "16+", label: "Technologies" },
  { value: "4", label: "Certifications" },
  { value: "3+", label: "Years Coding" },
];

const interests = [
  "💻 Web Development",
  "🎨 UI/UX Design",
  "🔧 Problem Solving",
  "📚 Continuous Learning",
  "🌱 Open Source",
];

export function About() {
  return (
    <section id="about" className="code-pop-zone relative mt-6 sm:mt-8 lg:mt-10 py-6 sm:py-10 lg:py-14 bg-white dark:bg-slate-900 overflow-hidden">
      <CodePopLayer />
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="About Me" badgeIcon={User} title="Know Who I Am" gradientWord="Am" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold text-white"
                style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}
              >
                E
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100">
                  Eal Lourence R. Boco
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">Full-Stack Web Developer</p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-[15px] sm:text-lg text-justify">
              I am a <strong>Bachelor of Science in Information Technology</strong> student at{" "}
              <strong>Davao del Norte State College</strong> who is passionate about web development
              and modern software technologies. I enjoy building clean, responsive, and efficient
              web applications that provide real solutions.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-[15px] sm:text-lg text-justify">
              My journey in tech started with curiosity, and it has grown into a deep passion for
              creating digital experiences. I specialize in{" "}
              <strong>full-stack development</strong> using modern frameworks and tools, always
              aiming for clean code and great user experience.
            </p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {interests.map((interest, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-md sm:rounded-lg text-sm sm:text-base text-white font-medium"
              style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}
            >
              Let's Work Together
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </motion.button>
          </motion.div>

          {/* Right - Info cards + Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
                  className="p-3 sm:p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <card.icon className={`w-5 h-5 sm:w-6 sm:h-6 mb-1.5 sm:mb-2 ${card.color}`} />
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{card.label}</p>
                  <p className="text-[13px] sm:text-sm leading-tight break-words font-medium text-slate-800 dark:text-slate-200 font-body">
                    {card.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="p-4 sm:p-6 rounded-xl text-white"
              style={{ background: "linear-gradient(135deg, #2563EB, #10B981)" }}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <p
                      className="text-xl sm:text-3xl font-bold font-heading"
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-white/90">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

