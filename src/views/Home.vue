<script setup>
import { ref, onMounted } from 'vue';
import { localCms } from '../localCms';
import Navbar from '../components/Navbar/Navbar.vue';
import HeroSection from '../components/HeroSection/HeroSection.vue';
import UspSection from '../components/UspSection/UspSection.vue';
import CaseStudySection from '../components/CaseStudySection/CaseStudySection.vue';
import CareerSection from '../components/CareerSection/CareerSection.vue';
import AboutSection from '../components/AboutSection/AboutSection.vue';

// Site configuration state with static fallbacks
const siteData = ref({
  navbar_logo: 'PORTFOLIO',
  hero_title: 'I HAVE GRAPHIC DESIGN OR WEB DEVELOP EXPERIENCE',
  hero_description: 'i have many years experience with social media design, print templates design, UI/UX prototyping, and building responsive, high-performance web applications using modern technologies.',
  portrait_url: '/avatar.png',
  case_studies: []
});

const socialLinks = ref([]);
const clientLogos = ref([]);
const isLoading = ref(true);

onMounted(() => {
  try {
    isLoading.value = true;
    const data = localCms.loadData();
    siteData.value = data.siteData;
    socialLinks.value = data.socialLinks;
    clientLogos.value = data.clientLogos;
    
    // Update Meta Title & Description dynamically
    if (siteData.value.meta_title) {
      document.title = siteData.value.meta_title;
    }
    if (siteData.value.meta_description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', siteData.value.meta_description);
    }
  } catch (error) {
    console.error('Error loading portfolio data from Local Storage:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="app-layout">
    <Navbar 
      :logo="siteData.navbar_logo" 
      :uspPrefix="siteData.usp_prefix"
      :portfolioPrefix="siteData.case_studies_prefix"
      :experiencePrefix="siteData.career_prefix"
      :aboutPrefix="siteData.about_prefix"
    />
    <main>
      <HeroSection 
        :prefix="siteData.hero_prefix"
        :title="siteData.hero_title"
        :description="siteData.hero_description"
        :portraitUrl="siteData.portrait_url"
        :socialLinks="socialLinks"
        :clientLogos="clientLogos"
        :cvData="siteData.cv_data"
        :cvFilename="siteData.cv_filename"
        :cvButtonText="siteData.cv_button_text"
      />
      <UspSection 
        :prefix="siteData.usp_prefix"
        :title="siteData.usp_title"
        :description="siteData.usp_description"
        :services="siteData.usp_services"
      />
      <CaseStudySection 
        :prefix="siteData.case_studies_prefix"
        :title="siteData.case_studies_title"
        :description="siteData.case_studies_description"
        :cards="siteData.case_studies" 
      />
      <CareerSection 
        :prefix="siteData.career_prefix"
        :title="siteData.career_title"
        :subtitle="siteData.career_subtitle"
        :timelineItems="siteData.career_items"
      />
      <AboutSection 
        :prefix="siteData.about_prefix"
        :title="siteData.about_title"
        :description="siteData.about_description"
        :story="siteData.about_story"
        :managementSkills="siteData.about_management_skills"
        :statExperience="siteData.about_stat_experience"
        :statDelivery="siteData.about_stat_delivery"
        :statScope="siteData.about_stat_scope"
      />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
