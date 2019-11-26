export function getAPIURL(): string {
  return process.env.VUE_APP_API_URL!;
}

export function getVersion(): string {
  return require('../../package.json').version;
}
