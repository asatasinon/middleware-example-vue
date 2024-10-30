// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxt/devtools',
    '@nuxtjs/i18n'
  ],
  ssr: true,
  i18n: {
    langDir: '../locales',
    defaultLocale: 'zh_cn',
    locales: [
      {
        code: 'zh_cn',
        name: '简体中文',
        file: 'zh_cn.json'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      }
    ],
    strategy: 'prefix_except_default'
  }
})
