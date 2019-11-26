<template>
  <div id="signup">
    <h2>Signup</h2>
    <form @submit.prevent="signup">
      <div v-if="!isEmailValid" class="error" id="email-error">Please enter a valid email.</div>
      <div v-if="!isPasswordValid" class="error" id="password-error">Please enter a password.</div>
      <div v-if="signupSuccess" class="success">You've signed up successfully !!</div>
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="submit" value="S'inscrire" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import { validateEmail } from '@/utils/form-validation';
import { AuthKeys } from '@/store/auth/keys';
import { authNamespace } from '@/store/auth';

@Component
export default class Signup extends Vue {
  @Action(AuthKeys.SIGNUP, authNamespace) doSignup: any;

  email: string = '';
  password: string = '';
  signupSuccess: boolean = false;

  signup() {
    if (!this.isEmailValid || !this.isPasswordValid) {
      return;
    }

    const { email, password } = this;
    this.doSignup({ email, password }).then(() => {
      this.signupSuccess = true;
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
