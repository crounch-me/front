import Vue from 'vue';
import Vuex, { StoreOptions, ActionContext } from 'vuex';
import { auth } from './auth';

Vue.use(Vuex);

export interface RootState {
  dummy: string;
}

export type ActionCall<S, R> = (injectee: ActionContext<S, R>, payload?: any) => any;

const store: StoreOptions<RootState> = {
  state: {
    dummy: '',
  },
  modules: {
    auth,
  },
  strict: true,
};

export default new Vuex.Store<RootState>(store);
