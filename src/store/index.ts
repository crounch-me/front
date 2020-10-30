import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { config } from 'vuex-module-decorators'

Vue.use(Vuex);

export interface RootState { }

const store: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV === 'production',
};

config.rawError = true

export default new Vuex.Store<RootState>(store);
