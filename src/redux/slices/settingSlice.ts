import { SettingLangEnum } from '@/service/user/request'
import { VoiceDefault } from '@/types/constants/voices'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ISetting {
  theme: 'dark' | 'light'
  lang: SettingLangEnum
  voice: string
  chatMode: 'text' | 'voice'
  inputType: 'text' | 'voice'
}

const initialState: ISetting = {
  theme: 'dark',
  lang: SettingLangEnum.EN,
  voice: VoiceDefault,
  chatMode: 'voice',
  inputType: 'voice',
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setThemeState: (state, action: PayloadAction<ISetting['theme']>) => {
      state.theme = action.payload
    },
    setInputType: (state, action: PayloadAction<ISetting['inputType']>) => {
      state.inputType = action.payload
    },
    setSettings: (state, action: PayloadAction<ISetting>) => {
      state.theme = action.payload.theme
      state.lang = action.payload.lang
      state.voice = action.payload.voice
      state.chatMode = action.payload.chatMode
      state.inputType = action.payload.inputType
    },
  },
})

// Action creators are generated for each case reducer function
export const { setThemeState, setInputType, setSettings } = settingSlice.actions

export default settingSlice.reducer

export const defaultSettings = initialState
