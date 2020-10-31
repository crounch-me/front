import store from '.'
import { login, logout, signup } from '@/api/user';
import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

interface AuthPayload {
  email: string
  password: string
}

@Module({ dynamic: true, store, name: 'auth' })
export class AuthModule extends VuexModule {
  public token = localStorage.getItem(TOKEN_STORAGE_KEY) || ''
  public status = ''

  get isAuthenticated(): boolean {
    return !!this.token
  }

  @Mutation
  login(token: string) {
    this.token = token
  }

  @Mutation
  logout() {
    this.token = ''
  }

  @Action({ commit: 'login' })
  public async loginAction({ email, password }: AuthPayload): Promise<string> {
    let token = ''

    try {
      const res = await login(email, password)
      token = res.accessToken
    } catch (err) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      throw err
    }

    localStorage.setItem(TOKEN_STORAGE_KEY, token)
    return token
  }

  @Action
  public async signup(authPayload: AuthPayload) {
    const { email, password } = authPayload
    await signup(email, password)
    return this.loginAction(authPayload)
  }

  @Action({ commit: 'logout' })
  public async logoutAction() {
    await logout()
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    return
  }
}
