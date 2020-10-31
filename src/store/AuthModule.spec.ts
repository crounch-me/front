import { login, LoginResponse, logout, signup, SignupResponse } from '@/api/user';
import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import { FetchError, ErrorBody } from '@/utils/error';
import { AuthModule } from './AuthModule'

jest.mock('@/api/user')

describe('AuthModule', () => {
  let authModule: AuthModule
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
    authModule = new AuthModule(AuthModule)

    getItemMock = jest.spyOn(Storage.prototype, 'getItem')
    setItemMock = jest.spyOn(Storage.prototype, 'setItem')
    removeItemMock = jest.spyOn(Storage.prototype, 'removeItem')

    setItemMock.mockClear()
    removeItemMock.mockClear()
  })

  describe('init', () => {
    it('should initialize token in state to the token from local storage when it is found', () => {
      getItemMock.mockReturnValue(token)

      authModule = new AuthModule(AuthModule)

      expect(authModule.token).toBe(token)
    })

    it('should initialize token in state to an empty string when it is found', () => {
      getItemMock.mockReset()

      authModule = new AuthModule(AuthModule)

      expect(authModule.token).toBe('')
    })

    it('should initialize status in state to empty string', () => {
      expect(authModule.status).toBe('')
    })
  })

  describe('isAuthenticated', () => {
    it('should return true when token is defined in state', () => {
      authModule.token = token

      const result = authModule.isAuthenticated

      expect(result).toBeTruthy()
    })

    it('should return false when token is not defined in state', () => {
      authModule.token = ''

      const result = authModule.isAuthenticated

      expect(result).toBeFalsy()
    })
  })

  describe('login', () => {
    it('should set token in state', () => {
      authModule.token = ''

      authModule.login(token)

      expect(authModule.token).toBe(token)
    })
  })

  describe('logout', () => {
    it('should set token in state to an empty string', () => {
      authModule.token = token

      authModule.logout()

      expect(authModule.token).toBe('')
    })
  })

  describe('loginAction', () => {
    beforeEach(() => {
      const loginResponse: LoginResponse = {
        accessToken: token
      };
      (login as jest.Mock).mockResolvedValue(loginResponse)
    })

    describe('success', () => {
      it('should store the token in local storage when the login request is successful', async () => {
        await authModule.loginAction({ email, password })

        expect(setItemMock).toHaveBeenCalledTimes(1)
        expect(setItemMock).toHaveBeenCalledWith(TOKEN_STORAGE_KEY, token)
      })

      it('should return token when the login request is successful', async () => {
        const result = await authModule.loginAction({ email, password })

        expect(result).toBe(token)
      })
    })

    describe('fail', () => {
      beforeEach(() => {
        (login as jest.Mock).mockRejectedValue(fetchError)
      })

      it('should remove token from local storage when the login request fails', async () => {
        try {
          await authModule.loginAction({ email, password })
          throw new Error("login request didn't fail")
        } catch (err) {
          expect(removeItemMock).toHaveBeenCalledTimes(1)
          expect(removeItemMock).toHaveBeenCalledWith(TOKEN_STORAGE_KEY)
        }
      })

      it('should throw error when the login request fails', async () => {
        try {
          await authModule.loginAction({ email, password })
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

      authModule.loginAction = jest.fn()

      await authModule.signup({ email, password })

      expect(authModule.loginAction).toHaveBeenCalledTimes(1)
      expect(authModule.loginAction).toHaveBeenCalledWith({ email, password })
    })

    it('should throw error when login request fails', async () => {
      (signup as jest.Mock).mockRejectedValue(fetchError)

      try {
        await authModule.signup({ email, password })
        throw new Error("singup request didn't fail")
      } catch (err) {
        expect(err).toEqual(fetchError)
      }
    })
  })

  describe('logoutAction', () => {
    (logout as jest.Mock).mockResolvedValue({})

    it('should call api to logout', async () => {
      await authModule.logoutAction()

      expect(logout).toHaveBeenCalledTimes(1)
    })

    it('should remove token from local storage', async () => {
      await authModule.logoutAction()

      expect(removeItemMock).toHaveBeenCalledTimes(1)
      expect(removeItemMock).toHaveBeenCalledWith(TOKEN_STORAGE_KEY)
    })
  })
})
