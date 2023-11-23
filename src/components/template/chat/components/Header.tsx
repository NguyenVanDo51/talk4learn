import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button, Modal } from "antd"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { BotService } from "@/service/bot/index.service"
import { ILesson } from "@/types/lesson/type"
import { FC } from "react"
import { useUser } from "@clerk/nextjs"

interface IProps {
  lesson: ILesson
}
export const Header: FC<IProps> = ({ lesson }) => {
  const { confirm } = Modal

  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter()

  const showDeleteConfirm = () => {
    confirm({
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
          const result = await BotService.delete(lesson.id)
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
    <div className="flex justify-between items-center px-4 h-16 border-b">
      <span onClick={() => router.push("/")} className="cursor-pointer">
        <Image
          width="32"
          height="32"
          src="https://img.icons8.com/pulsar-color/32/delete-sign.png"
          alt="delete-sign"
        />
      </span>
      {lesson?.author?.username === user?.username ? (
        <Button
          className="text-xl"
          style={{ color: "#f45d5d" }}
          onClick={showDeleteConfirm}
          type="dashed"
        >
          <i className="fa-solid fa-trash-can"></i>
        </Button>
      ) : null}
    </div>
  )
}
