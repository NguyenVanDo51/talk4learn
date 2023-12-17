import React, { useContext, useState } from "react"
import { Button, Drawer, DrawerProps, Modal } from "antd"
import { ChatContext } from "../context"
import { BotProfile } from "./BotProfile"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import { AppButton } from "@/components/level1/antd/AppButton"
import { css } from "@emotion/css"

type Props = DrawerProps & {}

export const ChatInfo: React.FC<Props> = ({ ...props }) => {
  const { lesson } = useContext(ChatContext)
  const { user } = useUser()
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
      <Drawer
        title={
          <div className="flex justify-between items-center">
            <span className="font-regular">Situation Details</span>
            <Link href={`/edit/${lesson?.id}`}>
              <AppButton
                type="text"
                icon={<i className="fa-solid fa-gear" />}
              />
            </Link>
          </div>
        }
        className={css({
          ".ant-drawer-header": {
            padding: "8px 12px",
          },
        })}
        placement="right"
        {...props}
      >
        <div className="flex flex-col justify-between h-full">
          <BotProfile bot={lesson} type={2} />

          {lesson?.author?.username === user?.username ? (
            <div className="flex flex-col gap-2 items-center"></div>
          ) : null}
        </div>
      </Drawer>
    </>
  )
}
