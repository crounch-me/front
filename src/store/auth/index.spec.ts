import { auth, AuthState } from '.';

describe('Module', () => {
  it('Should be namespaced.', () => {
    expect(auth.namespaced).toBe(true);
  });

  it('Should initialize token to empty string.', () => {
    expect((auth.state as AuthState)['token']).toBe('');
  });

  it('Should initialize status state to empty string.', () => {
    expect((auth.state as AuthState)['status']).toBe('');
  });
});
