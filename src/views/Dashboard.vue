<template>
  <div class="dashboard-wrapper" :class="{ 'sidebar-collapsed': isSidebarCollapsed, 'mobile-sidebar-open': isMobileSidebarOpen }">
    
    <!-- Left Side Panel (Sidebar) -->
    <aside class="side-panel">
      <!-- Sidebar Header -->
      <div class="side-panel-header">
        <button 
          class="burger-menu-btn" 
          @click="toggleSidebar"
          aria-label="Toggle Navigation"
          id="sidebar-toggle-btn"
        >
          <svg class="burger-icon" viewBox="0 0 24 24" width="20" height="20">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
          </svg>
        </button>
        <div class="side-panel-brand">
          <div 
            class="logo-focusable-wrap" 
            tabindex="0"
            aria-label="Content Management System Logo"
          >
            <svg class="logo-svg" viewBox="0 0 512 512" width="512" height="512" style="width: 100%; height: 100%; max-width: 26px; max-height: 26px;">
              <rect x="32" y="32" width="448" height="448" rx="64" fill="none" stroke="currentColor" stroke-width="36"/>
              <rect x="96" y="96" width="128" height="320" rx="20" fill="currentColor"/>
              <rect x="256" y="96" width="160" height="136" rx="20" fill="currentColor"/>
              <rect x="256" y="264" width="160" height="152" rx="20" fill="currentColor"/>
            </svg>
          </div>
          <span class="side-panel-title">Content Management System</span>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="side-panel-nav">
        <button 
          class="nav-item dashboard-nav-item" 
          :class="{ 'active': activeSection === 'dashboard' }"
          @click="setActiveSection('dashboard')"
          id="nav-item-dashboard"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" width="18" height="18">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
          </svg>
          <span class="nav-label">Dashboard</span>
        </button>

        <div class="nav-divider"></div>

        <button 
          class="nav-item" 
          :class="{ 'active': activeSection === 'hero' }"
          @click="setActiveSection('hero')"
          id="nav-item-hero"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" width="18" height="18">
            <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" fill="currentColor"/>
          </svg>
          <span class="nav-label">Hero Section</span>
        </button>
        <button 
          class="nav-item" 
          :class="{ 'active': activeSection === 'usp' }"
          @click="setActiveSection('usp')"
          id="nav-item-usp"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" width="18" height="18">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm0 8H7v-2h10v2z" fill="currentColor"/>
          </svg>
          <span class="nav-label">USP Section</span>
        </button>
        <button 
          class="nav-item" 
          :class="{ 'active': activeSection === 'casestudy' }"
          @click="setActiveSection('casestudy')"
          id="nav-item-casestudy"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" width="18" height="18">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" fill="currentColor"/>
          </svg>
          <span class="nav-label">Case Studies</span>
        </button>
      </nav>
      
      <!-- Sidebar Footer -->
      <div class="side-panel-footer">
        <div v-if="isUserMenuOpen" class="user-menu-popover animated-fade-in" id="user-menu-popover">
          <button @click="handleLogout" class="side-logout-btn" id="btn-logout">
            <svg viewBox="0 0 24 24" width="16" height="16" class="logout-icon">
              <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="currentColor"/>
            </svg>
            <span class="logout-label">Logout</span>
          </button>
        </div>
        <div class="user-profile" @click.stop="toggleUserMenu" style="cursor: pointer;" id="user-profile-trigger">
          <div class="user-avatar">A</div>
          <div class="user-details">
            <span class="user-name">Administrator</span>
            <span class="user-role">Super User</span>
          </div>
          <svg class="profile-arrow" :class="{ 'open': isUserMenuOpen }" viewBox="0 0 24 24" width="16" height="16">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </aside>

    <!-- Mobile Sidebar Overlay -->
    <div class="sidebar-overlay" @click="closeMobileSidebar" id="sidebar-overlay-btn"></div>

    <!-- Right Workspace Area -->
    <div class="workspace-area">
      <!-- Mobile Floating Burger Trigger -->
      <button class="mobile-floating-burger" @click="toggleMobileSidebar" id="mobile-sidebar-toggle-btn">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
        </svg>
      </button>

      <!-- Main Workspace Scroll Container -->
      <main class="workspace-content">
        <div class="container-fluid">
          <!-- Notification messages -->
          <div v-if="notification" class="notification-banner" :class="notification.type" id="notification-banner">
            <div class="notification-content">
              <svg v-if="notification.type === 'success'" viewBox="0 0 24 24" width="18" height="18" class="notif-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" class="notif-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
              </svg>
              <span>{{ notification.text }}</span>
            </div>
          </div>

          <!-- Section: Dashboard (Dashboard Form) -->
          <div v-if="activeSection === 'dashboard'" class="workspace-card animated-fade-in" id="dashboard-section-card">
            <div class="card-header">
              <h3 class="card-title">Dashboard Settings</h3>
              <p class="card-subtitle">Manage site-wide meta attributes, SEO titles, and descriptions.</p>
            </div>
            
            <form @submit.prevent="handleSave" class="dashboard-form">
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">01</span>
                  <h4 class="section-title">Search Engine Optimization (SEO)</h4>
                </div>
                
                <div class="form-grid">
                  <div class="form-group col-span-2">
                    <label for="meta-title" class="form-label">Meta Title</label>
                    <input type="text" id="meta-title" v-model="siteData.meta_title" class="form-input" required />
                    <span class="hint-text">This title is displayed in browser tabs and search engine results.</span>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="meta-description" class="form-label">Meta Description</label>
                    <textarea id="meta-description" v-model="siteData.meta_description" class="form-input text-area" rows="3" required></textarea>
                    <span class="hint-text">A brief summary of your portfolio for search engines (recommended 150-160 characters).</span>
                  </div>
                </div>
              </div>

              <!-- Save Button -->
              <div class="form-actions-bar">
                <button type="submit" class="btn-pill-fluent save-btn" id="btn-save-dashboard">
                  <svg viewBox="0 0 24 24" width="16" height="16" class="btn-icon">
                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" fill="currentColor"/>
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Section: Hero (Dashboard Form) -->
          <div v-if="activeSection === 'hero'" class="workspace-card animated-fade-in" id="hero-section-card">
            <div class="card-header">
              <h3 class="card-title">Manage Hero Section Identity</h3>
              <p class="card-subtitle">Edit the text settings, social items, and client brand logos.</p>
            </div>
            
            <form @submit.prevent="handleSave" class="dashboard-form">
              <!-- General Site Data -->
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">01</span>
                  <h4 class="section-title">General Site Data</h4>
                </div>
                
                <div class="form-grid">
                  <div class="form-group col-span-2">
                    <label for="navbar-logo" class="form-label">Navbar Logo Text</label>
                    <input type="text" id="navbar-logo" v-model="siteData.navbar_logo" class="form-input" required />
                  </div>

                  <div class="form-group col-span-2">
                    <label for="hero-prefix" class="form-label">Hero Prefix Text</label>
                    <input type="text" id="hero-prefix" v-model="siteData.hero_prefix" class="form-input" required />
                    <span class="hint-text">Appears above the hero title (e.g. "RAFIESTER").</span>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="hero-title" class="form-label">Hero Title Text</label>
                    <textarea id="hero-title" v-model="siteData.hero_title" class="form-input text-area" rows="3" required></textarea>
                    <span class="hint-text">Press Enter to structure your title (maximum 3 lines allowed).</span>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="hero-description" class="form-label">Hero Description</label>
                    <textarea id="hero-description" v-model="siteData.hero_description" class="form-input text-area" rows="3" required></textarea>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">02</span>
                  <h4 class="section-title">Social Links</h4>
                </div>
                
                <div class="social-list">
                  <div v-for="(social, index) in socialLinks" :key="index" class="form-row-fluent">
                    <div class="row-cell cell-platform">
                      <label class="form-label">Platform</label>
                      <div class="platform-display">
                        <span class="platform-badge" :class="social.platform.toLowerCase()">{{ social.platform }}</span>
                      </div>
                    </div>
                    <div class="row-cell cell-url">
                      <label class="form-label">URL Link</label>
                      <input type="text" v-model="social.url" class="form-input" placeholder="#" />
                    </div>
                    <div class="row-cell cell-accent">
                      <label class="form-label accent-switch-label">
                         <span>Accent Pill</span>
                        <input type="checkbox" v-model="social.is_accent" class="fluent-switch" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Client Banner Logos -->
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">03</span>
                  <h4 class="section-title">Client Banner Logos</h4>
                </div>
                
                <div class="logos-list">
                  <div v-for="(client, index) in clientLogos" :key="index" class="form-row-fluent">
                    <div class="row-cell cell-brand">
                      <label class="form-label">Brand Name</label>
                      <input type="text" v-model="client.name" class="form-input" required />
                    </div>
                    <div class="row-cell cell-svg">
                      <label class="form-label">Custom SVG Markup (Optional)</label>
                      <input type="text" v-model="client.logo_svg" class="form-input code-font" placeholder="Leave empty for standard text brand rendering" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Save Button -->
              <div class="form-actions-bar">
                <button type="submit" class="btn-pill-fluent save-btn" id="btn-save-content">
                  <svg viewBox="0 0 24 24" width="16" height="16" class="btn-icon">
                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" fill="currentColor"/>
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Section: USP (Dashboard Form) -->
          <div v-if="activeSection === 'usp'" class="workspace-card animated-fade-in" id="usp-section-card">
            <div class="card-header">
              <h3 class="card-title">Manage USP Section</h3>
              <p class="card-subtitle">Configure the USP statement, key metrics, and the three service highlights.</p>
            </div>
            
            <form @submit.prevent="handleSave" class="dashboard-form">
              <!-- USP Section Settings -->
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">01</span>
                  <h4 class="section-title">USP Title & Description</h4>
                </div>
                
                <div class="form-grid">
                  <div class="form-group col-span-2">
                    <label for="usp-title" class="form-label">USP Title Text</label>
                    <input type="text" id="usp-title" v-model="siteData.usp_title" class="form-input" required />
                    <span class="hint-text">Highlighted terms: "Your Needs" or "needs" will be automatically highlighted in yellow.</span>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="usp-description" class="form-label">USP Description Text</label>
                    <textarea id="usp-description" v-model="siteData.usp_description" class="form-input text-area" rows="3" required></textarea>
                  </div>
                </div>
              </div>

              <!-- Stats Settings -->
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">02</span>
                  <h4 class="section-title">USP Statistics Metrics (Left Grid)</h4>
                </div>
                <p class="hint-text" style="margin-top: -10px; margin-bottom: 6px;">These 4 metrics display in a 2x2 grid beside the service cards.</p>
                
                <div class="form-grid">
                  <div v-for="(stat, index) in siteData.usp_stats" :key="index" class="form-row-fluent" style="flex-direction: row; align-items: center; padding: 14px 18px; gap: 16px;">
                    <div class="row-cell" style="flex: 2;">
                      <label class="form-label" style="font-size: 0.72rem;">Metric (e.g. 50+)</label>
                      <input type="text" v-model="stat.number" class="form-input" required />
                    </div>
                    <div class="row-cell" style="flex: 4;">
                      <label class="form-label" style="font-size: 0.72rem;">Label (e.g. Clients)</label>
                      <input type="text" v-model="stat.label" class="form-input" required />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Services Cards Settings -->
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">03</span>
                  <h4 class="section-title">USP Service Cards (Right Panel)</h4>
                </div>
                <p class="hint-text" style="margin-top: -10px; margin-bottom: 6px;">Three custom styled cards with hover animations and vector illustrations.</p>
                
                <div class="social-list">
                  <div v-for="(service, index) in siteData.usp_services" :key="index" class="form-row-fluent" style="flex-direction: row; align-items: center; padding: 14px 18px; gap: 16px;">
                    <div class="row-cell" style="flex: 3;">
                      <label class="form-label" style="font-size: 0.72rem;">Card Title</label>
                      <input type="text" v-model="service.title" class="form-input" required />
                    </div>
                    <div class="row-cell" style="flex: 3;">
                      <label class="form-label" style="font-size: 0.72rem;">Subtext / Metrics (e.g. 12+ Projects Completed)</label>
                      <input type="text" v-model="service.projects" class="form-input" required />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Save Button -->
              <div class="form-actions-bar">
                <button type="submit" class="btn-pill-fluent save-btn" id="btn-save-usp">
                  <svg viewBox="0 0 24 24" width="16" height="16" class="btn-icon">
                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" fill="currentColor"/>
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Section: Case Studies (Dashboard Form) -->
          <div v-if="activeSection === 'casestudy'" class="workspace-card animated-fade-in" id="casestudy-section-card">
            <div class="card-header">
              <h3 class="card-title">Manage Case Studies</h3>
              <p class="card-subtitle">Configure the titles, descriptions, buttons, and icons for the three service cards.</p>
            </div>
            
            <form @submit.prevent="handleSave" class="dashboard-form">
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">01</span>
                  <h4 class="section-title">Case Studies & Service Cards</h4>
                </div>
                <p class="hint-text" style="margin-top: -10px; margin-bottom: 6px;">Configure the content of the three columns in the case study section.</p>
                
                <div style="display: flex; flex-direction: column; gap: 24px;">
                  <div v-for="(study, index) in siteData.case_studies" :key="index" class="form-row-fluent" style="flex-direction: column; align-items: stretch; padding: 20px; gap: 16px; background-color: rgba(20, 21, 28, 0.4);">
                    <div style="font-weight: 700; color: var(--accent); font-size: 0.9rem;">Card #{{ index + 1 }} Configuration</div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                      <div class="row-cell">
                        <label class="form-label" style="font-size: 0.72rem;">Card Title</label>
                        <input type="text" v-model="study.title" class="form-input" required />
                      </div>
                      <div class="row-cell">
                        <label class="form-label" style="font-size: 0.72rem;">Button Label</label>
                        <input type="text" v-model="study.button_text" class="form-input" required />
                      </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
                      <div class="row-cell">
                        <label class="form-label" style="font-size: 0.72rem;">Card Icon Type</label>
                        <select v-model="study.icon_type" class="form-input" style="background-color: #14151c;" required>
                          <option value="design">UI/UX (Ruler & Pencil)</option>
                          <option value="web">Web Design (Browser Window)</option>
                          <option value="mobile">App Development (Mobile Screen)</option>
                        </select>
                      </div>
                    </div>

                    <div class="row-cell">
                      <label class="form-label" style="font-size: 0.72rem;">Card Description</label>
                      <textarea v-model="study.desc" class="form-input text-area" rows="3" required></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Save Button -->
              <div class="form-actions-bar">
                <button type="submit" class="btn-pill-fluent save-btn" id="btn-save-casestudy">
                  <svg viewBox="0 0 24 24" width="16" height="16" class="btn-icon">
                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" fill="currentColor"/>
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { localCms } from '../localCms';

