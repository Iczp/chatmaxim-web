<script setup lang="ts">
import {loginByCode} from '../../apis/auth/TokenController';
const route = useRoute();

const code = route.query.code as string | undefined;
const iss = route.query.iis as string | undefined;

if (code) {
  loginByCode({code}).then(async (token) => {
    // token = await handleToken(token, 'fetchToken');
    // resolve({
    //   message: '登录成功',
    //   success: true,
    //   detail: token,
    // });
    console.warn('token:', token);
  })
  .catch((err) => {
    let message = err?.body?.error_description || err.message;
    console.error('err:', err, JSON.stringify(err));
    // reject({
    //   message: '登录失败:' + message,
    //   success: false,
    //   detail: err,
    // });
  });;
}
</script>
<template>
  <div>code:{{ code }}</div>
  <div>iss:{{ iss }}</div>

  <pre>

TokenService.fetchToken({
  client_id: env.client_id,
  client_secret: env.client_secret,
  grant_type: GrantTypeEnum.Password,
  username,
  password,
  scope: 'IM offline_access roles profile phone email address',
})
  .then(async (token) => {
    token = await handleToken(token, 'fetchToken');
    resolve({
      message: '登录成功',
      success: true,
      detail: token,
    });
  })
  .catch((err) => {
    let message = err?.body?.error_description || err.message;
    console.error('err:', err, JSON.stringify(err));
    reject({
      message: '登录失败:' + message,
      success: false,
      detail: err,
    });
  });
    </pre
  >
</template>
