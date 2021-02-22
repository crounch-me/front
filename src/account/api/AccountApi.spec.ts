import { doFetch } from '@/api/doFetch'
import { AccountApi } from './AccountApi'
import { AccountModule } from '@/account/store/AccountModule'

jest.mock('@/account/store/AccountModule')
jest.mock('@/api/doFetch')

describe('AccountApi', () => {
  const email = 'email'
  const password = 'password'

  let accountApi: AccountApi

  beforeEach(() => {
    (doFetch as jest.Mock).mockClear();
    (doFetch as jest.Mock).mockResolvedValue({})

    accountApi = new AccountApi()
  })

  describe('signup', () => {
    it('Should call signup endpoint with right parameters.', () => {
      accountApi.signup(email, password)

      expect(doFetch).toHaveBeenCalledWith({
        url: 'account/signup',
        method: 'POST',
        data: {
          email,
          password
        }
      })
    })
  })

  describe('login', () => {
    it('Should call login endpoint with right parameters.', () => {
      accountApi.login(email, password)

      expect(doFetch).toHaveBeenCalledWith({
        url: 'account/login',
        method: 'POST',
        data: { email, password }
      })
    })
  })

  describe('logout', () => {
    it('Should call logout endpoint.', () => {
      accountApi.logout()

      expect(doFetch).toHaveBeenCalledWith({
        url: 'account/logout',
        method: 'POST',
      })
    })
  })
})
