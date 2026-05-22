import type { Certification } from "./types";
import cybersecurityEssentialsCert from "../../assets/images/Certtificate/cisco-networking-academy-cybersecurity-essentials-certificate.png";
import packetTracerCert from "../../assets/images/Certtificate/cisco-networking-academy-introduction-to-packet-tracer-certificate.png";
import juniorCyberAnalystCert from "../../assets/images/Certtificate/cisco-networking-academy-junior-cybersecurity-analyst-certificate.png";
import testInterpretationCert from "../../assets/images/Certtificate/davao-del-norte-state-college-test-interpretation-kwentuhan-kumustahan-internship-etiquette-certificate-participation.png";
import dnscAdvancedSeminarCert from "../../assets/images/Certtificate/dnsc-advanced-seminar-series-day1-journey-from-science-practitioner-to-it-specialist-certificate-completion.png";
import awsGenerativeAICert from "../../assets/images/Certtificate/aws-introduction-to-generative-ai-art-of-the-possible-certificate.png";
import trilogiUXCert from "../../assets/images/Certtificate/universitas-trilogi-user-experience-questionnaire-instruments-certificate.png";
import htmlEssentialsCert from "../../assets/images/Certtificate/cisco-networking-academy-html-essentials-statement-of-achievement.png";

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Cybersecurity Essentials",
    description:
      "Core cybersecurity concepts focused on threat defense, access control, and practical risk management.",
    year: "2024",
    issuer: "Cisco Networking Academy",
    icon: "Lock",
    accent: "purple",
    image: cybersecurityEssentialsCert,
  },
  {
    id: 2,
    title: "Introduction to Packet Tracer",
    description:
      "Hands-on network simulation training for topology design, device setup, and troubleshooting workflows.",
    year: "2023",
    issuer: "Cisco Networking Academy",
    icon: "Network",
    accent: "green",
    image: packetTracerCert,
  },
  {
    id: 3,
    title: "Junior Cybersecurity Analyst",
    description:
      "Security operations foundations including alert handling, analysis thinking, and incident-response readiness.",
    year: "2024",
    issuer: "Cisco Networking Academy",
    icon: "Shield",
    accent: "blue",
    image: juniorCyberAnalystCert,
  },
  {
    id: 4,
    title: "Test Interpretation and Internship Etiquette",
    description:
      "Participation certificate focused on workplace communication, professional conduct, and internship preparation.",
    year: "2024",
    issuer: "Davao del Norte State College",
    icon: "Award",
    accent: "orange",
    image: testInterpretationCert,
  },
  {
    id: 5,
    title: "Advanced Seminar Series Day 1",
    description:
      "Completion of seminar modules connecting science practitioner knowledge with IT specialist career pathways.",
    year: "2024",
    issuer: "DNSC",
    icon: "Code2",
    accent: "pink",
    image: dnscAdvancedSeminarCert,
  },
  {
    id: 6,
    title: "Introduction to Generative AI - Art of the Possible",
    description:
      "Completion of training on Generative AI concepts, applications, and potential implementation strategies.",
    year: "2024",
    issuer: "AWS Training & Certification",
    icon: "Award",
    accent: "orange",
    image: awsGenerativeAICert,
  },
  {
    id: 7,
    title: "User Experience Questionnaire Instruments",
    description:
      "Participation certificate focused on UX research methods and standardized user experience questionnaires.",
    year: "2024",
    issuer: "Universitas Trilogi",
    icon: "Code2",
    accent: "blue",
    image: trilogiUXCert,
  },
  {
    id: 8,
    title: "HTML Essentials",
    description:
      "Demonstrated fundamental understanding of HTML structure, elements, semantic markup, and page design concepts.",
    year: "2024",
    issuer: "Cisco Networking Academy",
    icon: "Code2",
    accent: "green",
    image: htmlEssentialsCert,
  },
];

// Badge imports
import ethicalHackerBadge from "../../assets/images/Bagdes/ethical-hacker.png";
import htmlEssentialsBadge from "../../assets/images/Bagdes/html-essentials.png";
import jrCybersecurityAnalystBadge from "../../assets/images/Bagdes/junior-cybersecurity-analyst-career-path.1.png";

export interface Badge {
  id: number;
  title: string;
  issuer: string;
  image: string;
  year: string;
  description: string;
  accent: string;
}

export const badges: Badge[] = [
  {
    id: 1,
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    year: "2024",
    description: "Verified understanding of offensive security methodologies, penetration testing, and ethical hacking principles.",
    accent: "purple",
    image: ethicalHackerBadge,
  },
  {
    id: 2,
    title: "HTML Essentials",
    issuer: "Cisco Networking Academy",
    year: "2024",
    description: "Verified fundamental understanding of HTML structure, elements, markup, and page design concepts.",
    accent: "blue",
    image: htmlEssentialsBadge,
  },
  {
    id: 3,
    title: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco Networking Academy",
    year: "2024",
    description: "Completion of the Junior Cybersecurity Analyst career pathway, covering foundational cybersecurity defense and analysis skills.",
    accent: "green",
    image: jrCybersecurityAnalystBadge,
  },
];

