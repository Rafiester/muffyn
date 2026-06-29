# Rafiester Portfolio - Complete Documentation

Welcome to the technical documentation for the Rafiester Portfolio project. This document serves as a guide for developers looking to understand the project structure, features, component APIs, data architecture, and custom interactive components.

---

## 📂 Directory Structure

```
├── docs/
│   ├── AI_COMMAND.md         # Component integration instruction guidelines
│   └── documentation.md      # This file (Complete project documentation)
├── public/                   # Static assets (images, CV, icons)
├── src/
│   ├── assets/               # CSS styles & global assets
│   ├── components/           # Reusable Vue components
│   │   ├── AboutSection/     # Who Am I, SideRays, DecryptedText components
│   │   ├── Admin/            # Admin authorization pages
│   │   ├── CareerSection/    # Journey Timeline component
│   │   ├── CaseStudySection/ # Portfolio cards, ElectricBorder, Detail popup
│   │   ├── HeroSection/      # SpotlightMesh and Hero layout
│   │   ├── Navbar/           # Main navigation header
│   │   ├── ScrollVelocity/   # Dynamic text scrolling components
│   │   └── UspSection/       # Services and details list
│   ├── views/                # Full page views (Home, Dashboard)
│   ├── localCms.js           # Client-side CMS helper layer
│   ├── main.js               # Application bootstrap entrypoint
│   └── style.css             # Main styling system, variables, and reset
├── index.html                # HTML template entrypoint
├── package.json              # Script directives and node modules list
└── vite.config.js            # Bundler configurations
```

---

## 🛠️ Technology Stack & Core Features

* **Vue 3 (Composition API)**: Standard reactive framework using the `<script setup>` tag pattern.
* **Vite**: Ultra-fast next-generation frontend toolchain.
* **Three.js & GLSL Shaders**: GPU-accelerated backdrop animations in the Hero section using custom shaders.
* **Local Storage Content Management**: A client-side database model that stores copy, images, lists, and links, allowing the portfolio content to be edited via the CMS Dashboard.

---

## 💾 CMS & Data Layer (`localCms.js`)

All layout text, profile data, links, work items, and timelines are fetched from local storage. The `src/localCms.js` file handles initial fallback setup, migration checks, data loading, and serialization.

### Site Data Schema (`DEFAULT_SITE_DATA`)

```javascript
{
  navbar_logo: 'PORTFOLIO',
  meta_title: 'Rafiester Portfolio',
  meta_description: 'Professional portfolio showcasing UI/UX and Web Development.',
  hero_prefix: 'CREATIVE DEVELOPER',
  hero_title: 'I HAVE GRAPHIC DESIGN OR WEB DEVELOP EXPERIENCE',
  hero_description: 'i have many years experience with social media design...',
  portrait_url: '/avatar.png',
  
  // Custom CV download links
  cv_data: '',
  cv_filename: 'cv.pdf',
  cv_button_text: 'Download CV',

  // Services
  usp_title: 'Specialized In',
  usp_description: 'A list of services and technical offerings.',
  usp_services: [
    { title: 'UI/UX Design', projects: '100+ Project', description: '...', tags: 'Figma, UI/UX' },
    ...
  ],

  // Case Studies / Portfolio Cards
  case_studies_title: 'Case Studies',
  case_studies_description: 'A showcase of my recent creative works...',
  case_studies: [],

  // Career timeline
  career_prefix: 'EXPERIENCE',
  career_title: 'Professional Journey',
  career_subtitle: 'My track record in delivering tech solutions.',
  career_items: [],

  // About Section bento box metrics
  about_title: 'Bridging Business Needs & Technical Execution',
  about_description: 'A hybrid approach...',
  about_story: 'I am a hybrid professional...',
  about_management_skills: ['Agile/Scrum', 'Sprint Planning', ...],
  about_stat_experience: '5+',
  about_stat_delivery: '100%',
  about_stat_scope: 'Zero'
}
```

---

## 🧩 Visual & Functional Components

### 1. `SpotlightMesh.vue` (WebGL Backdrop)
Renders a responsive `<canvas>` running a custom fragment shader inside Three.js. It receives mouse position updates dynamically to warp the glowing background mesh under the pointer.

### 2. `ElectricBorder.vue`
A specialized high-performance canvas border wrapper that traces the perimeter of bento grid cards. Uses 2D simplex noise algorithm loops to animate neon light distortions around elements.

* **Props**:
  * `color`: Neon line color (HEX or RGB). Default: `#28FF85`.
  * `speed`: Speed multiplier. Default: `1`.
  * `chaos`: Random noise path deflection amplitude. Default: `0.12`.
  * `borderRadius`: Border radius in pixels. Default: `24`.

### 3. Case Studies Popup (`CaseStudySection.vue`)
An interactive overlay activated when the user clicks "See More" on a portfolio card.
* **Layout**: Uses a simplified, glassmorphism modal design (`simple-modal`) showing:
  * Portfolio Item Title
  * Mirrored Image / SVG representation matching the clicked card
  * Complete full-text description
  * A top-right close `×` button for clean navigation
* **Backdrop**: Acrylic blur (`backdrop-filter: blur(16px)`).

### 4. Journey Timeline (`CareerSection.vue`)
Renders an experience timeline containing a scrollable container with interactive indicators that disappear when the timeline has been scrolled to the bottom.

---

## 🔒 Security & Admin Panel (`src/views/Dashboard.vue`)

The admin dashboard allows live editing of the site's content.
* **Access**: Secured by a client-side login check (`src/components/Admin/Login.vue`).
* **Features**:
  * Input forms for metadata, title headings, and descriptive texts.
  * Interactive arrays for managing service cards, portfolio items, and career timeline items (add, delete, reorder).
  * Base64 image uploader for replacing profile photos and portfolio card icons.
  * Local Storage synchronizer with JSON backup copy import/export features.
