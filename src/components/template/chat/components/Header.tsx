import Image from "next/image"
import { useRouter } from "next/navigation"
import { CupIcon } from "../icons/cup"
import { useLessonsCompleted } from "@/hooks/fetchers/useLessonsCompleted"
import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context"
import { Button, Modal } from "antd"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { BotService } from "@/service/bot/index.service"

export const Header = () => {
  const [deleteConfirm, setDeleteConfirm] = useState("")
  const { confirm } = Modal

  useEffect(() => {
    getDeleteComfirm()
  }, [])

  const getDeleteComfirm = async () => {
    const result = await BotService.get()
  }

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK")
      },
      onCancel() {
        console.log("Cancel")
      },
    })
  }
  const router = useRouter()

  return (
    <div className="flex justify-between items-center px-4 h-16 border-b">
      <span onClick={() => router.push("/")} className="cursor-pointer">
        <Image
          width="32"
          height="32"
          src="https://img.icons8.com/pulsar-color/32/delete-sign.png"
          alt="delete-sign"
        />
      </span>
      <Button
        className="text-xl"
        style={{ color: "#f45d5d" }}
        onClick={showDeleteConfirm}
        type="dashed"
      >
        <i className="fa-solid fa-trash-can"></i>
      </Button>
    </div>
  )
}
