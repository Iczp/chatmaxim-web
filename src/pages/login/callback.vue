<script setup lang="ts">
import { loginByCode } from '../../apis/auth/TokenController';
const route = useRoute();

const code = route.query.code as string | undefined;
const iss = route.query.iss as string | undefined;

const error = ref();

const isPending = ref(false);

const postMessage = (payload: Record<string, any>) => {
  window.opener.postMessage(payload, window.location);
  // window.close();
};
if (code) {
  isPending.value = true;
  postMessage({ status: 'login-pending' });
  loginByCode({ code })
    .then(async (token) => {
      console.warn('token:', token, window.location);
      postMessage({ status: 'login-success', token });
    })
    .catch((error) => {
      error.value = error;
      let message = error?.body?.error_description || error.message;
      console.error('err:', error, JSON.stringify(error));
      postMessage({ status: 'login-fail', err: error });
    })
    .finally(() => {
      isPending.value = false;
      // window.close();
    });
}
</script>
<template>
  <div class="flex w-full h-full">
    <div v-if="isPending">loading...</div>
    <div v-else-if="error">
      <div>error:{{ error }}</div>
    </div>
    <div v-else-if="code">
      <div>code:{{ code }}</div>
      <div>iss:{{ iss }}</div>
    </div>
  </div>
</template>
