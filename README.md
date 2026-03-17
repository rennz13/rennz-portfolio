<<<<<<< HEAD
# Eal Lourence R. Boco - Portfolio

A modern, professional portfolio website for a Full-Stack Developer built with React, TypeScript, Tailwind CSS v4, and Motion.

## Tech Stack

- **React 18+** with TypeScript
- **Tailwind CSS v4** for styling
- **Motion** (formerly Framer Motion) for animations
- **Lucide React** for icons
- **Vite** for build tooling

## Project Structure

```
src/
├── app/
│   ├── App.tsx              # Main app with scroll progress bar
│   ├── components/          # All section components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── SectionHeader.tsx
│   │   └── index.ts
│   └── data/                # Data & constants
│       ├── constants.ts
│       ├── types.ts
│       ├── projects.ts
│       ├── certifications.ts
│       ├── skills.ts
│       └── services.ts
├── styles/
│   ├── fonts.css            # Google Fonts (Inter, Space Grotesk)
│   ├── theme.css            # Design system variables
│   ├── tailwind.css         # Tailwind import
│   └── index.css            # Main styles entry
├── main.tsx                 # Entry point
└── vite-env.d.ts
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

- **Profile image**: Replace the Unsplash URL in `Hero.tsx` with your photo
- **Social links**: Update URLs in `Hero.tsx` and `Footer.tsx`
- **Projects**: Edit `src/app/data/projects.ts`
- **Certifications**: Edit `src/app/data/certifications.ts`
- **CV Download**: Add your CV file and link in the Hero section
=======
# rennz-portfolio
My personal developer portfolio website
>>>>>>> d8a644dcd2bc4f1120440df614ce2167b66e4124
