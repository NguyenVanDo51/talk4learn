import { httpClient } from '../httpClient'

export class LessonService {
  static get = () => {
    return httpClient.get('/api/lessons',)
  }
}
