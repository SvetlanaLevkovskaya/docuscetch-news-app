export interface LoginRequestDto {
  email: string
  password: string
  rememberMe: boolean
}

export interface MeResponse {
  email: string
  id: number
  login: string
  sessionToken: string
}
