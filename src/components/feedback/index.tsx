"use client"

import { PRIMARY_COLOR } from "@/libs/appConfig"
import { useUser } from "@clerk/nextjs"
import Feedback from "feeder-react-feedback"
import "feeder-react-feedback/dist/feeder-react-feedback.css"
import "./style.scss"

export const AppFeedback = () => {
  const { user } = useUser()

  return (
    <Feedback
      projectId="658059241b35ed0002a606cf"
      primaryColor={PRIMARY_COLOR}
      hoverBorderColor={PRIMARY_COLOR}
      emailDefaultValue={user?.emailAddresses[0]?.emailAddress}
      email={true}
      emailRequired
    />
  )
}
