import { ILesson } from "@/types/lesson/type"

export interface ICategory {
  id: string
  name: string
  lessons: ILesson[]
  description: string
}
