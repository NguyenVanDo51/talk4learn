import { AppModal } from '@/components/level1/antd/AppModal'
import { AppSelect } from '@/components/level1/antd/AppSelect'
import { useAppSelector } from '@/hooks/redux'
import { UserService } from '@/service/user/index.service'
import { SettingLangEnum, SettingLangMapping } from '@/service/user/request'
import { VoiceOptions } from '@/types/constants/voices'
import { Button, Form, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'

export const Settings = function Setting() {
  const [open, setOpen] = useState<boolean>(false)
  const ref: any = useRef()
  const settings = useAppSelector((state) => state.setting)
  const [loading, setLoading] = useState(false)

  const onChangeSettings = (value: SettingLangEnum, field: 'lang' | 'voice') => {
    setLoading(true)
    UserService.changeSettings({
      ...settings,
      [field]: value,
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    setTimeout(() => {
      ref.current?.focus()
    }, 200)
  }, [open])

  return (
    <>
      <button
        className="flex flex-row items-center hover:bg-gray-100 dark:hover:bg-dark-primary px-4 py-3"
        onClick={() => setOpen(true)}
      >
        <i className="fa-regular fa-gear text-2xl"></i>
        <div className="ml-3 text-sm font-semibold">Settings</div>
      </button>

      <AppModal
        open={open}
        onCancel={() => setOpen(false)}
        title="Settings"
        footer={[
          <Button key={'close'} onClick={() => setOpen(false)}>
            Close
          </Button>,
        ]}
      >
        <Spin spinning={loading}>
          <Form labelCol={{ flex: '120px' }}>
            <Form.Item label="Language">
              <AppSelect
                options={[
                  {
                    label: SettingLangMapping[SettingLangEnum.EN],
                    value: SettingLangEnum.EN,
                  },
                  {
                    label: SettingLangMapping[SettingLangEnum.VI],
                    value: SettingLangEnum.VI,
                  },
                ]}
                value={settings.lang}
                onChange={(value) => onChangeSettings(value, 'lang')}
                defaultValue={SettingLangEnum.EN}
                className="dark:bg-dark-main dark:text-white"
                placeholder="Language"
              />
            </Form.Item>

            <Form.Item label="Voice">
              <AppSelect
                options={VoiceOptions}
                value={settings.voice}
                onChange={(value) => onChangeSettings(value, 'voice')}
                defaultValue={SettingLangEnum.EN}
                className="dark:bg-dark-main dark:text-white"
                placeholder="Select Voice"
              />
            </Form.Item>
          </Form>
        </Spin>
      </AppModal>
    </>
  )
}
