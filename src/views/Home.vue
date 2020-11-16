<template>
  <div class="home">
    <HelloWorld msg="Voulez-vous crouncher avec moi ce soir ?" />
    <Signup />
    <Login />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import HelloWorld from '@/components/HelloWorld.vue';
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';
import CreateList from '@/components/CreateList.vue';
import { ListModule } from '@/store/list/ListModule';
import { AuthModule } from '@/store/auth/AuthModule';

@Component({
  components: {
    HelloWorld,
    Signup,
    Login,
  },
})
export default class Home extends Vue {
  public authModule: AuthModule = getModule(AuthModule)

  mounted() {
    if (this.authModule.isAuthenticated) {
      this.$router.push('/lists');
    }
  }
}
</script>
