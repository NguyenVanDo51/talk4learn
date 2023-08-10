import { AppButton } from '@/components/level1/antd/AppButton'
import { AppModal } from '@/components/level1/antd/AppModal'
import { Form, Radio } from 'antd'
import { useImperativeHandle, forwardRef, useEffect, useState } from 'react'
import { IChatSetting } from '..'
import { useForm } from 'antd/es/form/Form'

interface IProps {
  settings: IChatSetting
  setSettings: (settings: IChatSetting) => void
}

export interface ISettingRef {
  open: () => void
}

export const SettingModal = forwardRef(function SettingModal({ settings, setSettings }: IProps, ref) {
  const [isOpenSetting, setIsOpenSetting] = useState(false)
  const [form] = useForm()

  const onFinish = (values: unknown) => {
    setIsOpenSetting(false)
    setSettings(values as IChatSetting)
  }

  const onOk = () => {
    setIsOpenSetting(false)
    const values = form.getFieldsValue()
    setSettings({ ...settings, ...values, inputType: values.type })
  }

  useEffect(() => {
    form.setFieldsValue(settings)
  }, [form, isOpenSetting, settings])

  useImperativeHandle(
    ref,
    (): ISettingRef => ({
      open: () => setIsOpenSetting(true),
    })
  )

  return (
    <>
      <AppModal open={isOpenSetting} onOk={onOk} onCancel={() => setIsOpenSetting(false)} title="Conversation Settings">
        <Form form={form} labelCol={{ flex: '120px' }} onFinish={onFinish}>
          <Form.Item label="Chat mode" name="type">
            <Radio.Group>
              <Radio value={'text'}>Text</Radio>
              <Radio value={'voice'}>Voice</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Style" name="style">
            <Radio.Group>
              <Radio value={'formal'}>Formal</Radio>
              <Radio value={'informal'}>Informal</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </AppModal>
    </>
  )
})
