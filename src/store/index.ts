import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit'

import chatReducer from './chat'
import userReducer from './user'

export const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
  })
}

const store = setupStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppStore = ReturnType<typeof setupStore>

export default store