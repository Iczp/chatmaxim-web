import { acceptHMRUpdate, defineStore } from 'pinia';

interface State {
  count: number;
}
export const useCounterStore = defineStore('counter', {
  state: (): State => {
    return { count: 0 };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
