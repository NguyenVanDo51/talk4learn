import { httpClient } from "@/service/httpClient"
import { VoiceDefault } from "@/types/constants/voices"
import { create } from "zustand"

export enum SettingLangEnum {
  EN = "en",
  VI = "vi",
  ES = "es", // Tây Ban Nha
  FR = "fr", // Pháp
  ZH = "zh", // Trung Quốc
  AR = "ar", // Tiếng Ả Rập
  RU = "ru", // Nga
  DE = "de", // Đức
  JA = "ja", // Nhật Bản
  PT = "pt", // Bồ Đào Nha
  KO = "ko", // Hàn Quốc
  IT = "it", // Ý
}

export const SettingLangMapping: { [key in SettingLangEnum]: string } = {
  [SettingLangEnum.EN]: "English",
  [SettingLangEnum.VI]: "Vietnamese",
  [SettingLangEnum.ES]: "Spanish", // Tây Ban Nha
  [SettingLangEnum.FR]: "French", // Pháp
  [SettingLangEnum.ZH]: "Chinese", // Trung Quốc
  [SettingLangEnum.AR]: "Arabic", // Tiếng Ả Rập
  [SettingLangEnum.RU]: "Russian", // Nga
  [SettingLangEnum.DE]: "German", // Đức
  [SettingLangEnum.JA]: "Japanese", // Nhật Bản
  [SettingLangEnum.PT]: "Portuguese", // Bồ Đào Nha
  [SettingLangEnum.KO]: "Korean", // Hàn Quốc
  [SettingLangEnum.IT]: "Italian", // Ý
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
