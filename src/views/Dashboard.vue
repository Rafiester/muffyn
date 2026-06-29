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
          <span class="nav-label">{{ siteData.nav_home }}</span>
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
          <span class="nav-label">{{ siteData.nav_services }}</span>
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
          <span class="nav-label">{{ siteData.nav_portfolio }}</span>
        </button>
        <button 
          class="nav-item" 
          :class="{ 'active': activeSection === 'career' }"
          @click="setActiveSection('career')"
          id="nav-item-career"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" width="18" height="18">
            <path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM12 2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8s8 3.59 8 8h2c0-5.52-4.48-10-10-10z" fill="currentColor"/>
          </svg>
          <span class="nav-label">{{ siteData.nav_experience }}</span>
        </button>
        <button 
          class="nav-item" 
          :class="{ 'active': activeSection === 'about' }"
          @click="setActiveSection('about')"
          id="nav-item-about"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" width="18" height="18">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/>
          </svg>
          <span class="nav-label">{{ siteData.nav_about }}</span>
        </button>

        <div class="nav-divider"></div>

        <button 
          class="nav-item" 
          :class="{ 'active': activeSection === 'seo' }"
          @click="setActiveSection('seo')"
          id="nav-item-seo"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" width="18" height="18">
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="currentColor"/>
          </svg>
          <span class="nav-label">Settings</span>
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
              <h3 class="card-title">Dashboard</h3>
              <p class="card-subtitle">Welcome to the administration panel.</p>
            </div>
            <div style="padding: 40px; text-align: center; color: var(--text-secondary);">
              <p>Dashboard main view is currently empty. Navigate to other sections in the sidebar to configure content.</p>
            </div>
          </div>

          <!-- Section: Hero (Dashboard Form) -->
          <div v-if="activeSection === 'hero'" class="workspace-card animated-fade-in" id="hero-section-card">
            <div class="card-header">
              <h3 class="card-title">Manage {{ siteData.nav_home }} Section Identity</h3>
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
                    <label for="hero-prefix" class="form-label">{{ siteData.nav_home || 'Hero' }} Prefix Text</label>
                    <input type="text" id="hero-prefix" v-model="siteData.hero_prefix" class="form-input" required />
                    <span class="hint-text">Appears above the hero title (e.g. "RAFIESTER").</span>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="hero-title" class="form-label">{{ siteData.nav_home || 'Hero' }} Title Text</label>
                    <textarea id="hero-title" v-model="siteData.hero_title" class="form-input text-area" rows="3" required></textarea>
                    <span class="hint-text">Press Enter to structure your title (maximum 3 lines allowed).</span>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="hero-description" class="form-label">{{ siteData.nav_home || 'Hero' }} Description</label>
                    <textarea id="hero-description" v-model="siteData.hero_description" class="form-input text-area" rows="3" required></textarea>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="hero-cv-btn-text" class="form-label">Download Button Label</label>
                    <input type="text" id="hero-cv-btn-text" v-model="siteData.cv_button_text" class="form-input" placeholder="Download CV" />
                    <span class="hint-text">The text displayed on the download button in the hero section.</span>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="hero-cv" class="form-label">Upload CV File (PDF)</label>
                    <div class="cv-upload-area">
                      <input type="file" id="hero-cv" accept=".pdf" @change="handleCvUpload" class="form-input-file" />
                      <div v-if="siteData.cv_filename" class="cv-file-info">
                        <svg viewBox="0 0 24 24" width="16" height="16" style="flex-shrink: 0;">
                          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" fill="currentColor"/>
                        </svg>
                        <span class="cv-filename">{{ siteData.cv_filename }}</span>
                        <span v-if="siteData.cv_uploaded_at" class="cv-upload-date">Uploaded {{ siteData.cv_uploaded_at }}</span>
                        <button type="button" class="cv-remove-btn" @click="removeCv" id="btn-remove-cv">Remove</button>
                      </div>
                      <span class="hint-text">Upload a PDF file (max 5MB). It will be available via the download button on the hero section.</span>
                    </div>
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
                      <label class="form-label">Upload Logo Image (PNG/JPG/SVG)</label>
                      <input type="file" accept=".png,.jpg,.jpeg,.svg" @change="event => handleClientLogoUpload(event, index)" class="form-input-file" />
                      <div v-if="client.logo_filename" class="cv-file-info mt-2">
                        <svg viewBox="0 0 24 24" width="16" height="16" style="flex-shrink: 0;">
                          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" fill="currentColor"/>
                        </svg>
                        <span class="cv-filename">{{ client.logo_filename }}</span>
                        <button type="button" class="cv-remove-btn" @click="removeClientLogo(index)" id="btn-remove-logo-{{ index }}">Remove</button>
                      </div>
                      <span class="hint-text">Upload a logo image (max 2 MB). It will appear in the hero banner.</span>
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
              <h3 class="card-title">Manage {{ siteData.nav_services }} Section</h3>
              <p class="card-subtitle">Configure the statement, key metrics, and the three service highlights.</p>
            </div>
            
            <form @submit.prevent="handleSave" class="dashboard-form">
              <!-- USP Section Settings -->
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">01</span>
                  <h4 class="section-title">{{ siteData.nav_services }} Title & Description</h4>
                </div>
                
                <div class="form-grid">
                  <div class="form-group col-span-2">
                    <label for="usp-prefix" class="form-label">{{ siteData.nav_services || 'USP' }} Prefix Text</label>
                    <input type="text" id="usp-prefix" v-model="siteData.usp_prefix" class="form-input" required />
                    <span class="hint-text">Appears above the USP title (e.g. "SERVICES").</span>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="usp-title" class="form-label">{{ siteData.nav_services || 'USP' }} Title Text</label>
                    <input type="text" id="usp-title" v-model="siteData.usp_title" class="form-input" required />
                    <span class="hint-text">Highlighted terms: "Your Needs" or "needs" will be automatically highlighted in yellow.</span>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="usp-description" class="form-label">{{ siteData.nav_services || 'USP' }} Description Text</label>
                    <textarea id="usp-description" v-model="siteData.usp_description" class="form-input text-area" rows="3" required></textarea>
                  </div>
                </div>
              </div>

              <!-- Services Cards Settings -->
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">02</span>
                  <h4 class="section-title">{{ siteData.nav_services }} Service Cards (Right Panel)</h4>
                </div>
                <p class="hint-text" style="margin-top: -10px; margin-bottom: 12px;">Customize the title, metrics, description, and tags for each service card.</p>
                
                <div style="display: flex; flex-direction: column; gap: 20px;">
                  <div v-for="(service, index) in siteData.usp_services" :key="index" class="form-row-fluent" style="flex-direction: column; align-items: stretch; padding: 18px; gap: 12px; background-color: rgba(20, 21, 28, 0.3); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px;">
                    <div style="font-weight: 700; color: var(--accent); font-size: 0.95rem;">Service Card #{{ index + 1 }}</div>
                    
                    <div class="row-cell">
                      <label class="form-label" style="font-size: 0.72rem;">Card Title</label>
                      <input type="text" v-model="service.title" class="form-input" required />
                    </div>
                    
                    <div class="row-cell">
                      <label class="form-label" style="font-size: 0.72rem;">Description</label>
                      <textarea v-model="service.description" class="form-input text-area" rows="2" placeholder="Brief explanation of the service..."></textarea>
                    </div>

                    <div class="row-cell">
                      <label class="form-label" style="font-size: 0.72rem;">Tags (Press Enter to add)</label>
                      <div class="tags-input-container" style="display: flex; flex-direction: column; gap: 8px;">
                        <!-- Display added tags -->
                        <div class="tags-wrapper" style="display: flex; flex-wrap: wrap; gap: 6px;">
                          <span 
                            v-for="(tag, tagIdx) in (service.tags ? service.tags.split(',').map(t => t.trim()).filter(Boolean) : [])" 
                            :key="tagIdx"
                            class="tag-pill"
                            style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background-color: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 40px; font-size: 0.75rem; color: var(--text-primary);"
                          >
                            <span>{{ tag }}</span>
                            <button 
                              type="button" 
                              @click="removeTag(service, tag)" 
                              style="background: transparent; border: none; padding: 0; color: #ff5252; cursor: pointer; font-size: 0.85rem; font-weight: bold; display: flex; align-items: center; justify-content: center; width: 14px; height: 14px; line-height: 1;"
                            >
                              &times;
                            </button>
                          </span>
                        </div>
                        <!-- Input to add new tag -->
                        <input 
                          type="text" 
                          placeholder="Type tag and press Enter" 
                          class="form-input" 
                          @keydown.prevent.enter="addTag(service, $event)"
                        />
                      </div>
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
              <h3 class="card-title">Manage {{ siteData.nav_portfolio }}</h3>
              <p class="card-subtitle">Configure the titles, descriptions, buttons, and icons for the three service cards.</p>
            </div>
            
            <form @submit.prevent="handleSave" class="dashboard-form">
              <!-- Header Configuration -->
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">01</span>
                  <h4 class="section-title">{{ siteData.nav_portfolio }} Header Info</h4>
                </div>
                <div class="form-grid">
                  <div class="form-group col-span-2">
                    <label for="case-studies-prefix" class="form-label">{{ siteData.nav_portfolio || 'Portfolio' }} Prefix</label>
                    <input type="text" id="case-studies-prefix" v-model="siteData.case_studies_prefix" class="form-input" required />
                    <span class="hint-text">Appears above the case studies title (e.g. "PORTFOLIO").</span>
                  </div>
                  <div class="form-group col-span-2">
                    <label for="case-studies-title" class="form-label">{{ siteData.nav_portfolio || 'Portfolio' }} Title</label>
                    <input type="text" id="case-studies-title" v-model="siteData.case_studies_title" class="form-input" required />
                  </div>
                  <div class="form-group col-span-2">
                    <label for="case-studies-description" class="form-label">{{ siteData.nav_portfolio || 'Portfolio' }} Description</label>
                    <textarea id="case-studies-description" v-model="siteData.case_studies_description" class="form-input text-area" rows="2" required></textarea>
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="section-title-bar" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="section-badge">02</span>
                    <h4 class="section-title">{{ siteData.nav_portfolio }} & Service Cards</h4>
                  </div>
                  <button type="button" @click="addCaseStudy" class="btn-pill-fluent" style="font-size: 0.8rem; padding: 6px 14px; background-color: var(--accent); color: white; border: 1px solid rgba(255, 255, 255, 0.3); cursor: pointer;" id="btn-add-case-study">
                    + Add New Card
                  </button>
                </div>
                <p class="hint-text" style="margin-top: 6px; margin-bottom: 16px;">Configure the content of the service cards in the case study section.</p>
                
                <div style="display: flex; flex-direction: column; gap: 24px;">
                  <div v-for="(study, index) in siteData.case_studies" :key="index" class="form-row-fluent" :id="'case-study-config-' + index" style="flex-direction: column; align-items: stretch; padding: 20px; gap: 16px; background-color: rgba(20, 21, 28, 0.4); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="font-weight: 700; color: var(--accent); font-size: 0.9rem;">Card #{{ index + 1 }} Configuration</div>
                      <button type="button" @click="deleteCaseStudy(index)" class="btn-pill-fluent" style="font-size: 0.75rem; padding: 4px 10px; background-color: #ef5350; color: white; border: none; cursor: pointer;" :id="'btn-delete-case-study-' + index">
                        Delete Card
                      </button>
                    </div>
                    
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
                        <label class="form-label" style="font-size: 0.72rem;">Upload Card Icon</label>
                        <input type="file" accept=".png,.jpg,.jpeg,.svg" @change="event => handleCardIconUpload(event, index)" class="form-input-file" />
                        
                        <div v-if="study.icon_filename" class="cv-file-info mt-2" style="display: flex; align-items: center; gap: 10px;">
                          <div v-if="study.icon_data" class="card-icon-preview" style="width: 28px; height: 28px; background-color: #424454; border-radius: 4px; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;">
                            <img :src="study.icon_data" style="width: 100%; height: 100%; object-fit: contain;" alt="Preview" />
                          </div>
                          <span class="cv-filename">{{ study.icon_filename }}</span>
                          <button type="button" class="cv-remove-btn" @click="removeCardIcon(index)" :id="'btn-remove-icon-' + index">Remove</button>
                        </div>
                        
                        <span class="hint-text" style="margin-top: 4px; line-height: 1.4;">
                          Recommended Size: <strong>64 × 64 px (Square)</strong>. Supported Formats: <strong>PNG, JPG, SVG</strong>. Max size: <strong>1 MB</strong>.<br/>
                          <em>If empty, it falls back to the default vector icon.</em>
                        </span>
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

          <!-- Section: Professional Journey (Dashboard Form) -->
          <div v-if="activeSection === 'career'" class="workspace-card animated-fade-in" id="career-section-card">
            <div class="card-header">
              <h3 class="card-title">Manage {{ siteData.nav_experience }}</h3>
              <p class="card-subtitle">Configure timeline items, dates, and roles dynamically.</p>
            </div>
            
            <form @submit.prevent="handleSave" class="dashboard-form">
              <!-- General Settings -->
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">01</span>
                  <h4 class="section-title">General {{ siteData.nav_experience }} Settings</h4>
                </div>
                
                <div class="form-grid">
                  <div class="form-group col-span-2">
                    <label for="career-prefix" class="form-label">{{ siteData.nav_experience || 'Experience' }} Prefix</label>
                    <input type="text" id="career-prefix" v-model="siteData.career_prefix" class="form-input" required />
                    <span class="hint-text">Appears above the professional journey title (e.g. "EXPERIENCE").</span>
                  </div>
                  
                  <div class="form-group col-span-2">
                    <label for="career-title" class="form-label">{{ siteData.nav_experience || 'Experience' }} Title</label>
                    <input type="text" id="career-title" v-model="siteData.career_title" class="form-input" required />
                    <span class="hint-text">Highlighted terms: "Journey" or "journey" will automatically be highlighted in yellow.</span>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="career-subtitle" class="form-label">{{ siteData.nav_experience || 'Experience' }} Subtitle</label>
                    <input type="text" id="career-subtitle" v-model="siteData.career_subtitle" class="form-input" required />
                  </div>
                </div>
              </div>

              <!-- Career Timeline Items -->
              <div class="form-section">
                <div class="section-title-bar" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="section-badge">02</span>
                    <h4 class="section-title">Timeline Cards</h4>
                  </div>
                    <button type="button" @click="addCareerItem" class="btn-pill-fluent" style="font-size: 0.8rem; padding: 6px 14px; background-color: var(--accent); color: white; border: 1px solid rgba(255, 255, 255, 0.3); cursor: pointer;" id="btn-add-career-item">
                    + Add New Card
                  </button>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 24px; margin-top: 16px;">
                  <div v-for="(item, index) in siteData.career_items" :key="index" class="form-row-fluent" style="flex-direction: column; align-items: stretch; padding: 20px; gap: 16px; background-color: rgba(20, 21, 28, 0.4); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="font-weight: 700; color: var(--accent); font-size: 0.9rem;">Card #{{ index + 1 }}</div>
                      <button type="button" @click="deleteCareerItem(index)" class="btn-pill-fluent" style="font-size: 0.75rem; padding: 4px 10px; background-color: #ef5350; color: white; border: none; cursor: pointer;" :id="'btn-delete-career-' + index">
                        Delete Card
                      </button>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 16px;">
                      <div class="row-cell">
                        <label class="form-label" style="font-size: 0.72rem;">Date/Year Range</label>
                        <input type="text" v-model="item.date" class="form-input" required />
                      </div>
                      <div class="row-cell">
                        <label class="form-label" style="font-size: 0.72rem;">Role & Location</label>
                        <input type="text" v-model="item.role" class="form-input" required />
                      </div>
                    </div>
                    
                    <div class="row-cell">
                      <label class="form-label" style="font-size: 0.72rem;">Description</label>
                      <textarea v-model="item.desc" class="form-input text-area" rows="3" required></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Save Button -->
              <div class="form-actions-bar">
                <button type="submit" class="btn-pill-fluent save-btn" id="btn-save-career">
                  <svg viewBox="0 0 24 24" width="16" height="16" class="btn-icon">
                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" fill="currentColor"/>
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Section: About Me (Dashboard Form) -->
          <div v-if="activeSection === 'about'" class="workspace-card animated-fade-in" id="about-section-card">
            <div class="card-header">
              <h3 class="card-title">Manage {{ siteData.nav_about }} Section</h3>
              <p class="card-subtitle">Edit your biography, skill tags, and quick stats highlights.</p>
            </div>
            
            <form @submit.prevent="handleSave" class="dashboard-form">
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">01</span>
                  <h4 class="section-title">Header and Biography</h4>
                </div>
                
                <div class="form-grid">
                  <div class="form-group col-span-2">
                    <label for="about-prefix" class="form-label">{{ siteData.nav_about || 'About' }} Prefix</label>
                    <input type="text" id="about-prefix" v-model="siteData.about_prefix" class="form-input" required />
                    <span class="hint-text">Appears above the section title (e.g. "WHO AM I").</span>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="about-title" class="form-label">{{ siteData.nav_about || 'About' }} Title</label>
                    <input type="text" id="about-title" v-model="siteData.about_title" class="form-input" required />
                    <span class="hint-text">Highlighted terms: "Business" or "Technical" will automatically be highlighted in red accent.</span>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="about-description" class="form-label">{{ siteData.nav_about || 'About' }} Description</label>
                    <textarea id="about-description" v-model="siteData.about_description" class="form-input text-area" rows="2" required></textarea>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="about-story" class="form-label">The Story (Biography)</label>
                    <textarea id="about-story" v-model="siteData.about_story" class="form-input text-area" rows="4" required></textarea>
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">02</span>
                  <h4 class="section-title">Skill Stack Tagging</h4>
                </div>
                
                <div class="form-grid">
                  <div class="form-group col-span-2">
                    <label for="about-management-skills" class="form-label">Management Core (Comma-separated)</label>
                    <textarea id="about-management-skills" v-model="managementSkillsText" class="form-input text-area" rows="2" placeholder="Agile/Scrum, Jira, Sprint Planning..."></textarea>
                  </div>
                </div>
              </div>

              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">03</span>
                  <h4 class="section-title">Bento Grid Quick Stats</h4>
                </div>
                
                <div class="form-grid">
                  <div class="form-group">
                    <label for="about-stat-exp" class="form-label">Years Experience Stat</label>
                    <input type="text" id="about-stat-exp" v-model="siteData.about_stat_experience" class="form-input" required />
                  </div>

                  <div class="form-group">
                    <label for="about-stat-delivery" class="form-label">Delivery Rate Stat</label>
                    <input type="text" id="about-stat-delivery" v-model="siteData.about_stat_delivery" class="form-input" required />
                  </div>

                  <div class="form-group">
                    <label for="about-stat-scope" class="form-label">Scope Creep Stat</label>
                    <input type="text" id="about-stat-scope" v-model="siteData.about_stat_scope" class="form-input" required />
                  </div>
                </div>
              </div>

              <!-- Save Button -->
              <div class="form-actions-bar">
                <button type="submit" class="btn-pill-fluent save-btn" id="btn-save-about">
                  <svg viewBox="0 0 24 24" width="16" height="16" class="btn-icon">
                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" fill="currentColor"/>
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Section: Settings (Dashboard Form) -->
          <div v-if="activeSection === 'seo'" class="workspace-card animated-fade-in" id="seo-section-card">
            <div class="card-header">
              <h3 class="card-title">Settings</h3>
              <p class="card-subtitle">Manage site-wide meta attributes, SEO titles, and descriptions.</p>
            </div>
            
            <form @submit.prevent="handleSave" class="dashboard-form">
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">01</span>
                  <h4 class="section-title">Theme Customization</h4>
                </div>
                
                <div class="form-grid">
                  <div class="form-group col-span-2" id="theme-accent-container">
                    <label for="theme-accent" class="form-label">Theme Accent Color</label>
                    <div style="display: flex; align-items: center; gap: 12px; margin-top: 6px; position: relative;">
                      
                      <!-- Fluent Custom Trigger Button -->
                      <button 
                        type="button" 
                        @click="showColorPicker = !showColorPicker"
                        style="width: 44px; height: 44px; padding: 0; border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; cursor: pointer; background: rgba(255,255,255,0.03); display: flex; align-items: center; justify-content: center; transition: all 0.2s;"
                        id="theme-accent-trigger"
                      >
                        <span 
                          style="width: 28px; height: 28px; border-radius: 4px; display: block;" 
                          :style="{ backgroundColor: siteData.theme_accent }"
                        ></span>
                      </button>

                      <!-- Hex text input -->
                      <input 
                        type="text" 
                        id="theme-accent" 
                        v-model="siteData.theme_accent" 
                        class="form-input" 
                        style="flex-grow: 1; max-width: 150px; font-family: monospace; text-transform: uppercase;"
                        placeholder="#BD3636"
                        required 
                      />

                      <!-- Live Preview Badge -->
                      <div 
                        style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 6px; background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05);"
                      >
                        <span 
                          style="width: 12px; height: 12px; border-radius: 50%; display: inline-block;" 
                          :style="{ backgroundColor: siteData.theme_accent }"
                        ></span>
                        <span style="font-size: 0.8rem; color: var(--text-secondary);">Live Accent Preview</span>
                      </div>

                      <!-- Fluent Dropdown/Popup Color Picker (Small & Premium) -->
                      <div 
                        v-if="showColorPicker" 
                        class="fluent-color-picker-popup animated-zoom-in"
                        style="position: absolute; bottom: 54px; left: 0; z-index: 100; width: 172px; padding: 12px; background-color: #1e1f26; border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; box-shadow: 0 8px 30px rgba(0,0,0,0.6); display: flex; flex-direction: column; gap: 8px;"
                      >
                        <div style="font-size: 0.7rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Presets</div>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
                          <button
                            v-for="color in presetColors"
                            :key="color"
                            type="button"
                            @click="selectPresetColor(color)"
                            style="width: 26px; height: 26px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;"
                            :style="{ 
                              backgroundColor: color, 
                              borderColor: siteData.theme_accent.toLowerCase() === color.toLowerCase() ? '#ffffff' : 'transparent'
                            }"
                          >
                            <svg v-if="siteData.theme_accent.toLowerCase() === color.toLowerCase()" viewBox="0 0 24 24" width="10" height="10" style="color: white; fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                    </div>
                    <span class="hint-text">Click the square swatch to open SaaS Preset palette. Hex code updates instantly.</span>
                  </div>
                </div>
              </div>

              <!-- Section 02: Navbar Menu Titles & CTA -->
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">02</span>
                  <h4 class="section-title">Navbar Link Titles & CTA Button Settings</h4>
                </div>
                
                <div class="form-grid">
                  <div class="form-group col-span-2">
                    <label for="navbar-logo" class="form-label">Navbar Logo Text</label>
                    <input type="text" id="navbar-logo" v-model="siteData.navbar_logo" class="form-input" required />
                  </div>

                  <div class="form-group col-span-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div class="row-cell">
                      <label for="nav-home" class="form-label">{{ siteData.nav_home || 'Home' }} Link Title</label>
                      <input type="text" id="nav-home" v-model="siteData.nav_home" class="form-input" required />
                    </div>
                    <div class="row-cell">
                      <label for="nav-services" class="form-label">{{ siteData.nav_services || 'Services' }} Link Title</label>
                      <input type="text" id="nav-services" v-model="siteData.nav_services" class="form-input" required />
                    </div>
                  </div>
                  
                  <div class="form-group col-span-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div class="row-cell">
                      <label for="nav-portfolio" class="form-label">{{ siteData.nav_portfolio || 'Portfolio' }} Link Title</label>
                      <input type="text" id="nav-portfolio" v-model="siteData.nav_portfolio" class="form-input" required />
                    </div>
                    <div class="row-cell">
                      <label for="nav-experience" class="form-label">{{ siteData.nav_experience || 'Experience' }} Link Title</label>
                      <input type="text" id="nav-experience" v-model="siteData.nav_experience" class="form-input" required />
                    </div>
                  </div>

                  <div class="form-group col-span-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div class="row-cell">
                      <label for="nav-about" class="form-label">{{ siteData.nav_about || 'About me' }} Link Title</label>
                      <input type="text" id="nav-about" v-model="siteData.nav_about" class="form-input" required />
                    </div>
                    <div class="row-cell">
                      <label for="nav-cta-text" class="form-label">CTA Button Label</label>
                      <input type="text" id="nav-cta-text" v-model="siteData.nav_cta_text" class="form-input" required />
                    </div>
                  </div>

                  <div class="form-group col-span-2">
                    <label for="nav-cta-url" class="form-label">CTA Button Destination URL</label>
                    <input type="text" id="nav-cta-url" v-model="siteData.nav_cta_url" class="form-input" required />
                  </div>
                </div>
              </div>

              <!-- Section 03: Search Engine Optimization (SEO) -->
              <div class="form-section">
                <div class="section-title-bar">
                  <span class="section-badge">03</span>
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
                <button type="submit" class="btn-pill-fluent save-btn" id="btn-save-seo">
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


    <!-- SaaS Fluent Dialog Popup -->
    <div v-if="activeModal" class="fluent-dialog-overlay animated-fade-in">
      <div class="fluent-dialog-card animated-zoom-in">
        <div class="fluent-dialog-header">
          <div class="fluent-dialog-icon-wrap" :class="activeModal.type">
            <!-- Warning/Danger/Success/Info icons -->
            <svg v-if="activeModal.type === 'warning' || activeModal.type === 'danger'" viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
            </svg>
            <svg v-else-if="activeModal.type === 'success'" viewBox="0 0 24 24" width="20" height="20">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" width="20" height="20">
              <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
            </svg>
          </div>
          <h4 class="fluent-dialog-title">{{ activeModal.title }}</h4>
        </div>
        <div class="fluent-dialog-body">
          <p>{{ activeModal.message }}</p>
        </div>
        <div class="fluent-dialog-actions">
          <button v-if="activeModal.showCancel !== false" type="button" class="fluent-dialog-btn btn-secondary" @click="activeModal = null">
            Cancel
          </button>
          <button type="button" class="fluent-dialog-btn" :class="'btn-' + (activeModal.type || 'primary')" @click="confirmModal">
            {{ activeModal.confirmText || 'OK' }}
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import { localCms, applyThemeColor } from '../localCms';

