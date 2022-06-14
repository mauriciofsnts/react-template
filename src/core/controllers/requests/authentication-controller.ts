import {
  AuthenticationModel,
  AuthenticationParams,
  HttpClient,
  HttpResponse,
  HttpStatusCode
} from 'core/entities'
import { SessionStorage } from 'core/infra'

export class AuthenticationController {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async auth (
    params: AuthenticationParams
  ): Promise<HttpResponse<AuthenticationModel>> {
    const response = await this.httpClient.request<AuthenticationModel>(
      {
        url: this.url,
        method: 'post',
        body: params
      },
      true
    )

    const err = response.statusCode !== HttpStatusCode.created

    if (!err) {
      const session = new SessionStorage()
      await session.set('token', response.body)
    }

    return response
  }

  async refresh (): Promise<HttpResponse<AuthenticationModel>> {
    const session = new SessionStorage()
    const token = session.get('token') as AuthenticationModel

    const response = await this.httpClient.request<AuthenticationModel>({
      url: this.url,
      method: 'post',
      body: {
        refreshToken: token.refreshToken
      }
    })

    const err = response.statusCode !== HttpStatusCode.created

    if (!err) {
      const session = new SessionStorage()
      await session.set('token', response.body)
    }

    return response
  }
}
