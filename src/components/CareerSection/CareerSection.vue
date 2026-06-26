<template>
  <section class="career-section" id="career-section">
    <div class="career-container">
      <!-- Section Header -->
      <div class="career-header">
        <h2 class="career-title">Professional <span class="highlight">Journey</span></h2>
        <p class="career-subtitle">My track record in delivering tech solutions.</p>
      </div>

      <!-- Timeline Wrapper -->
      <div class="timeline-container" :class="{ 'has-scrollable': timelineItems.length > 2 }">
        <!-- Scrollable Wrapper -->
        <div class="timeline-scroll-wrapper" ref="scrollContainer" @scroll="handleScroll">
          <!-- Vertical Line inside scroll block -->
          <div class="timeline-line"></div>

          <!-- Timeline Items -->
          <div class="timeline-items">
            <div v-for="(item, index) in timelineItems" :key="index" class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content-box">
                <span class="timeline-date">{{ item.date }}</span>
                <h3 class="timeline-role">{{ item.role }}</h3>
                <p class="timeline-desc">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div v-if="timelineItems.length > 2 && showScrollIndicator" class="scroll-indicator-hint animated-fade-in">
          <span>Scroll for more journey</span>
          <svg viewBox="0 0 24 24" width="16" height="16" class="scroll-arrow-icon">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const timelineItems = ref([
  {
    date: "2024 - Present",
    role: "IT Project Manager at Tech Solutions EST. 2026 | Jakarta",
    desc: "Spearheaded the development and deployment of Project X1. Managed cross-functional teams of developers and designers, overseeing a project budget of Rp 2.500.000.000 while ensuring strict timeline adherence and zero scope creep."
  },
  {
    date: "2021 - 2024",
    role: "Scrum Master & Technical PM | Digital Agency | Semarang",
    desc: "Facilitated Agile ceremonies, removed blockers for the engineering team, and bridged the communication gap between stakeholders and technical execution."
  },
  {
    date: "2019 - 2021",
    role: "Junior Web Developer | Tech Startup | Bandung",
    desc: "Developed frontend landing pages and user dashboards using Vue.js and Bootstrap. Collaborated closely with UI designers to execute design layouts."
  }
]);

const scrollContainer = ref(null);
const showScrollIndicator = ref(true);

const handleScroll = () => {
  if (!scrollContainer.value) return;
  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
  // Hide indicator if scrolled near the bottom (within 20px)
  if (scrollTop + clientHeight >= scrollHeight - 20) {
    showScrollIndicator.value = false;
  } else {
    showScrollIndicator.value = true;
  }
};

onMounted(() => {
  // Check if container overflows initially, if not hide the indicator
  setTimeout(() => {
    if (scrollContainer.value) {
      const { scrollHeight, clientHeight } = scrollContainer.value;
      if (scrollHeight <= clientHeight) {
        showScrollIndicator.value = false;
      }
    }
  }, 100);
});
</script>

<style scoped>
@import './CareerSection.css';
</style>
