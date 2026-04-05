import type { Project } from "./types";
import fitgymImg from "../../assets/images/fitgym.png";
import signspeakImg from "../../assets/images/signspeak.png";
import typeriumImg from "../../assets/images/typerium.png";
import elixAiImg from "../../assets/images/elix-ai.png";
import sonaraImg from "../../assets/images/Sonara music playlist.png";
import eatOScanImg from "../../assets/images/Eat O` Scan.png";

export const projects: Project[] = [
  {
    id: 1,
    title: "SignSpeak",
    description:
      "A sign language recognition web application that bridges communication gaps using computer vision and machine learning for real-time translation.",
    techStack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Bootstrap", "Python"],
    image: signspeakImg,
    accent: "blue",
    featured: true,
  },
  {
    id: 2,
    title: "Zyka App",
    description:
      "A beautifully designed mobile application built with Flutter featuring an intuitive user interface and smooth cross-platform experience.",
    techStack: ["Flutter"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    accent: "green",
  },
  {
    id: 3,
    title: "Weather Web App",
    description:
      "A clean and minimal weather application that provides real-time weather data, forecasts, and location-based weather information.",
    techStack: ["PHP"],
    image: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=800&h=600&fit=crop",
    accent: "cyan",
  },
  {
    id: 4,
    title: "FitGym",
    description:
      "A comprehensive gym management system with member tracking, workout planning, and subscription management built for fitness centers.",
    techStack: ["PHP", "MySQL"],
    image: fitgymImg,
    accent: "orange",
  },
  {
    id: 5,
    title: "Typrium",
    description:
      "A real-time typing speed test application with leaderboards, statistics tracking, and competitive typing challenges powered by Supabase.",
    techStack: ["React", "Supabase"],
    image: typeriumImg,
    accent: "purple",
  },
  {
    id: 6,
    title: "Elix AI",
    description:
      "A modern AI-powered chatbot application with a sleek chat interface, prompt credit system, and Supabase authentication for seamless user experience.",
    techStack: ["React", "Supabase", "TypeScript"],
    image: elixAiImg,
    accent: "violet",
  },
  {
    id: 7,
    title: "Sonara",
    description:
      "A premium dark-themed music discovery and playlist web application with a sleek sidebar, interactive music cards, and a sticky music player for an immersive listening experience.",
    techStack: ["React", "TypeScript", "Vite"],
    image: sonaraImg,
    accent: "pink",
    featured: true,
  },
  {
    id: 8,
    title: "POS System",
    description:
      "A feature-rich Point of Sale system for retail businesses with inventory management, sales tracking, and receipt generation.",
    techStack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    accent: "pink",
  },
  {
    id: 9,
    title: "Eat O' Scan",
    description:
      "A smart food scanning project focused on quickly identifying meals and improving nutrition tracking with a simple, user-friendly experience.",
    techStack: ["React", "TypeScript"],
    image: eatOScanImg,
    accent: "green",
    featured: true,
  },
];
