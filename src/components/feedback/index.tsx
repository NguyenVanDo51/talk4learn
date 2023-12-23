"use client"

import { PRIMARY_COLOR } from "@/libs/appConfig"
import Feedback from "feeder-react-feedback"
import "feeder-react-feedback/dist/feeder-react-feedback.css"
export const AppFeedback = () => {
  return (
    <Feedback
      projectId="658059241b35ed0002a606cf"
      primaryColor={PRIMARY_COLOR}
      hoverBorderColor={PRIMARY_COLOR}
    />
  )
}
