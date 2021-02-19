import { AccountModule } from '@/account/store/AccountModule';
import { NavigationGuardNext, Route } from 'vue-router';
import { getModule } from 'vuex-module-decorators';

export function authenticationGuard(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  const accountModule = getModule(AccountModule)
  if (!accountModule.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
}
