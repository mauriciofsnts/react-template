import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { watcherSaga } from 'core/adapters/saga/rootSaga'
import { rootReducer } from 'core/adapters/redux/rootReducer'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    logger,
    sagaMiddleware
  ]
})
sagaMiddleware.run(watcherSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
