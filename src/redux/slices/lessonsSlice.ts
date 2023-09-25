import { ILesson } from '@/types/lesson/type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ILessonSlice {
  lessonsCompleted: ILesson['id'][]
}

const initialState: ILessonSlice = {
  lessonsCompleted: [],
}

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    setLessonsCompleted: (state, action: PayloadAction<ILessonSlice['lessonsCompleted']>) => {
      state.lessonsCompleted = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLessonsCompleted } = lessonsSlice.actions

export default lessonsSlice.reducer
