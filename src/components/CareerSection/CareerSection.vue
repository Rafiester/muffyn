<template>
  <section class="career-section" id="experience">
    <div class="career-container">
      <!-- Section Header -->
      <div class="career-header">
        <!-- Section Prefix -->
        <div class="section-prefix">
          <span class="prefix-line"></span>
          <span class="prefix-text">{{ prefix }}</span>
        </div>
        <h2 class="career-title" v-html="formattedTitle"></h2>
        <p class="career-subtitle">{{ subtitle }}</p>
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
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  prefix: {
    type: String,
    default: 'EXPERIENCE'
  },
  title: {
    type: String,
    default: 'Professional Journey'
  },
  subtitle: {
    type: String,
    default: 'My track record in delivering tech solutions.'
  },
  timelineItems: {
    type: Array,
    default: () => []
  }
});

const formattedTitle = computed(() => {
  let text = props.title || 'Professional Journey';
  const regex = new RegExp('Journey', 'gi');
  return text.replace(regex, `<span class="highlight">Journey</span>`);
});

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
