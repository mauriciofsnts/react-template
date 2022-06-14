import {
  AuthenticationError,
  AuthenticationModel
} from './../../../entities/authentication'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthenticationParams } from 'core/entities'

type AuthenticationStateProps = {
  auth: AuthenticationModel | undefined
  authLoad: boolean
  authError: AuthenticationError | undefined
  refreshTokenError: AuthenticationError | undefined
  refreshToken: any
  refreshTokenLoad: boolean
}

const initialState: AuthenticationStateProps = {
  auth: undefined,
  authLoad: false,
  authError: undefined,
  refreshTokenError: undefined,
  refreshTokenLoad: false,
  refreshToken: undefined
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    onAuth (_state, _action: PayloadAction<AuthenticationParams>) {},
    onAuthLoad (state, action) {
      return { ...state, authLoad: action.payload }
    },
    onAuthSuccess (state, action) {
      return { ...state, auth: action.payload, authError: undefined }
    },
    onAuthError (state, action) {
      return { ...state, auth: undefined, authError: action.payload }
    },

    onLogout (state) {
      return {
        ...state,
        auth: undefined,
        authError: undefined,
        authLoad: false
      }
    },

    onStartRefreshTokenPooling () {},
    onRefreshTokenPoolingHasStart (state, action) {
      return {
        ...state,
        refreshToken: action.payload,
        refreshTokenError: undefined
      }
    },
    onRefreshTokenPoolingStop (state) {
      return {
        ...state,
        refreshToken: undefined
      }
    },
    onRefreshTokenPoolingLoad (state, action) {
      return { ...state, refreshTokenLoad: action.payload }
    }
  }
})

export const {
  onAuth,
  onAuthError,
  onAuthLoad,
  onAuthSuccess,
  onRefreshTokenPoolingStop,
  onRefreshTokenPoolingLoad,
  onStartRefreshTokenPooling,
  onRefreshTokenPoolingHasStart,
  onLogout
} = authenticationSlice.actions

export default authenticationSlice.reducer
