import { httpClient } from "@/service/httpClient"
import { VoiceDefault } from "@/types/constants/voices"
import { create } from "zustand"

export enum SettingLangEnum {
  EN = "en",
  VI = "vi",
}

export const SettingLangMapping: { [key in SettingLangEnum]: string } = {
  [SettingLangEnum.EN]: "English",
  [SettingLangEnum.VI]: "Tiếng Việt",
}

export interface ISetting {
  theme: "dark" | "light"
  lang: SettingLangEnum
  voice: string
  chatMode: "text" | "voice"
  inputType: "text" | "voice"
  speed: number
}

export const initialSettingState: ISetting = {
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
  initSettings: () => void
}

export const useSettings = create<ISettingStore>((set) => ({
  settings: initialSettingState,
  setSettings: (s: ISetting) => {
    set({ settings: s })
    httpClient.post("/api/user/settings", s)
  },
  initSettings: async () => {
    const res = await httpClient.get("/api/user/settings")
    set({ settings: res.data })
  },
}))
