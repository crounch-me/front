
interface SignupResponse {
  id: string;
  email: string;
}

interface LoginResponse {
  token: string;
}

export { SignupResponse, LoginResponse }
