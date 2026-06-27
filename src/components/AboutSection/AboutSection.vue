<template>
  <section class="about-section" id="about">
    <!-- Background SideRays effect -->
    <SideRays
      :speed="2.5"
      ray-color1="#bd3636"
      ray-color2="#c46464"
      :intensity="2"
      :spread="2"
      origin="top-right"
      :tilt="0"
      :saturation="1.5"
      :blend="0.75"
      :falloff="1.6"
      :opacity="0.8"
    />

    <div class="container">
      <!-- Section Header -->
      <div class="about-header">
        <span class="about-eyebrow">— WHO AM I</span>
        <h2 class="about-title" v-html="formattedTitle"></h2>
        <p class="about-description">
          {{ description }}
        </p>
      </div>

      <!-- Bento Grid Layout -->
      <div class="bento-grid">
        <!-- Card 1: The Bio (Spans 3 columns on desktop) -->
        <div class="bento-card card-bio">
          <h3 class="card-title">The Story</h3>
          <p class="bio-text">
            {{ story }}
          </p>
        </div>

        <!-- Card 3: Project Management Stack (Spans 1 column) -->
        <div class="bento-card card-management">
          <h3 class="card-title">Management Core</h3>
          <div class="skills-wrapper">
            <span class="skill-tag tag-accent" v-for="skill in managementSkills" :key="skill">{{ skill }}</span>
          </div>
        </div>

        <!-- Card 4: Quick Stats (Spans 2 columns on desktop) -->
        <div class="bento-card card-stats">
          <div class="stat-item">
            <span class="stat-number">{{ statExperience }}</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ statDelivery }}</span>
            <span class="stat-label">Delivery Rate</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ statScope }}</span>
            <span class="stat-label">Scope Creep</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import SideRays from './SideRays.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Bridging Business Needs & Technical Execution'
  },
  description: {
    type: String,
    default: 'A hybrid approach to digital product development, combining system analysis, frontend engineering, and agile project management to deliver successful software solutions.'
  },
  story: {
    type: String,
    default: 'I am a hybrid professional who speaks both the language of code and the language of business. With a background in system analysis and frontend development (Vue/Nuxt), I transitioned into Project Management to ensure that beautiful code actually solves real-world problems. I build systems, manage timelines, and protect my team\'s focus.'
  },
  managementSkills: {
    type: Array,
    default: () => ['Agile/Scrum', 'Sprint Planning', 'Jira', 'Risk Mitigation', 'Resource Allocation']
  },
  statExperience: {
    type: String,
    default: '5+'
  },
  statDelivery: {
    type: String,
    default: '100%'
  },
  statScope: {
    type: String,
    default: 'Zero'
  }
});

// Format title dynamic highlighters
const formattedTitle = computed(() => {
  let text = props.title || '';
  const phrases = ['Business', 'Technical'];
  phrases.forEach(phrase => {
    const regex = new RegExp(phrase, 'gi');
    text = text.replace(regex, `<span class="highlight">${phrase}</span>`);
  });
  return text;
});
</script>

<style scoped>
@import './AboutSection.css';
</style>
