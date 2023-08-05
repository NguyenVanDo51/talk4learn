import { notification } from 'antd'
import { ArgsProps } from 'antd/es/notification/interface'

export class AppNotifycation {
  static error = ({ message = 'Error', ...args }: ArgsProps) => {
    notification.error({
      message,
      key: String(message),
      ...args,
    })
  }
}
