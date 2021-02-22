import { Api } from '@/common/api/Api'
import { doFetch } from '@/api/doFetch'
import { LoginResponse, SignupResponse } from './responses'

export class AccountApi extends Api {
  protected BASE_URL = 'account'

  public signup(email: string, password: string): Promise<SignupResponse> {
    const url = this.computeUrl('signup')
    return doFetch({
      path: url,
      method: 'POST',
      data: {
        email,
        password,
      },
    });
  }

  public login(email: string, password: string): Promise<LoginResponse> {
    const url = this.computeUrl('login')

    return doFetch({
      path: url,
      method: 'POST',
      data: {
        email,
        password,
      },
    })
  }

  public logout(): Promise<void> {
    const url = this.computeUrl('logout')

    return doFetch({
      path: url,
      method: 'POST'
    })
  }
}
