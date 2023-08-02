import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ISetting {
  theme: 'dark' | 'light'
}

const initialState: ISetting = {
  theme: 'dark',
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setThemeState: (state, action: PayloadAction<ISetting['theme']>) => {
      state.theme = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setThemeState } = settingSlice.actions

export default settingSlice.reducer
