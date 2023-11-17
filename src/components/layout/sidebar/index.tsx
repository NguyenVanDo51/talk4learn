"use client"
import { Avatar, Popover } from "antd"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SettingModal } from "./components/settings"
import { useEffect, useState } from "react"
import { UserService } from "@/service/user/index.service"

export const Sidebar = () => {
  const { data } = useSession()
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)

  const menuItems = [
    {
      key: "/",
      label: "Home",
      icon: <i className="fa-regular fa-house"></i>,
    },
    {
      key: "/conversations",
      label: "Explore",
      icon: <i className="fa-regular fa-magnifying-glass"></i>,
    },
    {
      key: "/create",
      label: "Create",
      icon: <i className="fa-regular fa-plus"></i>,
    },
  ]

  const getSettings = async () => {
    await UserService.getSettings()
  }

  useEffect(() => {
    if (!data?.user?.email) return
    getSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user?.email])

  return (
    <ul className="space-y-2">
      {menuItems.map(({ key, icon, label }) => {
        return (
          <li key={key}>
            <Link
              href={key}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg dark:text-white hover:bg-[#00000015] dark:hover:bg-gray-700 hover:font-medium group ${
                pathname === key ? "!bg-[#00000015] font-medium" : ""
              }`}
            >
              <span>{icon}</span>
              <span className="text-xs">{label}</span>
            </Link>
          </li>
        )
      })}

      <SettingModal open={open} onCancel={() => setOpen(false)} />
    </ul>
  )
}
