<template>
  <section class="testimonial-section" id="testimonial-section">
    <div class="testimonial-container">
      <!-- Section Header -->
      <div class="testimonial-header">
        <h2 class="testimonial-title">What They <span class="highlight">Say</span></h2>
      </div>

      <!-- Testimonial Grid -->
      <div class="testimonial-grid">
        <!-- Card 1 -->
        <div class="testimonial-card">
          <!-- Stylized Quote Icon -->
          <div class="quote-icon">“</div>
          <p class="review-text">"An exceptional PM who truly understands both the design aesthetic and the technical complexity. Kept our dev team perfectly on track."</p>
          <div class="author-block">
            <!-- Premium inline SVG avatar representing Lead Developer -->
            <div class="avatar-wrapper">
              <svg viewBox="0 0 100 100" class="avatar-svg">
                <circle cx="50" cy="50" r="50" fill="#424454"/>
                <circle cx="50" cy="40" r="20" fill="#F0A500"/>
                <path d="M25 75c0-15 10-25 25-25s25 10 25 25z" fill="#9FA0A6"/>
              </svg>
            </div>
            <div class="author-info">
              <span class="author-name">Musdi</span>
              <span class="author-role">Lead Developer</span>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="testimonial-card">
          <!-- Stylized Quote Icon -->
          <div class="quote-icon">“</div>
          <p class="review-text">"Incredibly organized and proactive. Handled our shifting requirements seamlessly without compromising the final delivery quality."</p>
          <div class="author-block">
            <!-- Premium inline SVG avatar representing Product Owner -->
            <div class="avatar-wrapper">
              <svg viewBox="0 0 100 100" class="avatar-svg">
                <circle cx="50" cy="50" r="50" fill="#424454"/>
                <circle cx="50" cy="40" r="20" fill="#F0A500"/>
                <path d="M22 75c0-12 8-22 28-22s28 10 28 22z" fill="#FFFFFF"/>
              </svg>
            </div>
            <div class="author-info">
              <span class="author-name">Sarah</span>
              <span class="author-role">Product Owner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Testimonial / Review Section Component
</script>

<style scoped>
@import './TestimonialSection.css';
</style>
