<template>
  <header class="navbar-header" :class="{ 'scrolled': isScrolled }">
    <div class="container navbar-container">
      <!-- Logo -->
      <a href="#home" class="navbar-logo">
        {{ logo }}
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="navbar-links">
        <a href="#home" class="nav-link active">Home</a>
        <a href="#about" class="nav-link">About Me</a>
        <a href="#service" class="nav-link">Service</a>
        <a href="#testimonial" class="nav-link">Testimonial</a>
      </nav>

      <!-- CTA (Desktop) -->
      <div class="navbar-actions">
        <a href="#contact" class="btn-pill">Contact</a>
      </div>

      <!-- Hamburger Menu Button -->
      <button 
        class="navbar-hamburger" 
        :class="{ 'is-active': isMenuOpen }" 
        @click="toggleMenu"
        aria-label="Toggle Navigation Menu"
        id="navbar-toggle-btn"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- Mobile Navigation Menu -->
    <div class="mobile-nav" :class="{ 'is-open': isMenuOpen }" id="mobile-navigation-menu">
      <nav class="mobile-links">
        <a href="#home" class="mobile-link" @click="closeMenu">Home</a>
        <a href="#about" class="mobile-link" @click="closeMenu">About Me</a>
        <a href="#service" class="mobile-link" @click="closeMenu">Service</a>
        <a href="#testimonial" class="mobile-link" @click="closeMenu">Testimonial</a>
        <a href="#contact" class="btn-pill mobile-contact-btn" @click="closeMenu">Contact</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  logo: {
    type: String,
    default: 'PORTFOLIO'
  }
});

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // Prevent scrolling when mobile menu is open
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});
</script>

<style scoped>
@import './Navbar.css';
</style>