const siteData = ref({
  navbar_logo: '',
  nav_home: '',
  nav_services: '',
  nav_portfolio: '',
  nav_experience: '',
  nav_about: '',
  nav_cta_text: '',
  nav_cta_url: '',
  hero_title: '',
  hero_description: '',
  portrait_url: '',
  hero_prefix: '',
  cv_data: '',
  cv_filename: '',
  cv_button_text: 'Download CV',
  cv_uploaded_at: '',
  about_prefix: '',
  about_title: '',
  about_description: '',
  about_story: '',
  about_tech_skills: [],
  about_management_skills: [],
  about_stat_experience: '',
  about_stat_delivery: '',
  about_stat_scope: '',
  usp_prefix: '',
  usp_title: '',
  usp_description: '',
  meta_title: '',
  meta_description: '',
  usp_stats: [],
  usp_services: [],
  case_studies_prefix: '',
  case_studies_title: '',
  case_studies_description: '',
  case_studies: [],
  career_prefix: '',
  career_title: '',
  career_subtitle: '',
  career_items: [],
  theme_accent: ''
});

const techSkillsText = computed({
  get: () => (siteData.value.about_tech_skills || []).join(', '),
  set: (val) => { siteData.value.about_tech_skills = val.split(',').map(s => s.trim()).filter(Boolean); }
});

