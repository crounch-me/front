export function getAPIURL(): string {
  return process.env.NODE_ENV === 'production' ? 'http://crounch.me:3000/' : 'http://localhost:3000/';
}
