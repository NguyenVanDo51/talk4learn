import { AppModal } from '@/components/level1/antd/AppModal'
import { AppNotifycation } from '@/components/level1/antd/AppNotification'
import { FeedbackService } from '@/service/feedback/index.service'
import { Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useRef, useState } from 'react'
import { MenuItem } from '../MenuItem'

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
      <MenuItem onClick={() => setOpen(true)} iconClass='fa-regular fa-message-exclamation'>
        Submid feedback
      </MenuItem>
      
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
