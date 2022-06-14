import { call, delay, put, race, take } from 'redux-saga/effects'
import { AuthenticationController } from 'core/controllers'
import {
  AuthenticationModel,
  HttpResponse,
  HttpStatusCode
} from 'core/entities'
import { ApiClient, makeApiURL, SessionStorage } from 'core/infra'
import { InvalidCredentialsError } from 'core/errors/invalid-credentials-error'
import {
  onAuthSuccess,
  onLogout,
  onRefreshTokenPoolingHasStart,
  onRefreshTokenPoolingStop,
  onStartRefreshTokenPooling
} from 'core/adapters/redux'

function * refreshTokenPoolTask (): any {
  while (true) {
    console.log('Refresh token routine start...')
    try {
      // Fetching refresh token at regular interval 5 minutes.
      const { statusCode, body }: HttpResponse<AuthenticationModel> =
        yield new AuthenticationController(
          makeApiURL('/admin/auth/refresh'),
          new ApiClient()
        ).refresh()

      if (body && statusCode === HttpStatusCode.created) {
        // renew token information
        yield put(onAuthSuccess(body))

        // sets a 4 minute interval to update the token
        yield delay(body.expiresIn * 1000 - 500)
      } else {
        console.log('invalid token')
        // if refresh token is invalid
        throw new InvalidCredentialsError()
      }
    } catch (err) {
      console.log('refresh token expires')
      // clear token information
      const session = new SessionStorage()
      yield session.delete('token')

      // Once the polling has encountered an error,
      // it should be stopped immediately
      yield put(onLogout())
      yield put(onRefreshTokenPoolingStop())
    }
  }
}

/* Watcher Function */
export function * pollRefreshTokenTaskWatcher (): any {
  while (true) {
    yield take(onStartRefreshTokenPooling.type)
    yield put(onRefreshTokenPoolingHasStart(true))

    yield race([
      call(refreshTokenPoolTask),
      take(onRefreshTokenPoolingStop.type)
    ])
  }
}
