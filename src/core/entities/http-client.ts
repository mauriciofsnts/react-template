export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
  params?: any
}

export interface HttpClient {
  request: <R = any>(data: HttpRequest, unauthorized?: boolean) => Promise<HttpResponse<R>>
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}

export type HttpErrorResponse = {
  detail: string
  error: {
    name: string
    statusCode: number
  }
}

export declare type HttpErrorResponsePreValidation = {
  error: string
  detail: {
    messages?: string[]
    errors?: Array<{
      key: string
      string: string
      message: string
    }>
  }
}

export type ControllerResponseType = {
  response: HttpResponse
  error?: boolean
}
