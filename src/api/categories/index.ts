import { uniqueId } from 'lodash'
import { ICategory } from './type'
import { lessons } from '../lesson'

export const categories: ICategory[] = [
  {
    name: 'Giới thiệu bản thân',
    description: 'Giới thiệu bản thân',
    id: uniqueId(),
    lessons: [lessons[0], lessons[1], lessons[2]],
  },
  {
    name: 'Giới thiệu bản thân',
    description: 'Giới thiệu bản thân',
    id: uniqueId(),
    lessons: [lessons[3], lessons[4], lessons[4]],
  },
  {
    name: 'Giới thiệu bản thân',
    description: 'Giới thiệu bản thân',
    id: uniqueId(),
    lessons: [lessons[5], lessons[5], lessons[5]],
  },
]