const managementSkillsText = computed({
  get: () => (siteData.value.about_management_skills || []).join(', '),
  set: (val) => { siteData.value.about_management_skills = val.split(',').map(s => s.trim()).filter(Boolean); }
});

// Watch accent color changes to apply live preview in dashboard
watch(() => siteData.value.theme_accent, (newColor) => {
  if (newColor && /^#[0-9A-F]{6}$/i.test(newColor)) {
    applyThemeColor(newColor);
  }
});

// Custom SaaS Fluent color picker state
const showColorPicker = ref(false);
const presetColors = [
  '#BD3636', // Crimson Red
  '#4361EE', // Electric Blue
  '#7209B7', // Royal Purple
  '#27C93F', // Emerald Green
  '#FF8C00', // Neon Orange
  '#00F2FE', // Cyan/Teal
  '#EA4C89', // Instagram Accent Pink
  '#F72585'  // Hot Pink
];
const selectPresetColor = (color) => {
  siteData.value.theme_accent = color;
};
const closeColorPicker = (e) => {
  if (!e.target.closest('#theme-accent-container')) {
    showColorPicker.value = false;
  }
};
onMounted(() => {
  document.addEventListener('click', closeColorPicker);
});
onUnmounted(() => {
  document.removeEventListener('click', closeColorPicker);
});

