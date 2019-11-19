<template>
  <div class="home">
    <HelloWorld msg="Do you want to Crounch ?" />
    <h1 v-if="this.isAuthenticated">
      Connecté
      <a id="logout" @click.prevent="logout">Se déconnecter</a>
    </h1>
    <Signup v-show="!this.isAuthenticated" />
    <Login v-show="!this.isAuthenticated" />
    <Search />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';

import HelloWorld from '@/components/HelloWorld/HelloWorld.vue';
import Signup from '@/components/Signup/Signup.vue';
import Login from '@/components/Login/Login.vue';
import Search from '@/components/Search/Search.vue';
import { authNamespace } from '../../store/auth';
import { AuthKeys } from '../../store/auth/keys';

@Component({
  components: {
    HelloWorld,
    Signup,
    Login,
    Search,
  },
})
export default class Home extends Vue {
  @Getter('isAuthenticated', authNamespace) isAuthenticated!: boolean;
  @Action(AuthKeys.LOGOUT, authNamespace) doLogout: any;

  logout() {
    this.doLogout();
  }
}
</script>
