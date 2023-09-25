import { configureStore } from '@reduxjs/toolkit'
import settingSlice from './slices/settingSlice'
import appSlice from './slices/appSlice'
import lessonsSlice from './slices/lessonsSlice'

const store = configureStore({
  reducer: {
    setting: settingSlice,
    app: appSlice,
    lessons: lessonsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
