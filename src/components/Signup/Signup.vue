<template>
  <form>
    <div v-if="error" class="error">Please enter a valid email.</div>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <input type="submit" value="S'inscrire" />
  </form>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    error() {
      return this.email.trim().length < 3;
    }
  }
};
</script>
