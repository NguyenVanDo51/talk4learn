"use client"
import { CreateBotClient } from "@/app/(root)/create/components/CreateClient"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const EditPot = () => {
  const [data, setData] = useState([])
  const router = useParams()

  console.log("router", router)
  useEffect(() => {
    getData()
  })

  const getData = () => {}

  return (
    <div>
      <CreateBotClient />
    </div>
  )
}

export default EditPot
