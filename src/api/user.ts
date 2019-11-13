import axios, { AxiosResponse } from 'axios';
import { getAPIURL } from '@/utils/environment';

export function signup(email: string, password: string): Promise<AxiosResponse<any>> {
  return axios.post(`${getAPIURL()}/users`, {
    email,
    password
  });
}
