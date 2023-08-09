import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IAppSlice {
  isOpenMenu: boolean
  textSpeaking: string | null
}

const initialState: IAppSlice = {
  isOpenMenu: false,
  textSpeaking: null,
}

export const appSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setIsOpenMenu: (state, action: PayloadAction<IAppSlice['isOpenMenu']>) => {
      state.isOpenMenu = action.payload
    },
    setTextSpeaking: (state, { payload }: PayloadAction<IAppSlice['textSpeaking']>) => {
      state.textSpeaking = payload ? btoa(payload) : payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsOpenMenu, setTextSpeaking } = appSlice.actions

export default appSlice.reducer
