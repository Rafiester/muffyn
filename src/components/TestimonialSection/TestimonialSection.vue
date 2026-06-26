<template>
  <section class="testimonial-section" id="testimonial">
    <div class="testimonial-container">
      <!-- Section Header -->
      <div class="testimonial-header">
        <!-- Section Prefix -->
        <div class="section-prefix">
          <span class="prefix-line"></span>
          <span class="prefix-text">{{ prefix }}</span>
        </div>
        <h2 class="testimonial-title" v-html="formattedTitle"></h2>
      </div>

      <!-- Testimonial Grid -->
      <div class="testimonial-grid">
        <div v-for="(item, index) in testimonials" :key="index" class="testimonial-card">
          <!-- Stylized Quote Icon -->
          <div class="quote-icon">“</div>
          <p class="review-text">{{ item.text }}</p>
          <div class="author-block">
            <div class="avatar-wrapper">
              <svg viewBox="0 0 100 100" class="avatar-svg">
                <circle cx="50" cy="50" r="50" fill="#424454"/>
                <circle cx="50" cy="40" r="20" fill="#F0A500"/>
                <path d="M25 75c0-15 10-25 25-25s25 10 25 25z" fill="#9FA0A6"/>
              </svg>
            </div>
            <div class="author-info">
              <span class="author-name">{{ item.name }}</span>
              <span class="author-role">{{ item.role }}</span>
            </div>
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
    default: 'TESTIMONIAL'
  },
  title: {
    type: String,
    default: 'What They Say'
  },
  testimonials: {
    type: Array,
    default: () => []
  }
});

const formattedTitle = computed(() => {
  let text = props.title || 'What They Say';
  const regex = new RegExp('Say', 'gi');
  return text.replace(regex, `<span class="highlight">Say</span>`);
});
</script>

<style scoped>
@import './TestimonialSection.css';
</style>
