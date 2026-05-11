export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
  ],

  googleFonts: {
    families: {
      'Cormorant Garamond': [300, 400, 500, 600],
      'Jost': [300, 400, 500],
    },
    display: 'swap',
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5000/api',
      labName: process.env.NUXT_PUBLIC_LAB_NAME || 'LabCare Diagnostics',
      labPhone: process.env.NUXT_PUBLIC_LAB_PHONE || '+91 98000 00000',
      labEmail: process.env.NUXT_PUBLIC_LAB_EMAIL || 'info@labcare.in',
      labAddress: process.env.NUXT_PUBLIC_LAB_ADDRESS || 'Pune, Maharashtra',
    },
  },

  app: {
    head: {
      title: 'Vigsan Healthcare Lab — Lab tests that come to your doorstep',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Vigsan Lab Test is a trusted online diagnostic platform offering accurate, affordable, and fast medical testing services. From routine blood tests to comprehensive health checkup packages, Vigsan provides reliable diagnostics with convenient home sample collection and quick digital reports. With advanced laboratory technology, certified professionals, and a patient-focused approach, Vigsan ensures quality healthcare services that are accessible, efficient, and secure. Book tests online, track reports easily, and take charge of your health with confidence.' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
