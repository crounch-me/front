import store from '@/store'
import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { AuthPayload } from './payloads';
import { FetchError } from '@/utils/error';
import { AccountApi } from '@/account/api/AccountApi'

const MODULE_NAME = 'account'

@Module({ dynamic: true, store, name: MODULE_NAME, namespaced: true })
export class AccountModule extends VuexModule {
  private accountApi: AccountApi = new AccountApi()

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
      const res = await this.accountApi.login(email, password)
      token = res.token
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
    await this.accountApi.signup(email, password)
    return this.loginAction(authPayload)
  }

  @Action({ commit: 'logout' })
  public async logoutAction() {
    try {
      await this.accountApi.logout()
    } catch(err) {
      const fetchError = err as FetchError
      if (fetchError.status != 404) {
        throw err
      }
    }

    localStorage.removeItem(TOKEN_STORAGE_KEY)
    return
  }
}
