import { IPayloadSetting, SettingLangEnum } from '@/service/user/request'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ISetting extends IPayloadSetting {
  theme: 'dark' | 'light'
}

const initialState: ISetting = {
  theme: 'dark',
  lang: SettingLangEnum.EN,
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setThemeState: (state, action: PayloadAction<ISetting['theme']>) => {
      state.theme = action.payload
    },
    setSettings: (state, action: PayloadAction<ISetting>) => {
      state = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setThemeState, setSettings } = settingSlice.actions

export default settingSlice.reducer

export const defaultSettings = initialState
