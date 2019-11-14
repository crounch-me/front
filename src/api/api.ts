import axios from 'axios';

import { getAPIURL } from '@/utils/environment';

export const api = axios.create({
  baseURL: getAPIURL(),
});
