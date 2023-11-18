import store from "@/redux/store"
import { httpClient } from "../httpClient"
import { AxiosResponse } from "axios"
import { ILesson } from "@/types/lesson/type"

export class BotService {
  static create = (payload: Omit<ILesson, "id">) => {
    return httpClient.post("/api/situations", payload)
  }
}