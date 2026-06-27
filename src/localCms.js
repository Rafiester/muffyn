const SITE_DATA_KEY = 'portfolio_site_data';
const SOCIAL_LINKS_KEY = 'portfolio_social_links';
const CLIENT_LOGOS_KEY = 'portfolio_client_logos';
const AUTH_TOKEN_KEY = 'portfolio_admin_token';

// Default initial data
const DEFAULT_SITE_DATA = {
  navbar_logo: 'RAFI',
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
  case_studies_title: 'Case Studies',
  case_studies_description: 'A showcase of my recent creative works, system configurations, and frontend development projects.',
  case_studies: [
    { title: 'Ui/Ux Design', desc: 'i have many years experience with social media design, creating art work and designs that will promote businesses. i have a lot', button_text: 'See More', icon_type: 'design' },
    { title: 'Web Design', desc: 'i have many years experience with social media design, creating art work and designs that will promote businesses. i have a lot', button_text: 'See More', icon_type: 'web' },
    { title: 'Ui/Ux Design', desc: 'i have many years experience with social media design, creating art work and designs that will promote businesses. i have a lot', button_text: 'See More', icon_type: 'mobile' }
  ],
  career_prefix: 'EXPERIENCE',
  career_title: 'Professional Journey',
  career_subtitle: 'My track record in delivering tech solutions.',
  career_items: [
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
  ],
  about_title: 'Bridging Business Needs & Technical Execution',
  about_description: 'A hybrid approach to digital product development, combining system analysis, frontend engineering, and agile project management to deliver successful software solutions.',
  about_story: 'I am a hybrid professional who speaks both the language of code and the language of business. With a background in system analysis and frontend development (Vue/Nuxt), I transitioned into Project Management to ensure that beautiful code actually solves real-world problems. I build systems, manage timelines, and protect my team\'s focus.',
  about_tech_skills: ['Vue.js', 'Nuxt', 'REST APIs', 'SQL', 'Figma', 'System Design'],
  about_management_skills: ['Agile/Scrum', 'Sprint Planning', 'Jira', 'Risk Mitigation', 'Resource Allocation'],
  about_stat_experience: '5+',
  about_stat_delivery: '100%',
  about_stat_scope: 'Zero'
};

const DEFAULT_SOCIAL_LINKS = [
  { platform: 'GitHub', url: '#', is_accent: true },
  { platform: 'Instagram', url: '#', is_accent: false },
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
    if (!siteDataObj.navbar_logo || siteDataObj.navbar_logo === 'PORTFOLIO') {
      siteDataObj.navbar_logo = 'RAFI';
    }

    let needsSave = false;
    if (!siteDataObj.career_items) {
      siteDataObj.career_items = DEFAULT_SITE_DATA.career_items;
      needsSave = true;
    }
    if (!siteDataObj.career_prefix) {
      siteDataObj.career_prefix = DEFAULT_SITE_DATA.career_prefix;
      needsSave = true;
    }
    if (!siteDataObj.career_title) {
      siteDataObj.career_title = DEFAULT_SITE_DATA.career_title;
      needsSave = true;
    }
    if (!siteDataObj.career_subtitle) {
      siteDataObj.career_subtitle = DEFAULT_SITE_DATA.career_subtitle;
      needsSave = true;
    }
    if (!siteDataObj.about_title) {
      siteDataObj.about_title = DEFAULT_SITE_DATA.about_title;
      needsSave = true;
    }
    if (!siteDataObj.about_description) {
      siteDataObj.about_description = DEFAULT_SITE_DATA.about_description;
      needsSave = true;
    }
    if (!siteDataObj.about_story) {
      siteDataObj.about_story = DEFAULT_SITE_DATA.about_story;
      needsSave = true;
    }
    if (!siteDataObj.about_tech_skills) {
      siteDataObj.about_tech_skills = DEFAULT_SITE_DATA.about_tech_skills;
      needsSave = true;
    }
    if (!siteDataObj.about_management_skills) {
      siteDataObj.about_management_skills = DEFAULT_SITE_DATA.about_management_skills;
      needsSave = true;
    }
    if (!siteDataObj.about_stat_experience) {
      siteDataObj.about_stat_experience = DEFAULT_SITE_DATA.about_stat_experience;
      needsSave = true;
    }
    if (!siteDataObj.about_stat_delivery) {
      siteDataObj.about_stat_delivery = DEFAULT_SITE_DATA.about_stat_delivery;
      needsSave = true;
    }
    if (!siteDataObj.about_stat_scope) {
      siteDataObj.about_stat_scope = DEFAULT_SITE_DATA.about_stat_scope;
      needsSave = true;
    }


    // Backward compatibility merge with defaults
    siteDataObj = { ...DEFAULT_SITE_DATA, ...siteDataObj };

    if (!siteData || siteDataObj.hero_title === DEFAULT_SITE_DATA.hero_title || needsSave) {
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

    let socialLinksList = JSON.parse(socialLinks);
    socialLinksList = socialLinksList.filter(link => link.platform.toLowerCase() !== 'dribbble');
    socialLinksList = socialLinksList.map(link => {
      if (link.platform.toLowerCase() === 'behance') {
        link.platform = 'Instagram';
      }
      return link;
    });

    return {
      siteData: siteDataObj,
      socialLinks: socialLinksList,
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
