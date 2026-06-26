<template>
  <section class="hero-section" id="home">
    <div class="container hero-container">
      
      <!-- Left Column: Content -->
      <div class="hero-content">
        <!-- Prefix Wording -->
        <div class="hero-prefix">
          <span class="prefix-line"></span>
          <span class="prefix-text">{{ prefix }}</span>
        </div>
        
        <!-- Render formatted title with highlight spans using v-html -->
        <h1 class="hero-title" v-html="formattedTitle"></h1>
        
        <p class="hero-description">
          {{ description }}
        </p>
        
        <div class="hero-actions">
          <a href="#contact" class="btn-pill">Hire Me</a>
          
          <div class="social-links">
            <a 
              v-for="(social, index) in socialLinks" 
              :key="index"
              :href="social.url || '#'" 
              class="social-icon"
              :class="{ 'accent-bg': social.is_accent }" 
              :aria-label="social.platform"
            >
              <!-- Render SVG based on platform name (case-insensitive) -->
              <svg v-if="social.platform.toLowerCase() === 'dribbble'" viewBox="0 0 24 24" class="icon-svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm8.16 9.06c-.34-.08-2.38-.54-4.81-.25.88 2.42 1.25 4.89 1.34 5.56 1.95-1.39 3.12-3.66 3.47-5.31zm-1.63 7.03c-.15-.71-.56-3.34-1.57-5.91-2.48-.12-4.9.46-5.24.55-.07.2-.15.41-.23.63-.82 2.37-1.65 4.81-1.78 5.25.96.48 2.03.75 3.16.75 2.19 0 4.16-.86 5.66-2.27zM8.34 20.08c.17-.46.99-2.73 1.83-5.11-.12.04-.24.08-.36.13-3.18 1.15-4.28 3.51-4.38 3.75 1.14 1.1 2.66 1.77 4.35 1.77.29 0 .58-.02.86-.06l-.3-.48zm-4.78-4.24c.14-.29 1.63-3.23 5.09-4.5.17-.06.34-.12.51-.17-.18-.41-.37-.83-.56-1.25-3.35.53-6.61.43-6.93.42C2.08 11.23 2 11.61 2 12c0 1.54.49 2.97 1.32 4.14l.24-.3zM2.87 9.1c.36.01 3.2.06 6.35-.45-.48-1-1-2.02-1.51-2.97C5.07 6.45 3.63 7.6 2.87 9.1zm6.27-3.95c.53.94 1.05 1.95 1.52 2.94 2.22-.72 4.41-1.8 4.79-2.01-.89-.78-2.04-1.28-3.31-1.28-1.12 0-2.18.36-3 1.35z"/>
              </svg>
              <svg v-else-if="social.platform.toLowerCase() === 'github'" viewBox="0 0 24 24" class="icon-svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.162 22 16.418 22 12c0-5.523-4.478-10-10-10z"/>
              </svg>
              <svg v-else-if="social.platform.toLowerCase() === 'behance'" viewBox="0 0 24 24" class="icon-svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zM9.54 15.33c-.22.25-.5.45-.83.61s-.72.24-1.16.24H5.32V7.82h2.09c.81 0 1.45.19 1.93.58.48.39.72.93.72 1.63 0 .54-.15.98-.44 1.33s-.7.6-1.23.75c.67.17 1.18.5 1.52.98.34.48.51 1.07.51 1.78.01.55-.12.98-.38 1.46zm5.82-3.8h3.31v.83h-3.31v-.83zm4.56 2.51c-.13.56-.37 1.04-.73 1.43s-.8.69-1.32.91-1.11.32-1.76.32c-.93 0-1.74-.23-2.42-.71a4.26 4.26 0 01-1.58-1.92c-.36-.81-.54-1.74-.54-2.79s.19-2 .57-2.82c.38-.82.93-1.46 1.64-1.92s1.58-.69 2.59-.69c.89 0 1.64.19 2.26.56.62.37 1.1.91 1.44 1.61s.5 1.54.5 2.52h-6.27c0 .87.21 1.54.63 2.01s.99.71 1.7.71c.49 0 .9-.1 1.25-.29s.61-.46.78-.81l.73.29zm-3.08-4.22c-.49 0-.89.15-1.19.46s-.47.78-.5 1.41h3.31c-.01-.63-.16-1.11-.46-1.42s-.68-.45-1.16-.45zM6.92 9.2v2.24H7.5c.37 0 .66-.08.88-.24s.33-.42.33-.78c0-.36-.11-.62-.33-.78-.22-.16-.51-.24-.88-.24H6.92zm0 3.66v2.37h.67c.41 0 .73-.1.97-.29s.36-.49.36-.89-.12-.68-.37-.86-.56-.27-.97-.27H6.92z"/>
              </svg>
              <svg v-else-if="social.platform.toLowerCase() === 'linkedin'" viewBox="0 0 24 24" class="icon-svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <!-- Generic fallback icon -->
              <svg v-else viewBox="0 0 24 24" class="icon-svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom Overlapping Banner (Client Logos) -->
    <div class="client-banner">
      <span 
        v-for="(client, index) in clientLogos" 
        :key="index"
        class="client-logo-item"
      >
        <!-- Render custom inline SVG from CMS if available -->
        <span v-if="client.logo_svg" v-html="client.logo_svg"></span>
        
        <!-- Standard Vector SVGs based on client brand name -->
        <template v-else>
          <svg v-if="client.name.toLowerCase() === 'asus'" viewBox="0 0 80 20" class="client-logo-svg" aria-label="ASUS">
            <text x="50%" y="15" font-family="'Poppins', sans-serif" font-weight="900" font-size="16" fill="currentColor" text-anchor="middle" letter-spacing="1">ASUS</text>
          </svg>
          <svg v-else-if="client.name.toLowerCase() === 'allianz'" viewBox="0 0 100 24" class="client-logo-svg" aria-label="Allianz">
            <g fill="currentColor">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
              <rect x="8" y="7" width="2" height="10" rx="0.5"/>
              <rect x="11" y="6" width="2" height="12" rx="0.5"/>
              <rect x="14" y="7" width="2" height="10" rx="0.5"/>
              <text x="28" y="17" font-family="'Poppins', sans-serif" font-weight="700" font-size="11" letter-spacing="0.5">Allianz</text>
            </g>
          </svg>
          <svg v-else-if="client.name.toLowerCase() === 'chase'" viewBox="0 0 100 24" class="client-logo-svg" aria-label="CHASE">
            <g fill="currentColor">
              <path d="M12 4 L18 4 L20 6 L20 12 L18 14 L12 14 L10 12 L10 6 Z" fill="none" stroke="currentColor" stroke-width="2"/>
              <path d="M12 4 L18 4 L18 7 L12 7 Z"/>
              <path d="M17 7 L20 7 L20 12 L17 12 Z"/>
              <path d="M12 11 L18 11 L18 14 L12 14 Z"/>
              <path d="M10 7 L13 7 L13 12 L10 12 Z"/>
              <text x="26" y="17" font-family="'Poppins', sans-serif" font-weight="800" font-size="12" letter-spacing="1">CHASE</text>
            </g>
          </svg>
          <svg v-else-if="client.name.toLowerCase() === 'the new york times'" viewBox="0 0 150 24" class="client-logo-svg" aria-label="The New York Times">
            <text x="50%" y="16" font-family="'Georgia', serif" font-weight="bold" font-style="italic" font-size="11" fill="currentColor" text-anchor="middle" letter-spacing="0.5">The New York Times</text>
          </svg>
          <svg v-else-if="client.name.toLowerCase() === 'linkedin'" viewBox="0 0 90 24" class="client-logo-svg" aria-label="LinkedIn">
            <g fill="currentColor">
              <text x="0" y="17" font-family="'Poppins', sans-serif" font-weight="700" font-size="14">Linked</text>
              <rect x="58" y="3" width="18" height="18" rx="3"/>
              <text x="67" y="16" font-family="'Poppins', sans-serif" font-weight="800" font-size="12" fill="#32333F" text-anchor="middle">in</text>
            </g>
          </svg>
          <span v-else class="fallback-client-text">{{ client.name }}</span>
        </template>
      </span>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  prefix: {
    type: String,
    default: 'RAFIESTER'
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  portraitUrl: {
    type: String,
    default: '/avatar.png'
  },
  socialLinks: {
    type: Array,
    default: () => []
  },
  clientLogos: {
    type: Array,
    default: () => []
  }
});

// Format title dynamic highlighters
const formattedTitle = computed(() => {
  let text = props.title;
  if (!text) return '';
  
  // Enforce strict limit of maximum 3 lines
  const lines = text.split('\n');
  const truncatedLines = lines.slice(0, 3);
  
  // Wrap each line in a span to prevent inner wrapping and enforce block layout
  text = truncatedLines.map(line => `<span class="title-line-wrap">${line}</span>`).join('');
  
  const phrases = ['GRAPHIC DESIGN', 'WEB DEVELOP'];
  phrases.forEach(phrase => {
    const regex = new RegExp(phrase, 'gi');
    text = text.replace(regex, `<span class="highlight">${phrase}</span>`);
  });
  return text;
});
</script>

<style scoped>
@import './HeroSection.css';
</style>
