import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button, Modal } from "antd"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { BotService } from "@/service/bot/index.service"
import { ScenarioInterface } from "@/types/lesson/type"
import { FC, useContext } from "react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { ChatContext } from "../context"

interface IProps {}

export const Header: FC<IProps> = () => {
  const { lesson, openInfo } = useContext(ChatContext)

  const router = useRouter()

  return (
    <div className="flex justify-between items-center px-6 border-b py-2">
      <span
        onClick={() => router.push("/home")}
        className="cursor-pointer text-lg"
      >
        <i className="fa-regular fa-arrow-left mr-1"></i>
      </span>

      <span onClick={openInfo} className="cursor-pointer text-lg">
        <i className="fa-regular fa-bars"></i>
      </span>
    </div>
  )
}