const handleClientLogoUpload = (event, idx) => {
  const file = event.target.files[0];
  if (!file) return;
  const allowed = ['image/png', 'image/jpeg', 'image/svg+xml'];
  if (!allowed.includes(file.type)) {
    showNotification('Supported formats: PNG, JPG, SVG', 'error');
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    showNotification('Logo must be under 2 MB', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    siteData.value.clientLogos[idx].logo_data = e.target.result;
    siteData.value.clientLogos[idx].logo_filename = file.name;
    showNotification(`Logo "${file.name}" loaded for client #${idx + 1}`);
  };
  reader.readAsDataURL(file);
};

const activeModal = ref(null);

const triggerModal = ({ title, message, type = 'info', onConfirm, showCancel = true, confirmText = 'Confirm' }) => {
  activeModal.value = { title, message, type, onConfirm, showCancel, confirmText };
};

const confirmModal = () => {
  if (activeModal.value && activeModal.value.onConfirm) {
    activeModal.value.onConfirm();
  }
  activeModal.value = null;
};

const handleCvUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.type !== 'application/pdf') {
    showNotification('Supported format: PDF only', 'error');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    showNotification('CV file must be under 5MB', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    siteData.value.cv_data = e.target.result;
    siteData.value.cv_filename = file.name;
    siteData.value.cv_uploaded_at = new Date().toLocaleString();
    showNotification(`CV "${file.name}" uploaded successfully!`);
  };
  reader.readAsDataURL(file);
};

