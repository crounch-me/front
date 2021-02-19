<template>
  <div id="login">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div v-if="!isEmailValid" class="error" id="email-error">
        Please enter a valid email.
      </div>
      <div v-if="!isPasswordValid" class="error" id="password-error">
        Please enter a password.
      </div>
      <div v-if="loginSuccess" class="success">
        You've logged in successfully !!
      </div>
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="submit" value="Se connecter" />
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import { validateEmail } from '@/utils/form-validation';
import { AccountModule } from '@/account/store/AccountModule';

@Component
export default class Login extends Vue {
  public accountModule: AccountModule = getModule(AccountModule)

  email: string = '';
  password: string = '';
  loginSuccess: boolean = false;

  login() {
    if (!this.isEmailValid || !this.isPasswordValid) {
      return;
    }

    const { email, password } = this;

    this.accountModule.loginAction({ email, password }).then(() => {
      this.$router.replace('/lists');
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
