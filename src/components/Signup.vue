<template>
  <div class="spinner">
    <img src="../assets/loading.svg" alt="loading"/>
  </div>
</template>

<script>
import router from './../router';

export default {
  name: 'callback',
  props: ['auth'],
  data() {
    this.axios.post('http://localhost:3000/users').then(() => {
      router.replace({path: '/'})
    })
    return {}
  }
}
</script>

<style scoped>
 .spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
