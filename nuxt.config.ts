// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  compatibilityDate: '2024-07-04',
  devServer: {
    host: 'im.iczp.net',
    port: 3333,
  },
  srcDir: 'src/',
  webpack: {
    extractCSS: {
      ignoreOrder: true,
    },
  },
  app: {
    baseURL: '/',
    rootId: 'chatmaxim',
    buildAssetsDir: 'static',
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: '/css/scroller.css', // 引用生成的静态样式文件
        },
      ],
      script: [
        // 百度统计
        // { src: 'https://hm.baidu.com/hm.js?2a59a39629cd35dc4ec0cf17b9304e0b' },
      ],
    },
  },
  runtimeConfig: {
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    public: {
      githubClientId: process.env.GITHUB_CLIENT_ID,
    },
  },
  components: {
    /**
     * 要禁用自动导入的话，components.dirs设置为空数组
     * 但请注意，这不会影响模块添加的组件
     */
    // dirs: [],
    global: true,
    dirs: ['~/components', ],
  },
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  tailwindcss: {
    // cssPath: false,
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: { endpoint: '/_tailwind', exportViewer: true },
  },

});