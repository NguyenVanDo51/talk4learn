import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ISetting {
  isOpenMenu: boolean
}

const initialState: ISetting = {
  isOpenMenu: false,
}

export const appSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setIsOpenMenu: (state, action: PayloadAction<ISetting['isOpenMenu']>) => {
      state.isOpenMenu = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsOpenMenu } = appSlice.actions

export default appSlice.reducer
