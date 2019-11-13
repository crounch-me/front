<template>
  <form @submit.prevent="signup">
    <div v-if="!isEmailValid" class="error" id="email-error">Please enter a valid email.</div>
    <div v-if="!isPasswordValid" class="error" id="password-error">Please enter a password.</div>
    <div v-if="signupSuccess" class="success">You've signed up successfully !!</div>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <input type="submit" value="S'inscrire" />
  </form>
</template>

<script lang="ts">
import axios from 'axios';

import { Component, Vue } from 'vue-property-decorator';
import { validateEmail } from '@/utils/form-validation';
import { signup } from '@/api/user';

@Component
export default class Signup extends Vue {
  email: string = '';
  password: string = '';
  signupSuccess: boolean = false;

  signup() {
    if (!this.isEmailValid || !this.isPasswordValid) {
      return;
    }
    signup(this.email, this.password).then(() => { this.signupSuccess = true });
  }

  get isEmailValid(): boolean {
    return !!validateEmail(this.email);
  }

  get isPasswordValid(): boolean {
    return this.password.length !== 0;
  }
}
</script>
