import { doFetch } from './api';

export interface SignupResponse {
  id: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
}

export function signup(email: string, password: string): Promise<SignupResponse> {
  return doFetch({
    url: 'users',
    method: 'POST',
    data: {
      email,
      password,
    },
  });
}

export function login(email: string, password: string): Promise<LoginResponse> {
  return doFetch({
    url: 'users/login',
    method: 'POST',
    data: {
      email,
      password,
    },
  })
}

export function logout(): Promise<void> {
  return doFetch({
    url: 'logout',
    method: 'POST'
  })
}
