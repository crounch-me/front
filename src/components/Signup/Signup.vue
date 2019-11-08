<template>
  <form>
    <div v-if="error" class="error">Please enter a valid email.</div>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <input type="submit" value="S'inscrire" />
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Signup extends Vue {
  email: string = '';
  password: string = '';

  get error(): boolean {
    return this.email.length < 3;
  }
}
</script>
