import { notification } from 'antd'
import { ArgsProps } from 'antd/es/notification/interface'

export class AppNotifycation {
  static error = (args: ArgsProps) => {
    notification.error({
      ...args,
    })
  }
}
