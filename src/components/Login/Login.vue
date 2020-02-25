<template>
  <div id="login">
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
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import { login } from '@/api/user';
import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import { validateEmail } from '@/utils/form-validation';
import { AuthActions } from '@/store/auth/keys';
import { authNamespace } from '@/store/auth';

@Component
export default class Login extends Vue {
  @Action(AuthActions.LOGIN, authNamespace) doLogin: any;
  email: string = '';
  password: string = '';
  loginSuccess: boolean = false;

  login() {
    if (!this.isEmailValid || !this.isPasswordValid) {
      return;
    }
    const { email, password } = this;

    this.doLogin({ email, password }).then(() => {
      this.$router.push('/lists');
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
