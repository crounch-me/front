import { AuthModule } from '@/store/auth/AuthModule';
import { NavigationGuardNext, Route } from 'vue-router';
import { getModule } from 'vuex-module-decorators';

export function authenticationGuard(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  const authModule = getModule(AuthModule)
  if (!authModule.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
}
