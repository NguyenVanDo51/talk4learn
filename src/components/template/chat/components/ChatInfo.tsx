import React, { useContext, useState } from "react"
import { Button, Drawer, DrawerProps, Modal } from "antd"
import { ChatContext } from "../context"
import { BotProfile } from "./BotProfile"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { BotService } from "@/service/bot/index.service"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { useRouter } from "next/navigation"

export const ChatInfo: React.FC<DrawerProps> = ({ ...props }) => {
  const { lesson } = useContext(ChatContext)
  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter()

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          // console.log(lesson)
          // console.log("user", user)
          const result = await BotService.delete(lesson?.id as string)
          console.log("OK")

          // sau khi xoá thành công thì chuyển hướng về trang chủ dùng router.push
          router.push("/")
        } catch (error) {
          console.log("Error deleting data:", error)
        }
      },
      onCancel() {
        console.log("Cancel")
      },
    })
  }

  return (
    <>
      <Drawer title="Situation Details" placement="right" {...props}>
        <BotProfile bot={lesson} />

        {lesson?.author?.username === user?.username ? (
          <div className="flex gap-2">
            <Link href={`/edit/${lesson?.id}`}>
              <Button
                className="text-xl"
                style={{ color: "#f45d5d" }}
                type="dashed"
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </Button>
            </Link>

            <Button
              className="text-xl"
              style={{ color: "#f45d5d" }}
              onClick={showDeleteConfirm}
              type="dashed"
            >
              <i className="fa-solid fa-trash-can"></i>
            </Button>
          </div>
        ) : null}
      </Drawer>
    </>
  )
}
