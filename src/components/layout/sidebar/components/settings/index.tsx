import { AppModal } from '@/components/level1/antd/AppModal'
import { AppSelect } from '@/components/level1/antd/AppSelect'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setSpeed } from '@/redux/slices/settingSlice'
import { UserService } from '@/service/user/index.service'
import { SettingLangEnum, SettingLangMapping } from '@/service/user/request'
import { VoiceOptions } from '@/types/constants/voices'
import { Button, Form, ModalProps, Slider, Spin } from 'antd'
import { debounce } from 'lodash'
import { useState } from 'react'

interface IProps extends ModalProps {}
let interval: any = null

export const SettingModal = (props: IProps) => {
  const settings = useAppSelector((state) => state.setting)
  const [loading, setLoading] = useState(false)

  const [speed, setSpeed] = useState(settings.speed)

  const onChangeSettings = (value: SettingLangEnum | number, field: 'lang' | 'voice' | 'chatMode' | 'speed') => {
    setLoading(true)
    UserService.changeSettings({
      ...settings,
      [field]: value,
    }).finally(() => setLoading(false))
  }

  const onChangeSpeed = (value: number) => {
    setSpeed(value)
    if (interval) {
      clearInterval(interval)
    }
    
    interval = setTimeout(() => {
      onChangeSettings(value, 'speed')
    }, 1000)
  }

  const onClose = () => {
    if (loading) return

    props.onCancel?.({} as any)
  }

  return (
    <AppModal
      {...props}
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

          <Form.Item label="Speed">
            <Slider defaultValue={1} min={0.5} max={1.5} value={speed} step={0.1} onChange={onChangeSpeed} />
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
  )
}
