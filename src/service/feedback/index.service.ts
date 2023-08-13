import { firestore } from '../firestore'
import { IPayloadSendFeedback } from './request'
import { addDoc, collection } from 'firebase/firestore'

export class FeedbackService {
  static send = (payload: IPayloadSendFeedback) => {
    addDoc(collection(firestore, 'feedbacks'), payload)
  }
}
