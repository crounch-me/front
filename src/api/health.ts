import { api } from './api';
import { Health } from '@/models/health';

export function health(): Promise<Health> {
  return api.get<Health>('health').then(res => res.data);
}
