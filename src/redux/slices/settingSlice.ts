import { SettingLangEnum } from '@/service/user/request'
import { VoiceDefault, Voices } from '@/types/constants/voices'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ISetting {
  theme: 'dark' | 'light'
  lang: SettingLangEnum
  voice: string
}

const initialState: ISetting = {
  theme: 'dark',
  lang: SettingLangEnum.EN,
  voice: VoiceDefault
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setThemeState: (state, action: PayloadAction<ISetting['theme']>) => {
      state.theme = action.payload
    },
    setSettings: (state, action: PayloadAction<ISetting>) => {
      state.theme = action.payload.theme
      state.lang = action.payload.lang
      state.voice = action.payload.voice
    },
  },
})

// Action creators are generated for each case reducer function
export const { setThemeState, setSettings } = settingSlice.actions

export default settingSlice.reducer

export const defaultSettings = initialState
