import { ISetting } from "@/redux/slices/settingSlice"
import { SettingLangEnum } from "@/service/user/request"
import { VoiceDefault } from "@/types/constants/voices"
import { create } from "zustand"

const initialState: ISetting = {
  theme: "light",
  lang: SettingLangEnum.VI,
  voice: VoiceDefault,
  chatMode: "voice",
  inputType: "voice",
  speed: 1,
}

interface ISettingStore {
  settings: ISetting
  setSettings: (s: ISetting) => void
}

export const useSettings = create<ISettingStore>((set) => ({
  settings: initialState,
  setSettings: (s: ISetting) => {
    set({ settings: s })
  },
}))
