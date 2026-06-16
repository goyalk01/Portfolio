# Krish Goyal — Portfolio Website

Welcome to the source code of my personal portfolio website! 🚀

This is a modern, highly interactive web application built to showcase my projects, skills, education, and achievements. I designed it to be fast, responsive, and visually engaging, using a custom glassmorphism aesthetic with subtle glowing effects and a 3D particle background.

You can view the live site here: **[Your Portfolio URL Here]**

## ✨ Features

- **Modern UI/UX**: Built with a sleek dark mode, glassmorphic cards, and dynamic gradient text.
- **Interactive Animations**: Smooth scroll effects, custom glow cursor, and page transitions powered by Framer Motion.
- **3D Background**: A lightweight, performant interactive particle system built with Three.js.
- **Dynamic Content Architecture**: The data (projects, skills, timeline) is entirely decoupled from the UI components via a centralized `master_profile.json`, making it extremely easy to update.
- **Responsive Design**: Flawless experience across desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **TypeScript**
- **Vite 7**
- **Tailwind CSS v4**
- **Framer Motion** (Animations)
- **Three.js / React Three Fiber** (3D Graphics)
- **Lucide React** (Icons)

## 🚀 Running Locally

If you'd like to run this project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/goyalk01/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

This will run TypeScript type checking and bundle the application into the `dist` directory using Vite. You can preview the production build using:

```bash
npm run preview
```

## 📂 Project Structure

```text
├── src/
│   ├── components/      # Reusable React components (UI, layout, sections)
│   ├── data/            # Centralized JSON profile data
│   ├── lib/             # Data adapters and helper functions
│   ├── pages/           # Route-level components
│   ├── types/           # TypeScript interfaces
│   ├── App.tsx          # Main application routing
│   └── index.css        # Global styles and Tailwind configuration
```

## 📫 Connect With Me

- **GitHub**: [@goyalk01](https://github.com/goyalk01)
- **LinkedIn**: [Krish Goyal](https://linkedin.com/in/goyalk01)
- **Email**: goyalk01@example.com *(Replace with real email)*

---

*Designed and developed by Krish Goyal. Feel free to use this as inspiration, but please don't clone and claim it as your own!*
