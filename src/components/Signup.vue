<template>
  <div id="signup">
    <h2>Inscription</h2>
    <div v-if="displayErrorMessage" id="signup-error">{{ error }}</div>
    <form @submit.prevent="signup">
      <div v-if="!isEmailValid" class="error" id="email-error">
        Please enter a valid email.
      </div>
      <div v-if="!isPasswordValid" class="error" id="password-error">
        Please enter a password.
      </div>
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="submit" value="S'inscrire" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import { validateEmail } from '@/utils/form-validation';
import { FetchError } from '@/utils/error';
import { AuthModule } from '@/store/auth/AuthModule';

@Component
export default class Signup extends Vue {
  public authModule: AuthModule = getModule(AuthModule)

  email: string = '';
  password: string = '';
  error: string = ''

  signup() {
    if (!this.isEmailValid || !this.isPasswordValid) {
      return;
    }
    const { email, password } = this;
    this.authModule.signup({ email, password })
      .then(() => this.$router.replace('/lists'))
      .catch((err: FetchError) => this.handleSignupError(err));
  }

  public handleSignupError(err: FetchError) {
    switch (err.status) {
      case 409:
        this.error = 'Cet email est invalide ou déjà pris.'
        break;
      default:
        this.error = 'Une erreur inconnue est survenue.'
        break;
    }
  }

  get displayErrorMessage(): boolean {
    return this.error !== '';
  }

  get isEmailValid(): boolean {
    return !!validateEmail(this.email);
  }

  get isPasswordValid(): boolean {
    return this.password.length >= 4;
  }

}
</script>
