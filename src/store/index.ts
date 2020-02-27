import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { auth } from './auth';
import { list } from './list';
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
    list,
    product,
  },
  strict: true,
};

export default new Vuex.Store<RootState>(store);
