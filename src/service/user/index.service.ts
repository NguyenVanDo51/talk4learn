import store from '@/redux/store'
import { ISetting, setSettings } from '@/redux/slices/settingSlice'
import { httpClient } from '../httpClient'

export class UserService {
  static changeSettings = async (payload: ISetting) => {
    return httpClient.post('/api/user/settings', payload).then((res) => {
      store.dispatch(setSettings(payload))
      return res
    })
  }

  static getSettings = async () => {
    return httpClient.get('/api/user/settings').then((res) => {
      if (res.data) {
        store.dispatch(setSettings(res.data))
      }
      return res
    })
  }
}
