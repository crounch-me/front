import { api } from './api';

export interface SignupResponse {
  id: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
}

export function signup(email: string, password: string): Promise<SignupResponse> {
  return api
    .post<SignupResponse>('users', {
      email,
      password,
    })
    .then(res => res.data);
}

export function login(email: string, password: string): Promise<LoginResponse> {
  return api
    .post<LoginResponse>('users/login', {
      email,
      password,
    })
    .then(res => res.data);
}
