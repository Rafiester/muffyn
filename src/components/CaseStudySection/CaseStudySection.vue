<template>
  <section class="case-study-section" id="portfolio">
    <div class="case-study-container">
      <!-- Section Header -->
      <div class="case-study-header">
        <!-- Section Prefix -->
        <div class="section-prefix">
          <span class="prefix-line"></span>
          <span class="prefix-text">{{ prefix }}</span>
        </div>
        <h2 class="section-title">{{ title }}</h2>
        <p class="section-desc">{{ description }}</p>
      </div>

      <div class="case-study-grid">
        <div v-for="(card, index) in displayCards" :key="index" class="case-card">
          <div class="icon-circle">
            <!-- UI/UX Ruler & Pencil Icon -->
            <svg v-if="card.icon_type === 'design' || (!card.icon_type && index === 0)" class="service-icon" viewBox="0 0 24 24" width="28" height="28">
              <path d="M14.7 5.7l-1.4-1.4c-.4-.4-1-.4-1.4 0L3.5 12.7c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0L14.7 7.1c.4-.4.4-1 0-1.4zm-9.1 7.7l-.7-.7.7-.7.7.7-.7.7zm15.1-6.1l-2.1-2.1c-.4-.4-1-.4-1.4 0L15.8 6.6c-.4.4-.4 1 0 1.4l2.1 2.1c.4.4 1 .4 1.4 0l1.4-1.4c.4-.4.4-1 0-1.4z" fill="currentColor"/>
              <path d="M4 20h3l11-11-3-3L4 17v3z" fill="currentColor"/>
            </svg>
            
            <!-- Web Design Browser Icon -->
            <svg v-else-if="card.icon_type === 'web' || (!card.icon_type && index === 1)" class="service-icon" viewBox="0 0 24 24" width="28" height="28">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" fill="currentColor"/>
            </svg>
            
            <!-- Mobile App Screen Icon -->
            <svg v-else class="service-icon" viewBox="0 0 24 24" width="28" height="28">
              <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" fill="currentColor"/>
              <path d="M16 8l-1.41-1.41L11.17 10l3.42 3.41L16 12l-2-2zM8 12l2 2 1.41-1.41L8 9.17 9.41 7.76 8 6.35z" fill="currentColor"/>
            </svg>
          </div>
          
          <h3 class="card-title-text">{{ card.title }}</h3>
          <p class="card-desc-text">{{ card.desc }}</p>
          <div class="card-action">
            <button class="btn-see-more">{{ card.button_text || 'See More' }}</button>
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
    default: 'PORTFOLIO'
  },
  title: {
    type: String,
    default: 'Case Studies'
  },
  description: {
    type: String,
    default: 'A showcase of my recent creative works, system configurations, and frontend development projects.'
  },
  cards: {
    type: Array,
    default: () => []
  }
});

// Fallback to initial defaults if no CMS data exists
const defaultCards = [
  { title: 'Ui/Ux Design', desc: 'i have many years experience with social media design, creating art work and designs that will promote businesses. i have a lot', button_text: 'See More', icon_type: 'design' },
  { title: 'Web Design', desc: 'i have many years experience with social media design, creating art work and designs that will promote businesses. i have a lot', button_text: 'See More', icon_type: 'web' },
  { title: 'Ui/Ux Design', desc: 'i have many years experience with social media design, creating art work and designs that will promote businesses. i have a lot', button_text: 'See More', icon_type: 'mobile' }
];

const displayCards = computed(() => {
  if (!props.cards || props.cards.length === 0) {
    return defaultCards;
  }
  return props.cards;
});
</script>

<style scoped>
@import './CaseStudySection.css';
</style>
