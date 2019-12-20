import { Health } from '@/models/health';
import { doFetch } from './api';

export function health(): Promise<Health> {
  return doFetch({
    url: 'health',
    method: 'GET',
  });
}
