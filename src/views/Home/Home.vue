<template>
  <div class="home">
    <HelloWorld msg="Do you want to Crounch ?" />
    <Signup />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';

import HelloWorld from '@/components/HelloWorld/HelloWorld.vue';
import Signup from '@/components/Signup/Signup.vue';

@Component({
  components: {
    HelloWorld,
    Signup,
  }
})
export default class Home extends Vue {
}
</script>
