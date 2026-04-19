import type { Certification } from "./types";
import cybersecurityEssentialsCert from "../../assets/images/Certtificate/cisco-networking-academy-cybersecurity-essentials-certificate.png";
import packetTracerCert from "../../assets/images/Certtificate/cisco-networking-academy-introduction-to-packet-tracer-certificate.png";
import juniorCyberAnalystCert from "../../assets/images/Certtificate/cisco-networking-academy-junior-cybersecurity-analyst-certificate.png";
import testInterpretationCert from "../../assets/images/Certtificate/davao-del-norte-state-college-test-interpretation-kwentuhan-kumustahan-internship-etiquette-certificate-participation.png";
import dnscAdvancedSeminarCert from "../../assets/images/Certtificate/dnsc-advanced-seminar-series-day1-journey-from-science-practitioner-to-it-specialist-certificate-completion.png";

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
];
