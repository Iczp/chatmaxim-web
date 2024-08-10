import VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import ContextMenu from '@imengyu/vue3-context-menu';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';

import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';

import { generateDeviceId } from '../utils/deviceIdHelper';

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.use(VueVirtualScroller);
  nuxtApp.vueApp.use(ContextMenu);

  nuxtApp.vueApp.use(PerfectScrollbarPlugin, {
    // tag: 'scroll-view',
    componentName: 'scroll-view',
  });

  await generateDeviceId();
});
