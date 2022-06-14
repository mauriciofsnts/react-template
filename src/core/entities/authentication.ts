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

export interface AuthenticationAccount {
  account: string
  accountDigit: string
  branchId: string
  customerAddress: {
    addressNumber: string
    country: string
    line1: string
    line2: string
    neighborhood: string
    state: string
    street: string
    zipcode: string
  }
  customerDocument: string
  customerDocumentType: string
  customerEmail: string
  customerId: string
  customerName: string
  customerPhoneNumber: string
  customerPhonePrefix: string
  id: string
  registrationType: string
  risk: number
  status: string
}
