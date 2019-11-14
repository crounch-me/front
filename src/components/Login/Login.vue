<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div v-if="!isEmailValid" class="error" id="email-error">Please enter a valid email.</div>
      <div v-if="!isPasswordValid" class="error" id="password-error">Please enter a password.</div>
      <div v-if="loginSuccess" class="success">You've logged in successfully !!</div>
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="submit" value="Se connecter" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { login } from '@/api/user';
import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import { validateEmail } from '@/utils/form-validation';

@Component
export default class Login extends Vue {
  email: string = '';
  password: string = '';
  loginSuccess: boolean = false;

  login() {
    if (!this.isEmailValid || !this.isPasswordValid) {
      return;
    }
    login(this.email, this.password).then(response => {
      this.loginSuccess = true;
      localStorage.setItem(TOKEN_STORAGE_KEY, response.accessToken);
    });
  }

  get isEmailValid(): boolean {
    return !!validateEmail(this.email);
  }

  get isPasswordValid(): boolean {
    return this.password.length !== 0;
  }
}
</script>
