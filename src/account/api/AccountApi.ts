import { Api } from '@/common/api/Api'
import { doFetch } from '@/api/doFetch'
import { LoginResponse, SignupResponse } from './responses'

export class AccountApi extends Api {
  protected BASE_URL = 'account'

  public signup(email: string, password: string): Promise<SignupResponse> {
    const path = this.computePath('signup')
    return doFetch({
      path,
      method: 'POST',
      data: {
        email,
        password,
      },
    });
  }

  public login(email: string, password: string): Promise<LoginResponse> {
    const path = this.computePath('login')

    return doFetch({
      path,
      method: 'POST',
      data: {
        email,
        password,
      },
    })
  }

  public logout(): Promise<void> {
    const url = this.computePath('logout')

    return doFetch({
      path: url,
      method: 'POST'
    })
  }
}
