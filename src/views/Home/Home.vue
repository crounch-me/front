<template>
  <div class="home">
    <HelloWorld msg="Do you want to Crounch ?" />
    <Signup />
    <Login />
    <Search />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';

import HelloWorld from '@/components/HelloWorld/HelloWorld.vue';
import Signup from '@/components/Signup/Signup.vue';
import Login from '@/components/Login/Login.vue';
import Search from '@/components/Search/Search.vue';

@Component({
  components: {
    HelloWorld,
    Signup,
    Login,
    Search,
  },
})
export default class Home extends Vue { }
</script>
