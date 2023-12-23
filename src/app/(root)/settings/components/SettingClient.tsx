"use client"
import { LoadingScreen } from "@/components/level1/Loading"
import { AppSelect } from "@/components/level1/antd/AppSelect"
import { useMounted } from "@/hooks/helpers/use-mounted"
import {
  SettingLangEnum,
  SettingLangMapping,
  useSettings,
} from "@/hooks/helpers/use-settings"
import { Form } from "antd"

export const SettingClient = () => {
  const { settings, setSettings } = useSettings()
  const isMounted = useMounted()

  if (!isMounted) {
    return <LoadingScreen noLogo />
  }

  return (
    <Form>
      <Form.Item label="Your native language">
        <AppSelect
          options={Object.keys(SettingLangMapping).map((key) => ({
            value: key,
            label: SettingLangMapping[key as SettingLangEnum],
          }))}
          onChange={(value: SettingLangEnum) =>
            setSettings({ ...settings, lang: value })
          }
          value={settings.lang}
          className="w-fit"
        />
      </Form.Item>
    </Form>
  )
}
