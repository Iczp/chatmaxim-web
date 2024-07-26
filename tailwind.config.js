/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/content/**/*.{md,yml,json}',
    './src/content/**/**/**/*.{md,yml,json}',
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './src/app.vue',
    './src/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14C6CB', // 设置主颜色为红色
        secondary: '#00ff00', // 设置次要颜色为绿色
        // ... 其他颜色
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
