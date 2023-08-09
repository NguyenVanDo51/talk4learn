import { AppModal } from '@/components/level1/AppModal'
import { AppNotifycation } from '@/components/level1/AppNotification'
import { FeedbackService } from '@/service/feedback/index.service'
import { Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useRef, useState } from 'react'

export const Feedback = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [form] = useForm()
  const ref: any = useRef()

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
        <i className="fa-regular fa-message-exclamation text-2xl"></i>
        <div className="ml-3 text-sm font-semibold">Submid feedback</div>
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
          <Form.Item name="feedback" required>
            <TextArea rows={5} ref={ref} className="dark:bg-dark-main dark:text-white" placeholder="Send a feedback" />
          </Form.Item>
        </Form>
      </AppModal>
    </>
  )
}
