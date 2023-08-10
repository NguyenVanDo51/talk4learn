import { AppModal } from '@/components/level1/antd/AppModal'
import { AppNotifycation } from '@/components/level1/antd/AppNotification'
import { FeedbackService } from '@/service/feedback/index.service'
import { APP_NAME } from '@/types/constants'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'

export const About = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [form] = useForm()

  const onFinish = (values: any) => {
    if (values.feedback) {
      FeedbackService.send({ content: values.feedback })
    }
    AppNotifycation.success({ message: 'Thank you for your feedback.' })
  }

  return (
    <>
      <button
        className="flex flex-row items-center hover:bg-gray-100 dark:hover:bg-dark-primary px-4 py-3"
        onClick={() => setOpen(true)}
      >
        <i className="fa-regular fa-circle-exclamation text-2xl"></i>
        <div className="ml-3 text-sm font-semibold">About {APP_NAME}</div>
      </button>

      <AppModal
        open={open}
        onCancel={() => setOpen(false)}
        title={'About ' + APP_NAME}
        onOk={() => {
          form.validateFields().then(onFinish)
        }}
      >
        <span className="text-yellow-300"> Hello guys!</span>
        <br /> My name is Andy. I have experienced difficulties in learning English, especially without a practice
        partner. Therefore, I created this app to enhance my English skills. Later, I thought of sharing it with those
        in similar situations. The app is a <span className="text-yellow-300"> work in progress</span>, and I&apos;m
        striving to improve it. So, if you encounter any issues or have suggestions for exciting features, please send
        them to me in the <span className="text-yellow-300">feedback section</span>. It would greatly assist me. Thank
        you.
      </AppModal>
    </>
  )
}
