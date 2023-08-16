import { AppModal } from '@/components/level1/antd/AppModal'
import { AppSelect } from '@/components/level1/antd/AppSelect'
import { useAppSelector } from '@/hooks/redux'
import { UserService } from '@/service/user/index.service'
import { SettingLangEnum, SettingLangMapping } from '@/service/user/request'
import { VoiceOptions } from '@/types/constants/voices'
import { Button, Form, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { MenuItem } from '../MenuItem'

export const Settings = function Setting() {
  const [open, setOpen] = useState<boolean>(false)
  const ref: any = useRef()
  const settings = useAppSelector((state) => state.setting)
  const [loading, setLoading] = useState(false)

  const onChangeSettings = (value: SettingLangEnum, field: 'lang' | 'voice' | 'chatMode') => {
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

  const onClose = () => {
    if (loading) return

    setOpen(false)
  }

  return (
    <>
      <MenuItem onClick={() => setOpen(true)} iconClass="fa-regular fa-gear">
        Settings
      </MenuItem>

      <AppModal
        open={open}
        onCancel={onClose}
        title="Settings"
        footer={[
          <Button key={'close'} onClick={onClose} disabled={loading}>
            Close
          </Button>,
        ]}
      >
        <Spin spinning={loading}>
          <Form labelCol={{ flex: '120px' }}>
            <Form.Item label="Voice">
              <AppSelect
                options={[
                  { label: 'Voice', value: 'voice' },
                  { label: 'Text', value: 'text' },
                ]}
                value={settings.chatMode}
                onChange={(value) => onChangeSettings(value, 'chatMode')}
                defaultValue={SettingLangEnum.EN}
                className="dark:bg-dark-main dark:text-white"
                placeholder="Select Voice"
              />
            </Form.Item>
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
