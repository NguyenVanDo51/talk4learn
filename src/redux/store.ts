import { configureStore } from '@reduxjs/toolkit'
import settingSlice from './slices/settingSlice'

const store = configureStore({
  reducer: {
    setting: settingSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
