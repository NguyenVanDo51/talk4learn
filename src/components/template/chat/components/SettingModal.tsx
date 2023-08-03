import { AppButton } from '@/components/level1/AppButton'
import { AppModal } from '@/components/level1/AppModal'
import { Form, Radio } from 'antd'
import { FC, useEffect, useState } from 'react'
import { IChatSetting } from '..'
import { useForm } from 'antd/es/form/Form'

interface IProps {
  settings: IChatSetting
  setSettings: (settings: IChatSetting) => void
}

export const SettingModal: FC<IProps> = ({ settings, setSettings }) => {
  const [isOpenSetting, setIsOpenSetting] = useState(false)
  const [form] = useForm()

  const onFinish = (values: unknown) => {
    setIsOpenSetting(false)
    setSettings(values as IChatSetting)
  }

  const onOk = () => {
    setIsOpenSetting(false)
    setSettings(form.getFieldsValue())
  }

  useEffect(() => {
    form.setFieldsValue(settings)
  }, [form, isOpenSetting, settings])

  return (
    <>
      <AppButton onClick={() => setIsOpenSetting(true)} size="small" type="text">
        <i className={`fa-solid fa-gear text-xl `}></i>
      </AppButton>

      <AppModal open={isOpenSetting} onOk={onOk} onCancel={() => setIsOpenSetting(false)} title="Settings">
        <Form form={form} labelCol={{ flex: '120px' }} onFinish={onFinish}>
          <Form.Item label="Chat mode" name="type">
            <Radio.Group>
              <Radio value={'text'}>Text</Radio>
              <Radio value={'voice'}>Voice</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Chat mode" name="style">
            <Radio.Group>
              <Radio value={'formal'}>Formal</Radio>
              <Radio value={'informal'}>Informal</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </AppModal>
    </>
  )
}
