const SITE_DATA_KEY = 'portfolio_site_data';
const SOCIAL_LINKS_KEY = 'portfolio_social_links';
const CLIENT_LOGOS_KEY = 'portfolio_client_logos';
const AUTH_TOKEN_KEY = 'portfolio_admin_token';

// Default initial data
const DEFAULT_SITE_DATA = {
  navbar_logo: 'PORTFOLIO',
  hero_title: 'IT PROJECT\nMANAGER &\nSYSTEM ANALYST',
  hero_description: 'Crafting precise digital products with Vue.js, Nuxt, and the modern web stack.',
  portrait_url: '/avatar.png',
  hero_prefix: 'RAFIESTER',
  usp_title: 'What Can I Do For Your Needs',
  usp_description: "lorem ipsum is simply dummy text of the printing and typesetting industry. lorem ipsum has been the industry's standard dummy text ever since the",
  meta_title: 'Professional | Graphic Designer & Web Developer Portfolio',
  meta_description: 'Professional portfolio, showcasing experienced web developer and graphic designer specializing in responsive, high-performance web applications and UI/UX design.',
  usp_stats: [
    { number: '100+', label: 'Projects Completed' },
    { number: '100+', label: 'Reviews Given' },
    { number: '100+', label: 'Happy Clients' },
    { number: '10+', label: 'Experience' }
  ],
  usp_services: [
    { title: 'UI/UX Design', projects: '100+ Project' },
    { title: 'Ux Research', projects: '100+ Project' },
    { title: 'Mobile App Design', projects: '100+ Project' }
  ],
  case_studies: [
    { title: 'Ui/Ux Design', desc: 'i have many years experience with social media design, creating art work and designs that will promote businesses. i have a lot', button_text: 'See More', icon_type: 'design' },
    { title: 'Web Design', desc: 'i have many years experience with social media design, creating art work and designs that will promote businesses. i have a lot', button_text: 'See More', icon_type: 'web' },
    { title: 'Ui/Ux Design', desc: 'i have many years experience with social media design, creating art work and designs that will promote businesses. i have a lot', button_text: 'See More', icon_type: 'mobile' }
  ]
};

const DEFAULT_SOCIAL_LINKS = [
  { platform: 'Dribbble', url: '#', is_accent: true },
  { platform: 'GitHub', url: '#', is_accent: false },
  { platform: 'Behance', url: '#', is_accent: false },
  { platform: 'LinkedIn', url: '#', is_accent: false }
];

const DEFAULT_CLIENT_LOGOS = [
  { name: 'ASUS', logo_svg: null },
  { name: 'Allianz', logo_svg: null },
  { name: 'CHASE', logo_svg: null },
  { name: 'The New York Times', logo_svg: null },
  { name: 'LinkedIn', logo_svg: null }
];

export const localCms = {
  loadData() {
    let siteData = localStorage.getItem(SITE_DATA_KEY);
    let socialLinks = localStorage.getItem(SOCIAL_LINKS_KEY);
    let clientLogos = localStorage.getItem(CLIENT_LOGOS_KEY);

    let siteDataObj = siteData ? JSON.parse(siteData) : {};
    
    // Auto-migrate old defaults to new ones
    const normalizedTitle = siteDataObj.hero_title ? siteDataObj.hero_title.replace(/\s+/g, ' ').trim() : '';
    if (!siteDataObj.hero_title || 
        siteDataObj.hero_title === 'I HAVE GRAPHIC DESIGN OR WEB DEVELOP EXPERIENCE' || 
        siteDataObj.hero_title === 'SENIOR FRONTEND & FULLSTACK DEVELOPER' ||
        siteDataObj.hero_title === 'SENIOR FRONTEND &\nFULLSTACK\nDEVELOPER' ||
        normalizedTitle === 'IT PROJECT MANAGER & SYSTEM ANALYST') {
      siteDataObj.hero_title = DEFAULT_SITE_DATA.hero_title;
    }
    if (!siteDataObj.hero_description || siteDataObj.hero_description.startsWith('i have many years experience with social media design')) {
      siteDataObj.hero_description = DEFAULT_SITE_DATA.hero_description;
    }
    if (!siteDataObj.hero_prefix) {
      siteDataObj.hero_prefix = DEFAULT_SITE_DATA.hero_prefix;
    }

    // Backward compatibility merge with defaults
    siteDataObj = { ...DEFAULT_SITE_DATA, ...siteDataObj };

    if (!siteData || siteDataObj.hero_title === DEFAULT_SITE_DATA.hero_title) {
      localStorage.setItem(SITE_DATA_KEY, JSON.stringify(siteDataObj));
    }
    if (!socialLinks) {
      socialLinks = JSON.stringify(DEFAULT_SOCIAL_LINKS);
      localStorage.setItem(SOCIAL_LINKS_KEY, socialLinks);
    }
    if (!clientLogos) {
      clientLogos = JSON.stringify(DEFAULT_CLIENT_LOGOS);
      localStorage.setItem(CLIENT_LOGOS_KEY, clientLogos);
    }

    return {
      siteData: siteDataObj,
      socialLinks: JSON.parse(socialLinks),
      clientLogos: JSON.parse(clientLogos)
    };
  },

  saveData(data) {
    if (data.siteData) {
      localStorage.setItem(SITE_DATA_KEY, JSON.stringify(data.siteData));
    }
    if (data.socialLinks) {
      localStorage.setItem(SOCIAL_LINKS_KEY, JSON.stringify(data.socialLinks));
    }
    if (data.clientLogos) {
      localStorage.setItem(CLIENT_LOGOS_KEY, JSON.stringify(data.clientLogos));
    }
  },

  login(email, password) {
    if (email === 'admin@example.com' && password === 'password123') {
      localStorage.setItem(AUTH_TOKEN_KEY, 'true');
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  isAuthenticated() {
    return localStorage.getItem(AUTH_TOKEN_KEY) === 'true';
  }
};
