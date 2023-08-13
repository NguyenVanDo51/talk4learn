import { firestore } from '../firestore'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { IPayloadSetting } from './request'
import store from '@/redux/store'
import { ISetting, defaultSettings, setSettings } from '@/redux/slices/settingSlice'

export class UserService {
  static changeSettings = (userId: string, payload: IPayloadSetting) => {
    const settingRef = doc(firestore, 'settings', userId)

    updateDoc(settingRef, {
      ...payload,
    })
  }

  static getSettings = async (userId: string | null | undefined, onDone = () => {}) => {
    if (!userId) return

    const settingRef = doc(firestore, 'settings', userId)
    const settingSnap = await getDoc(settingRef)

    if (settingSnap.exists()) {
      store.dispatch(setSettings(settingSnap.data() as ISetting))
    } else {
      // docSnap.data() will be undefined in this case
      UserService.changeSettings(userId, defaultSettings)
    }
    onDone()
  }
}
