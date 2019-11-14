<template>
  <div class="home">
    <HelloWorld msg="Do you want to Crounch ?" />
    <Signup />
    <Login />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';

import HelloWorld from '@/components/HelloWorld/HelloWorld.vue';
import Signup from '@/components/Signup/Signup.vue';
import Login from '@/components/Login/Login.vue';

@Component({
  components: {
    HelloWorld,
    Signup,
    Login,
  },
})
export default class Home extends Vue { }
</script>
