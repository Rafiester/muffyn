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
        <a href="#services" class="nav-link">Services</a>
        <a href="#portfolio" class="nav-link">Portfolio</a>
        <a href="#experience" class="nav-link">Experience</a>
        <a href="#about" class="nav-link">About me</a>
      </nav>

      <!-- CTA (Desktop) -->
      <div class="navbar-actions">
        <a href="https://wa.me/6281336191660" target="_blank" rel="noopener noreferrer" class="btn-pill">Get In Touch</a>
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
        <a href="#services" class="mobile-link" @click="closeMenu">Services</a>
        <a href="#portfolio" class="mobile-link" @click="closeMenu">Portfolio</a>
        <a href="#experience" class="mobile-link" @click="closeMenu">Experience</a>
        <a href="#about" class="mobile-link" @click="closeMenu">About me</a>
        <a href="https://wa.me/6281336191660" target="_blank" rel="noopener noreferrer" class="btn-pill mobile-contact-btn" @click="closeMenu">Get In Touch</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  logo: {
    type: String,
    default: 'RAFI'
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
