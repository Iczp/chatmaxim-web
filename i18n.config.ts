import zhCN from './src/locales/zh-CN.json';
import enUS from './src/locales/en-US.json';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zhCN',
  messages: {
    zhCN,
    enUS,
  },
}));
