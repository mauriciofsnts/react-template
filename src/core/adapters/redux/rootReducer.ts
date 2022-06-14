import { combineReducers } from 'redux'

import authenticationReducer from './slices/authentication'

export const rootReducer = combineReducers({
  authentication: authenticationReducer
})
