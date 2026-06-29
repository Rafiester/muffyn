<template>
  <section ref="heroRef" class="hero-section" id="home">
    <!-- WebGL Background Canvas -->
    <Balatro class="bg-canvas" :color1="themeAccent" />

    <!-- Custom Follower Cursor -->
    <div 
      class="custom-cursor" 
      :class="{ 'visible': isCursorVisible }" 
      :style="{ transform: `translate3d(${cursorX}px, ${cursorY}px, 0)` }"
    ></div>

    <div class="container hero-container">
      <!-- Left Column: Content -->
      <div class="hero-content">
        <!-- Prefix Wording -->
        <div class="hero-prefix">
          <span class="prefix-line"></span>
          <span class="prefix-text">{{ prefix }}</span>
        </div>
        
        <!-- Render typing title effect -->
        <TextType
          as="h1"
          class="hero-title"
          :text="title"
          :loop="false"
          :show-cursor="true"
          cursor-character="|"
          :typing-speed="125"
        />
        
        <p class="hero-description">
          {{ description }}
        </p>
        
        <div class="hero-actions">
          <a 
            v-if="cvData" 
            :href="cvData" 
            :download="cvFilename || 'CV.pdf'" 
            class="btn-pill"
          >{{ cvButtonText || 'Download CV' }}</a>
          <span v-else class="btn-pill btn-pill-disabled" style="opacity: 0.5; cursor: not-allowed;">{{ cvButtonText || 'Download CV' }}</span>
          
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
              <svg v-else-if="social.platform.toLowerCase() === 'instagram'" viewBox="0 0 24 24" class="icon-svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor"/>
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

    <!-- Scroll Down Indicator -->
    <div class="scroll-down-indicator" @click="scrollToContent" role="button" aria-label="Scroll down to services">
      <div class="mouse-icon">
        <span class="mouse-wheel"></span>
      </div>
      <span class="scroll-text">Scroll Down</span>
    </div>

    <!-- Bottom Overlapping Banner (Client Logos) - Placed outside container and centered -->
    <div class="client-banner">
      <span 
        v-for="(client, index) in clientLogos" 
        :key="index"
        class="client-logo-item"
      >
        <!-- Render client logo: uploaded image overrides SVG -->
        <template v-if="client.logo_data">
          <img :src="client.logo_data" :alt="client.name" class="client-banner-img" />
        </template>
        <template v-else>
          <span class="fallback-client-text">{{ client.name }}</span>
        </template>
      </span>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import TextType from './TextType.vue';
import Balatro from './Balatro.vue';

const props = defineProps({
  prefix: {
    type: String,
    default: 'RAFIESTER'
  },
  title: {
    type: String,
    default: 'PROJECT MANAGER & \n SYSTEM ANALYST'
  },
  description: {
    type: String,
    default: 'Crafting precise digital products with Vue.js, Nuxt, and the modern web stack.'
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
  },
  cvData: {
    type: String,
    default: ''
  },
  cvFilename: {
    type: String,
    default: ''
  },
  cvButtonText: {
    type: String,
    default: 'Download CV'
  },
  themeAccent: {
    type: String,
    default: '#bd3636'
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

const scrollToContent = () => {
  const el = document.getElementById('services');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const heroRef = ref(null);
const cursorX = ref(0);
const cursorY = ref(0);
const isCursorVisible = ref(false);

const handleMouseMove = (e) => {
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;
  isCursorVisible.value = true;
};

const handleMouseLeave = () => {
  isCursorVisible.value = false;
};

onMounted(() => {
  const heroEl = heroRef.value;
  if (heroEl) {
    heroEl.addEventListener('mousemove', handleMouseMove);
    heroEl.addEventListener('mouseleave', handleMouseLeave);
  }
});

onUnmounted(() => {
  const heroEl = heroRef.value;
  if (heroEl) {
    heroEl.removeEventListener('mousemove', handleMouseMove);
    heroEl.removeEventListener('mouseleave', handleMouseLeave);
  }
});
</script>

<style scoped>
@import './HeroSection.css';
</style>
