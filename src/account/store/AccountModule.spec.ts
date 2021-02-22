import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import { FetchError, ErrorBody } from '@/utils/error';
import { LoginResponse, SignupResponse } from '@/account/api/responses'
import { AccountModule } from './AccountModule'

const signup = jest.fn()
const login = jest.fn()
const logout = jest.fn()

jest.mock('@/account/api/AccountApi', () => ({
  AccountApi: jest
    .fn()
    .mockImplementation(() => ({ signup, login, logout })),
}))

describe('AccountModule', () => {
  let accountModule: AccountModule
  let getItemMock: jest.SpyInstance
  let setItemMock: jest.SpyInstance
  let removeItemMock: jest.SpyInstance
  const token = 'fake-token'
  const id = 'fake-id'
  const email = 'email'
  const password = 'password'
  const message = 'login failed'
  const status = 500
  const body: ErrorBody = {
    code: 'unknown-error',
    description: 'an unknown error occurred'
  }
  const fetchError = new FetchError(message, status, body)

  beforeEach(() => {
    accountModule = new AccountModule(AccountModule)

    getItemMock = jest.spyOn(Storage.prototype, 'getItem')
    setItemMock = jest.spyOn(Storage.prototype, 'setItem')
    removeItemMock = jest.spyOn(Storage.prototype, 'removeItem')

    getItemMock.mockClear()
    setItemMock.mockClear()
    removeItemMock.mockClear()
  })

  describe('init', () => {
    it('should initialize token in state to the token from local storage when it is found', () => {
      getItemMock.mockReturnValue(token)

      accountModule = new AccountModule(AccountModule)

      expect(accountModule.token).toBe(token)
    })

    it('should initialize token in state to an empty string when it is found', () => {
      getItemMock.mockReset()

      accountModule = new AccountModule(AccountModule)

      expect(accountModule.token).toBe('')
    })

    it('should initialize status in state to empty string', () => {
      expect(accountModule.status).toBe('')
    })
  })

  describe('isAuthenticated', () => {
    it('should return true when token is defined in state', () => {
      accountModule.token = token

      const result = accountModule.isAuthenticated

      expect(result).toBeTruthy()
    })

    it('should return false when token is not defined in state', () => {
      accountModule.token = ''

      const result = accountModule.isAuthenticated

      expect(result).toBeFalsy()
    })
  })

  describe('login', () => {
    it('should set token in state', () => {
      accountModule.token = ''

      accountModule.login(token)

      expect(accountModule.token).toBe(token)
    })
  })

  describe('logout', () => {
    it('should set token in state to an empty string', () => {
      accountModule.token = token

      accountModule.logout()

      expect(accountModule.token).toBe('')
    })
  })

  describe('loginAction', () => {
    beforeEach(() => {
      const loginResponse: LoginResponse = {
        token
      };

      login.mockResolvedValue(loginResponse)
    })

    describe('success', () => {
      it('should store the token in local storage when the login request is successful', async () => {
        await accountModule.loginAction({ email, password })

        expect(setItemMock).toHaveBeenCalledTimes(1)
        expect(setItemMock).toHaveBeenCalledWith(TOKEN_STORAGE_KEY, token)
      })

      it('should return token when the login request is successful', async () => {
        const result = await accountModule.loginAction({ email, password })

        expect(result).toBe(token)
      })
    })

    describe('fail', () => {
      beforeEach(() => {
        (login as jest.Mock).mockRejectedValue(fetchError)
      })

      it('should remove token from local storage when the login request fails', async () => {
        try {
          await accountModule.loginAction({ email, password })
          throw new Error("login request didn't fail")
        } catch (err) {
          expect(removeItemMock).toHaveBeenCalledTimes(1)
          expect(removeItemMock).toHaveBeenCalledWith(TOKEN_STORAGE_KEY)
        }
      })

      it('should throw error when the login request fails', async () => {
        try {
          await accountModule.loginAction({ email, password })
          throw new Error("login request didn't fail")
        } catch (err) {
          expect(err).toEqual(fetchError)
        }
      })
    })
  })

  describe('signupAction', () => {
    it('should call login action when login request is successful', async () => {
      const signupResponse: SignupResponse = {
        email,
        id,
      };

      (signup as jest.Mock).mockResolvedValue(signupResponse)

      accountModule.loginAction = jest.fn()

      await accountModule.signup({ email, password })

      expect(accountModule.loginAction).toHaveBeenCalledTimes(1)
      expect(accountModule.loginAction).toHaveBeenCalledWith({ email, password })
    })

    it('should throw error when login request fails', async () => {
      (signup as jest.Mock).mockRejectedValue(fetchError)

      try {
        await accountModule.signup({ email, password })
        throw new Error("singup request didn't fail")
      } catch (err) {
        expect(err).toEqual(fetchError)
      }
    })
  })

  describe('logoutAction', () => {
    beforeEach(() => {
      (logout as jest.Mock).mockResolvedValue({})
    })

    it('should call api to logout', async () => {
      await accountModule.logoutAction()

      expect(logout).toHaveBeenCalledTimes(1)
    })

    it('should not throw fetch error when status of error is 404', async () => {
      const code = 'not-found'
      const description = 'user not found'
      const errorBody: ErrorBody = {
        code,
        description
      }
      const fetchError = new FetchError('Not found', 404, errorBody);

      (logout as jest.Mock).mockRejectedValue(fetchError)

      try {
        await accountModule.logoutAction()
      }catch(err) {
        throw new Error('AccountModule should not throw an error')
      }
    })

    it('should throw an error when status of error is different from 404', async () => {
      const code = 'internal-server-error'
      const description = 'Something went terribly wrong'
      const errorBody: ErrorBody = {
        code,
        description
      };

      const fetchError = new FetchError('Internal server error', 500, errorBody);

      (logout as jest.Mock).mockRejectedValue(fetchError)

      try {
        await accountModule.logoutAction()
        throw new Error('Auth module should have thrown an error')
      } catch(err) {
        expect(err).toEqual(fetchError)
      }
    })

    it('should remove token from local storage', async () => {
      await accountModule.logoutAction()

      expect(removeItemMock).toHaveBeenCalledTimes(1)
      expect(removeItemMock).toHaveBeenCalledWith(TOKEN_STORAGE_KEY)
    })
  })
})
