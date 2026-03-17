import { jsPDF } from "jspdf";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { certifications } from "./cv-data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, "..", "public", "cv.pdf");

// Colors - #1E88E5
const ACCENT = [30, 136, 229];
const DARK = [33, 33, 33];
const GRAY = [97, 97, 97];

const doc = new jsPDF({ unit: "mm", format: "a4" });
const pageWidth = 210;
const margin = 15;
const col1End = 102;
const col2Start = 108;

// Helper: draw horizontal line
const line = (y, color = ACCENT) => {
  doc.setDrawColor(...color);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
};

// Helper: wrapped text, returns new y
const textWrap = (text, x, y, maxWidth, fontSize = 10) => {
  doc.setFontSize(fontSize);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * (fontSize * 0.4);
};

// Helper: section heading (use Times font for reliable rendering)
const sectionHead = (title, y) => {
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...ACCENT);
  doc.text(title, margin, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...DARK);
  line(y + 1);
  return y + 8;
};

let y = 0;

// Header
doc.setFont("helvetica", "bold");
doc.setFontSize(28);
doc.setTextColor(...ACCENT);
doc.text("Eal Lourence R. Boco", margin, 22);

doc.setFont("helvetica", "normal");
doc.setFontSize(11);
doc.setTextColor(...DARK);
doc.text("Full-Stack Web Developer | BSIT Student", margin, 29);

doc.setFontSize(9);
doc.setTextColor(...GRAY);
y = textWrap(
  "Passionate and motivated Information Technology student with experience in developing web and mobile applications. Skilled in frontend and backend technologies including React, PHP, MySQL, and JavaScript. Focused on building modern, responsive, and user-friendly systems.",
  margin,
  36,
  pageWidth - margin * 2,
  9
);

// Contact
y += 4;
doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.setTextColor(...DARK);
doc.text("Email:", margin, y);
doc.text("bocoealourence@gmail.com", margin + 18, y);
y += 5;
doc.text("Phone:", margin, y);
doc.text("09929533615", margin + 18, y);
y += 5;
doc.text("Location:", margin, y);
doc.text("Carmen, Davao del Norte, Philippines", margin + 22, y);
y += 5;
doc.text("GitHub:", margin, y);
doc.text("github.com/yourusername", margin + 18, y);

line(52);
y = 60;

// Left column - Projects
y = sectionHead("PROJECTS", y);

const projects = [
  {
    name: "SignSpeak",
    desc: "Web-based platform for real-time sign language recognition and interactive learning.",
    tech: "PHP, MySQL, JavaScript, HTML, CSS, Bootstrap, Python",
  },
  {
    name: "Zyka App",
    desc: "Mobile application built using Flutter with a clean and user-friendly interface.",
    tech: "Flutter",
  },
  {
    name: "Weather Web App",
    desc: "Simple web application that displays weather information.",
    tech: "PHP",
  },
  {
    name: "FitGym",
    desc: "Fitness web application designed to promote healthy lifestyle and workouts.",
    tech: "PHP, MySQL",
  },
  {
    name: "Typrium",
    desc: "Typing game with leaderboard system to improve typing speed.",
    tech: "React, Supabase",
  },
  {
    name: "POS System",
    desc: "Web-based point-of-sale system for managing products and sales.",
    tech: "PHP, MySQL, HTML, CSS, JavaScript",
  },
];

let leftY = y;
for (const p of projects) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...ACCENT);
  doc.text(p.name, margin, leftY);
  leftY += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...DARK);
  leftY = textWrap(p.desc, margin, leftY, col1End - margin - 5, 8) + 1;
  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  doc.text(`Tech: ${p.tech}`, margin, leftY);
  leftY += 6;
}

// Right column - Skills
y = sectionHead("SKILLS", 60);

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "PHP",
  "Python",
  "MySQL",
  "Flutter",
  "Supabase",
  "Git",
  "GitHub",
  "VS Code",
];

let rightY = y;
const skillLineHeight = 6;
for (let i = 0; i < skills.length; i++) {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = col2Start + col * 48;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  doc.text("• " + skills[i], x, rightY + row * skillLineHeight);
}
rightY += Math.ceil(skills.length / 2) * skillLineHeight + 8;

// Education - full width at bottom
const eduY = Math.max(leftY, rightY) + 10;
y = sectionHead("EDUCATION", eduY);

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.setTextColor(...DARK);
doc.text("Bachelor of Science in Information Technology", margin, y);
doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.text("Davao del Norte State College", margin, y + 5);
doc.setFontSize(8);
doc.setTextColor(...GRAY);
doc.text("2022 – Present", margin, y + 10);

// Certifications (titles only)
y += 22;
y = sectionHead("CERTIFICATIONS", y);

doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.setTextColor(...DARK);
doc.text("Cisco Networking Academy", margin, y);
doc.setFontSize(8);
doc.setTextColor(...GRAY);
certifications.forEach((title, i) => {
  doc.text(`• ${title}`, margin + 5, y + 5 + i * 5);
});

writeFileSync(outputPath, Buffer.from(doc.output("arraybuffer")));
console.log("CV generated at public/cv.pdf");