const siteData = ref({
  navbar_logo: '',
  hero_title: '',
  hero_description: '',
  portrait_url: '',
  hero_prefix: '',
  usp_title: '',
  usp_description: '',
  meta_title: '',
  meta_description: '',
  usp_stats: [],
  usp_services: [],
  case_studies: []
});

const socialLinks = ref([]);
const clientLogos = ref([]);
const notification = ref(null);

const activeSection = ref('dashboard');
const isSidebarCollapsed = ref(false);
const isMobileSidebarOpen = ref(false);
const isUserMenuOpen = ref(false);

const router = useRouter();

const showNotification = (text, type = 'success') => {
  notification.value = { text, type };
  setTimeout(() => {
    notification.value = null;
  }, 4000);
};

const handleSave = () => {
  try {
    localCms.saveData({
      siteData: siteData.value,
      socialLinks: socialLinks.value,
      clientLogos: clientLogos.value
    });
    showNotification('Changes saved successfully to Local Storage!');
  } catch (error) {
    showNotification('Failed to save changes.', 'error');
  }
};

const handleLogout = () => {
  localCms.logout();
  router.push('/th3w3b4dm1n/login');
};

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const closeUserMenu = () => {
  isUserMenuOpen.value = false;
};

const setActiveSection = (section) => {
  activeSection.value = section;
  isMobileSidebarOpen.value = false;
};

onMounted(() => {
  const data = localCms.loadData();
  siteData.value = data.siteData;
  socialLinks.value = data.socialLinks;
  clientLogos.value = data.clientLogos;
  window.addEventListener('click', closeUserMenu);
});

onUnmounted(() => {
  window.removeEventListener('click', closeUserMenu);
});
</script>

<style scoped>
@import './Dashboard.css';
</style>
