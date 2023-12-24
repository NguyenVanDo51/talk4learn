import { useRouter } from "next/navigation"
import { FC, useContext, useState } from "react"
import { ChatContext } from "../context"
import { AppModal } from "@/components/level1/antd/AppModal"
import { SettingTemplate } from "../../settings/SettingTemplate"

interface IProps {}

export const Header: FC<IProps> = () => {
  const { openInfo } = useContext(ChatContext)
  const [openSettings, setOpenSettings] = useState<boolean>(false)

  const router = useRouter()

  return (
    <div className="flex justify-between items-center px-6 border-b py-2">
      <span
        onClick={() => router.push("/home")}
        className="cursor-pointer text-lg"
      >
        <i className="fa-regular fa-arrow-left mr-1"></i>
      </span>

      <span>
        <span
          className="cursor-pointer text-lg mr-4"
          onClick={() => setOpenSettings(true)}
        >
          <i className="fa-regular fa-gear"></i>
        </span>

        <span onClick={openInfo} className="cursor-pointer text-lg">
          <i className="fa-regular fa-bars"></i>
        </span>
      </span>

      <AppModal
        open={openSettings}
        onCancel={() => setOpenSettings(false)}
        title="Settings"
        cancelButtonProps={{ className: "!hidden" }}
        onOk={() => setOpenSettings(false)}
        okText="Close"
      >
        <SettingTemplate />
      </AppModal>
    </div>
  )
}
