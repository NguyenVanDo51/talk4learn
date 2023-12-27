import { Modal } from "antd"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { ChatContext } from "../context"
const Attention = (props: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  isModalOpen: boolean
}) => {
  const { lesson } = useContext(ChatContext)
  console.log("lesson", lesson)

  const handleOk = () => {
    props.setIsModalOpen(false)
  }

  const handleCancel = () => {
    props.setIsModalOpen(false)
  }
  return (
    <div>
      <Modal
        title="Bot Instruction"
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{lesson?.assistantInstruction}</p>
      </Modal>
    </div>
  )
}

export default Attention
