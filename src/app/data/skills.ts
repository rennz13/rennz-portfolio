import type { SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    accent: "blue",
    skills: [
      { name: "JavaScript", abbr: "JS" },
      { name: "Python", abbr: "PY" },
      { name: "PHP", abbr: "PHP" },
      { name: "Java", abbr: "JV" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    accent: "green",
    skills: [
      { name: "HTML", abbr: "HT" },
      { name: "CSS", abbr: "CS" },
      { name: "React", abbr: "Re" },
      { name: "Tailwind CSS", abbr: "TW" },
      { name: "Bootstrap", abbr: "BS" },
      { name: "SASS", abbr: "SA" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    accent: "orange",
    skills: [
      { name: "Node.js", abbr: "No" },
      { name: "Laravel", abbr: "LV" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    accent: "purple",
    skills: [
      { name: "MySQL", abbr: "MY" },
      { name: "Firebase", abbr: "FB" },
      { name: "Supabase", abbr: "SB" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Others",
    accent: "pink",
    skills: [
      { name: "Git", abbr: "GT" },
      { name: "GitHub", abbr: "GH" },
      { name: "VS Code", abbr: "VS" },
      { name: "Figma", abbr: "FG" },
    ],
  },
];