const removeCv = () => {
  triggerModal({
    title: 'Remove CV',
    message: 'Are you sure you want to remove the uploaded CV file?',
    type: 'danger',
    confirmText: 'Remove',
    onConfirm: () => {
      siteData.value.cv_data = '';
      siteData.value.cv_filename = '';
      siteData.value.cv_uploaded_at = '';
      showNotification('CV file removed.');
    }
  });
};

const removeClientLogo = idx => {
  triggerModal({
    title: 'Remove Client Logo',
    message: `Are you sure you want to remove the logo for Client #${idx + 1}?`,
    type: 'danger',
    confirmText: 'Remove',
    onConfirm: () => {
      siteData.value.clientLogos[idx].logo_data = '';
      siteData.value.clientLogos[idx].logo_filename = '';
      siteData.value.clientLogos[idx].logo_svg = '';
      showNotification(`Logo removed for client #${idx + 1}`);
    }
  });
};

const handleCardIconUpload = (event, idx) => {
  const file = event.target.files[0];
  if (!file) return;
  const allowed = ['image/png', 'image/jpeg', 'image/svg+xml'];
  if (!allowed.includes(file.type)) {
    showNotification('Supported formats: PNG, JPG, SVG', 'error');
    return;
  }
  if (file.size > 1 * 1024 * 1024) {
    showNotification('Card icon must be under 1 MB', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    if (!siteData.value.case_studies[idx]) {
      siteData.value.case_studies[idx] = {};
    }
    siteData.value.case_studies[idx].icon_data = e.target.result;
    siteData.value.case_studies[idx].icon_filename = file.name;
    showNotification(`Icon "${file.name}" loaded for card #${idx + 1}`);
  };
  reader.readAsDataURL(file);
};

const removeCardIcon = idx => {
  triggerModal({
    title: 'Remove Card Icon',
    message: `Are you sure you want to remove the custom icon for Card #${idx + 1}?`,
    type: 'danger',
    confirmText: 'Remove',
    onConfirm: () => {
      if (siteData.value.case_studies[idx]) {
        siteData.value.case_studies[idx].icon_data = '';
        siteData.value.case_studies[idx].icon_filename = '';
      }
      showNotification(`Icon removed for card #${idx + 1}`);
    }
  });
};

const addCaseStudy = () => {
  if (!siteData.value.case_studies) {
    siteData.value.case_studies = [];
  }
  siteData.value.case_studies.push({
    title: 'New Case Study',
    desc: 'i have many years experience with social media design, creating art work and designs that will promote businesses. i have a lot',
    button_text: 'See More',
    icon_type: 'design'
  });
  const newIndex = siteData.value.case_studies.length - 1;
  nextTick(() => {
    const el = document.getElementById(`case-study-config-${newIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
};

const deleteCaseStudy = (index) => {
  triggerModal({
    title: 'Delete Case Study',
    message: `Are you sure you want to delete Case Study Card #${index + 1}? This action cannot be undone.`,
    type: 'danger',
    confirmText: 'Delete',
    onConfirm: () => {
      if (siteData.value.case_studies) {
        siteData.value.case_studies.splice(index, 1);
        showNotification(`Case study #${index + 1} deleted`);
      }
    }
  });
};

const addCareerItem = () => {
  if (!siteData.value.career_items) {
    siteData.value.career_items = [];
  }
  siteData.value.career_items.push({
    date: '2026 - Present',
    role: 'New Role & Position | Company | Location',
    desc: 'Describe responsibilities, highlights, and budgets managed.'
  });
};

const deleteCareerItem = (index) => {
  triggerModal({
    title: 'Delete Timeline Card',
    message: `Are you sure you want to delete Card #${index + 1}? This action cannot be undone.`,
    type: 'danger',
    confirmText: 'Delete',
    onConfirm: () => {
      if (siteData.value.career_items) {
        siteData.value.career_items.splice(index, 1);
        showNotification(`Card #${index + 1} deleted`);
      }
    }
  });
};

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

const addTag = (service, event) => {
  const input = event.target;
  const val = input.value.trim();
  if (val) {
    let currentTags = service.tags ? service.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    if (!currentTags.includes(val)) {
      currentTags.push(val);
      service.tags = currentTags.join(', ');
    }
    input.value = '';
  }
};

const removeTag = (service, tagToRemove) => {
  let currentTags = service.tags ? service.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  currentTags = currentTags.filter(t => t !== tagToRemove);
  service.tags = currentTags.join(', ');
};

const handleSave = () => {
  try {
    localCms.saveData({
      siteData: siteData.value,
      socialLinks: socialLinks.value,
      clientLogos: clientLogos.value
    });
    showNotification('Changes saved successfully!');
  } catch (error) {
    showNotification('Failed to save changes.', 'error');
  }
};

const handleLogout = () => {
  triggerModal({
    title: 'Sign Out',
    message: 'Are you sure you want to sign out from the admin dashboard?',
    type: 'warning',
    confirmText: 'Sign Out',
    onConfirm: () => {
      localCms.logout();
      router.push('/th3w3b4dm1n/login');
    }
  });
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
