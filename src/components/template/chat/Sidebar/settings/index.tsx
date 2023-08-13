import { AppModal } from '@/components/level1/antd/AppModal'
import { AppNotifycation } from '@/components/level1/antd/AppNotification'
import { AppSelect } from '@/components/level1/antd/AppSelect'
import { useAppSelector } from '@/hooks/redux'
import { FeedbackService } from '@/service/feedback/index.service'
import { UserService } from '@/service/user/index.service'
import { SettingLangEnum, SettingLangMapping } from '@/service/user/request'
import { Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

export const Settings = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [form] = useForm()
  const ref: any = useRef()
  const { data } = useSession()
  const settings = useAppSelector((state) => state.setting)

  const onChangeSettings = (value: SettingLangEnum) => {
    if (!data?.user?.email) return

    UserService.changeSettings(data?.user?.email, {
      ...settings,
      lang: value,
    })
  }

  const onFinish = (values: any) => {
    if (values.feedback) {
      FeedbackService.send({ content: values.feedback })
    }
    AppNotifycation.success({ message: 'Thank you for your feedback.' })
    form.resetFields()
    setOpen(false)
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
        title="Submid feedback"
        onOk={() => {
          form.validateFields().then(onFinish)
        }}
      >
        <Form form={form}>
          <Form.Item name="feedback" label="Grammar checking language">
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
              onChange={onChangeSettings}
              defaultValue={SettingLangEnum.EN}
              className="dark:bg-dark-main dark:text-white"
              placeholder="Grammar checking language"
            />
          </Form.Item>
        </Form>
      </AppModal>
    </>
  )
}
