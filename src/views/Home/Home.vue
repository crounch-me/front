<template>
  <div class="home">
    <HelloWorld msg="Do you want to Crounch ?" />
    <h1 v-if="this.isAuthenticated">Connecté</h1>
    <Signup v-show="!this.isAuthenticated" />
    <Login v-show="!this.isAuthenticated" />
    <div v-show="this.isAuthenticated">
      <Search />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';

import HelloWorld from '@/components/HelloWorld/HelloWorld.vue';
import Signup from '@/components/Signup/Signup.vue';
import Login from '@/components/Login/Login.vue';
import Search from '@/components/Search/Search.vue';
import CreateList from '@/components/CreateList/CreateList.vue';
import { authNamespace } from '@/store/auth';
import { AuthActions, AuthGetters } from '@/store/auth/keys';
import { ListMutations } from '@/store/list/keys';
import { listNamespace } from '@/store/list';

@Component({
  components: {
    HelloWorld,
    Signup,
    Login,
    Search,
  },
})
export default class Home extends Vue {
  @Getter(AuthGetters.IS_AUTHENTICATED, authNamespace) isAuthenticated!: boolean;

  mounted() {
    if (this.isAuthenticated) {
      this.$router.push('/lists');
    }
  }
}
</script>
