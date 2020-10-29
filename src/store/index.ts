import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { auth } from './auth';
import { ListModule } from './ListModule';
import { product } from './product'

Vue.use(Vuex);

export interface RootState {
  dummy: string;
}

const store: StoreOptions<RootState> = {
  state: {
    dummy: '',
  },
  modules: {
    auth,
    ListModule,
    product,
  },
  strict: true,
};

export default new Vuex.Store<RootState>(store);
