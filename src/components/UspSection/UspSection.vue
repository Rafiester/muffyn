<template>
  <section class="usp-section" id="services">
    <div class="container usp-container">
      
      <!-- Section Header (Title & Description above cards) -->
      <div class="usp-header">
        <!-- Section Prefix -->
        <div class="section-prefix">
          <span class="prefix-line"></span>
          <span class="prefix-text">{{ prefix }}</span>
        </div>
        <h2 class="usp-title" v-html="formattedTitle"></h2>
        <p class="usp-description">
          {{ description }}
        </p>
      </div>

      <!-- Services Grid/List -->
      <div class="usp-right">
        
        <!-- Services Loop -->
        <div v-for="(service, index) in services" :key="index" class="service-row">
          <div class="service-thumbnail">
            <!-- Render Laptop SVG Visual Mockup for first item -->
            <svg v-if="index === 0" viewBox="0 0 100 70" class="thumbnail-svg">
              <rect x="15" y="10" width="70" height="46" rx="4" fill="#2d303e" stroke="#484d63" stroke-width="1.5"/>
              <rect x="20" y="15" width="60" height="36" rx="2" fill="#1e1f26"/>
              <rect x="25" y="19" width="16" height="12" rx="1" fill="#bd3636" opacity="0.8"/>
              <rect x="45" y="19" width="30" height="4" rx="1" fill="#ffffff" opacity="0.3"/>
              <rect x="45" y="27" width="24" height="4" rx="1" fill="#ffffff" opacity="0.2"/>
              <circle cx="28" cy="37" r="2" fill="#ffffff" opacity="0.4"/>
              <circle cx="34" cy="37" r="2" fill="#ffffff" opacity="0.4"/>
              <path d="M5 56 h90 l-5 6 h-80 z" fill="#484d63"/>
              <line x1="45" y1="59" x2="55" y2="59" stroke="#1e1f26" stroke-width="1.5" stroke-linecap="round"/>
            </svg>

            <!-- Render Whiteboard sketches SVG Visual Mockup for second item -->
            <svg v-else-if="index === 1" viewBox="0 0 100 70" class="thumbnail-svg">
              <rect x="10" y="8" width="80" height="54" rx="4" fill="#2d303e" stroke="#484d63" stroke-width="1.5"/>
              <rect x="14" y="12" width="72" height="46" rx="2" fill="#1e1f26"/>
              <rect x="20" y="18" width="12" height="12" fill="#ff5252" opacity="0.8" transform="rotate(-5, 26, 24)"/>
              <rect x="38" y="17" width="12" height="12" fill="#bd3636" opacity="0.8" transform="rotate(3, 44, 23)"/>
              <rect x="56" y="20" width="12" height="12" fill="#4caf50" opacity="0.8" transform="rotate(-8, 62, 26)"/>
              <rect x="28" y="38" width="12" height="12" fill="#00bcd4" opacity="0.8" transform="rotate(6, 34, 44)"/>
              <path d="M32 24 Q44 32 38 44" stroke="#ffffff" stroke-width="1" stroke-dasharray="2 2" fill="none" opacity="0.3"/>
              <path d="M50 23 Q60 30 62 26" stroke="#ffffff" stroke-width="1" stroke-dasharray="2 2" fill="none" opacity="0.3"/>
            </svg>

            <!-- Render Mobile Screen interface SVG Visual Mockup for third item -->
            <svg v-else viewBox="0 0 100 70" class="thumbnail-svg">
              <rect x="10" y="8" width="80" height="54" rx="4" fill="#2d303e" stroke="#484d63" stroke-width="1.5"/>
              <rect x="14" y="12" width="72" height="46" rx="2" fill="#1e1f26"/>
              <rect x="36" y="14" width="28" height="42" rx="3" fill="#111" stroke="#484d63" stroke-width="1"/>
              <rect x="38" y="16" width="24" height="38" rx="1.5" fill="#1e1f26"/>
              <rect x="41" y="19" width="18" height="10" rx="1" fill="#bd3636" opacity="0.9"/>
              <rect x="41" y="32" width="18" height="4" rx="0.5" fill="#ffffff" opacity="0.4"/>
              <rect x="41" y="38" width="12" height="4" rx="0.5" fill="#ffffff" opacity="0.2"/>
              <circle cx="50" cy="46" r="3" fill="#ffffff" opacity="0.3"/>
            </svg>
          </div>
          <div class="service-meta">
            <h3 class="service-title">{{ service.title }}</h3>
            <p v-if="service.description" class="service-desc">{{ service.description }}</p>
            <div v-if="service.tags && service.tags.trim()" class="service-tags">
              <span 
                v-for="(tag, tagIdx) in service.tags.split(',').map(t => t.trim()).filter(Boolean)" 
                :key="tagIdx" 
                class="service-tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="service-arrow">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>
        </div>

      </div>
      
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  prefix: {
    type: String,
    default: 'SERVICES'
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  services: {
    type: Array,
    default: () => []
  }
});

// Format title dynamic highlighters
const formattedTitle = computed(() => {
  let text = props.title;
  if (!text) return '';
  const phrases = ['Your Needs', 'needs'];
  phrases.forEach(phrase => {
    const regex = new RegExp(phrase, 'gi');
    text = text.replace(regex, `<span class="highlight">${phrase}</span>`);
  });
  return text;
});
</script>

<style scoped>
@import './UspSection.css';
</style>
