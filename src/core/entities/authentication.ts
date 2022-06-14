export type AuthenticationParams = {
  email: string
  password: string
}

export interface AuthenticationModel {
  accessToken: string
  refreshToken: string
  expiresIn: number
  expiresAt: number
}

export type AuthenticationError = {
  error: string
}
