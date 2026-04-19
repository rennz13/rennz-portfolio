export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  accent: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Certification {
  id: number;
  title: string;
  description: string;
  year: string;
  issuer: string;
  icon: string;
  accent: string;
  image: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  accent: string;
  skills: { name: string; abbr: string }[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  accent: string;
}
