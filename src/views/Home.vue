<template>
  <div class="home">
    <HelloWorld msg="Voulez-vous crouncher avec moi ce soir ?" />
    <Signup />
    <Login />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'

import HelloWorld from '@/components/HelloWorld.vue'
import Signup from '@/account/ui/components/Signup.vue'
import Login from '@/account/ui/components/Login.vue'
import { AccountModule } from '@/account/store/AccountModule'

@Component({
  components: {
    HelloWorld,
    Signup,
    Login,
  },
})
export default class Home extends Vue {
  public accountModule: AccountModule = getModule(AccountModule)

  mounted() {
    if (this.accountModule.isAuthenticated) {
      this.$router.push('/lists');
    }
  }
}
</script>
