import { AuthModule } from './AuthModule'


describe('AuthModule', () => {
  let authModule: AuthModule
  let getItemMock: jest.SpyInstance;
  const token = 'fake-token'

  beforeEach(() => {
    authModule = new AuthModule(AuthModule)

    getItemMock = jest.spyOn(Storage.prototype, 'getItem');
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
})
