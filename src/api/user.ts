import { api } from './api';
import { SignupResponse, LoginResponse } from '@/models/user';

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
