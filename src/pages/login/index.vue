<script setup lang="ts">
import { reactive, ref } from 'vue';
import { login, isLogined } from '../../apis/auth/TokenController';
// import { router } from '../routes';

import { message } from 'ant-design-vue';
import {
  UserOutlined,
  LockOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import type { TokenDto } from '../../apis/auth/dto';
// import { setAuthorize } from '../ipc/setAuthorize';
// import { useAppInfo } from '../commons/useAppInfo';
import { useI18n } from 'vue-i18n';
// import { openAppSettings } from '../ipc/openAppSettings';

const { t, d, n, locale, availableLocales } = useI18n();
availableLocales.forEach((locale: any) => {
  console.log(`${locale} locale messages`, locale);
});
const key = 'updatable';

interface FormState {
  username: string;
  password: string;
  isAutoLogin: boolean;
}

const formState = reactive<FormState>({
  username: 'admin',
  password: '1q2w3E*',
  isAutoLogin: true,
});

const openLoginPopup = (url: string) => {
  const width = 600,
    height = 700;
  const left = screen.width / 2 - width / 2;
  const top = screen.height / 2 - height / 2;
  // const url = 'YOUR_AUTHORIZATION_URL'; // 替换为你的授权服务器 URL
  const windowFeatures = `toolbar=no, menubar=no,titlebar=no, dialog=yes, width=${width}, height=${height}, top=${top}, left=${left}`;
  window.open(url, 'Login', windowFeatures);
};

const authLogin = () => {
  console.log('login');
  const clientId = 'Nuxt3_Web';
  const clientSecret = '1q2w3e*';
  const authHost = 'http://10.0.5.20:8043';
  //   const callbackUri = 'https://localhost:44344/swagger/oauth2-redirect.html';
  const callbackUri = 'http://im.iczp.net:3333/login/callback';
  const redirectUri = encodeURIComponent(callbackUri);
  const responseType = 'code';
  const scope = encodeURIComponent('address email phone profile roles IM');

  const authUrl = `${authHost}/connect/authorize?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  // window.location.href = authUrl;
  openLoginPopup(authUrl);

  //   https://localhost:44344/swagger/oauth2-redirect.html?code=WuYXfuTm6VdlLKgYLE4lc-6aFUHMt9GlF_6eagd3dtk&iss=http%3A%2F%2F10.0.5.20%3A8043%2F
};

const onFinish = (values: any) => {
  authLogin();
  console.log('Success:', values, message);
  message.loading({ content: t('Logging in'), key });
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

// const { appId, appName, author, websize, version, copyright } = useAppInfo();
</script>

<template>
  <div class="page drag">
    <div class="login-page no-drag">
      <div>isLogined:{{ isLogined() }}</div>
      <!-- <p>userDataPath:{{ userDataPath }}</p> -->
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        class="login-form"
      >
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">{{
            t('Login')
          }}</a-button>
        </a-form-item>
        <!-- {{ locale }} -->
      </a-form>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: unset;
  border: none;
}
.footer {
  background-color: unset;
  border: none;
  font-size: 12px;
  align-items: center;
  justify-content: center;
}

.page {
  width: 100%;
  height: 100%;
}
.prefix {
  /* color: var(--color); */
  font-weight: normal;
}

.login-page {
  padding: 20px;
  /* position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(11, 7, 37);
  box-shadow: 0 0 5px #cccccc89;
  padding: 30px;
  border-radius: 5px; */
}
.login-page:hover {
  /* box-shadow: 0 0 10px #cccccc89; */
}
.login-form {
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  margin: 0 auto;
  max-width: 500px;
}
</style>
