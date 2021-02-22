import { doFetch } from './doFetch';

export interface SignupResponse {
  id: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
}

export function signup(email: string, password: string): Promise<SignupResponse> {
  return doFetch({
    path: 'users',
    method: 'POST',
    data: {
      email,
      password,
    },
  });
}

export function login(email: string, password: string): Promise<LoginResponse> {
  return doFetch({
    path: 'users/login',
    method: 'POST',
    data: {
      email,
      password,
    },
  })
}

export function logout(): Promise<void> {
  return doFetch({
    path: 'logout',
    method: 'POST'
  })
}
