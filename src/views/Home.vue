<template>
  <div class="home">
    <HelloWorld msg="Do you want to Crounch ?" />
    <Signup />
  </div>
</template>

<script>
import HelloWorld from '../../src/components/HelloWorld/HelloWorld.vue';
import Signup from '../../src/components/Signup/Signup.vue';

export default {
  name: "home",
  components: {
    HelloWorld,
    Signup
  }
};
</script>
