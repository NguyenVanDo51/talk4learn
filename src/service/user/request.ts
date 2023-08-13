export enum SettingLangEnum {
  EN = 'en',
  VI = 'vi',
}

export const SettingLangMapping: {[key in SettingLangEnum]: string} = {
  [SettingLangEnum.EN]: "English",
  [SettingLangEnum.VI]: "Tiếng Việt"
}

export interface IPayloadSetting {
  lang: SettingLangEnum
}
