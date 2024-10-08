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
    keepalive: {
      max: 100,
    },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: '/css/scroller.css', // 引用生成的静态样式文件
        },
        {
          rel: 'stylesheet',
          href: '/css/antd.css', // 引用生成的静态样式文件
        },
        {
          rel: 'stylesheet',
          href: '/css/style.css', // 引用生成的静态样式文件
        },
      ],
      script: [
        // 百度统计
        // { src: 'https://hm.baidu.com/hm.js?2a59a39629cd35dc4ec0cf17b9304e0b' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      ClientId: process.env.CLIENT_ID,
      ClientSecret: process.env.CLIENT_SECRET,
    },
  },
  components: {
    /**
     * 要禁用自动导入的话，components.dirs设置为空数组
     * 但请注意，这不会影响模块添加的组件
     */
    // dirs: [],
    global: true,
    dirs: ['~/components', '~/types', '~/stores', '~/icons'],
  },
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@ant-design-vue/nuxt',
    '@nuxtjs/i18n',
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
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },
});
