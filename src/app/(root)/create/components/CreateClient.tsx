"use client"

import { Checkbox, Divider, Form, Input, Select } from "antd"
import { useState } from "react"
import { AppButton } from "@/components/level1/antd/AppButton"
import { ImageUpload } from "@/components/inputs/image-upload"
import { ILesson } from "@/types/lesson/type"
import { BotService } from "@/service/bot/index.service"
import { useRouter } from "next/navigation"
import { AppNotifycation } from "@/components/level1/antd/AppNotification"

export const tagOptions = [
  "working",
  "school",
  "interview",
  "social",
  "conversation",
  "networking",
]

export const CreateBotClient = () => {
  const [botImage, setBotImage] = useState("/bot_placeholder.png")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onFinish = (values: ILesson) => {
    if (isLoading) return
    console.log("values", values)
    setIsLoading(true)
    BotService.create({ ...values, botImage })
      .then(() => {
        AppNotifycation.success({
          message: "Your topic is created successfully",
        })
        router.push("/")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="container max-w-4xl my-0 mx-auto">
      <div className="p-4">
        <h1 className="font-medium text-xl">Situational Overview</h1>
        <span className="text-gray-500">Basic information of sutiation</span>

        <Divider className="mt-1 mb-6" />
        <div className="flex items-center justify-center">
          <ImageUpload
            value={botImage}
            onChange={(src: string) => setBotImage(src)}
          />
        </div>

        <Form
          onFinish={onFinish}
          className="grid gap-2"
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item<ILesson>
            label="Name of sutiation"
            name="name"
            rules={[
              { required: true, message: "" },
              { min: 10, message: "Name must be at least 10 characters" },
            ]}
          >
            <Input min={10} max={50} placeholder="e.g. Meeting New People" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item<ILesson> label="Tags" name="tags">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select tags"
                maxLength={3}
                options={tagOptions.map((t) => ({ value: t, label: t }))}
              />
            </Form.Item>

            <Form.Item<ILesson> label="Public access" name="public">
              <Select
                style={{ width: "100%" }}
                placeholder="Select tags"
                defaultValue={true}
                options={[
                  { value: false, label: "Private" },
                  { value: true, label: "Public" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="mt-4">
            <h2 className="font-medium text-xl">Configuration</h2>
            <span className="text-gray-500">
              Detailed Configuration for sutiation
            </span>
          </div>
          <Divider className="mt-1 mb-3" />

          <Form.Item<ILesson>
            label="Bot instruction"
            name="assistantInstruction"
            help="Describe in detail your chatbot's backstory and relevant details."
            rules={[{ required: true, message: "" }]}
          >
            <Input.TextArea
              rows={5}
              placeholder="e.g. Imagine you are at a social event. Initiate a conversation with a stranger."
            />
          </Form.Item>

          <Form.Item<ILesson>
            label="User instruction"
            name="userInstruction"
            help="Describe your tasks while talking with your bot"
            rules={[{ required: true, message: "" }]}
          >
            <Input.TextArea
              maxLength={400}
              placeholder="e.g. Introduce yourself and try to find common topics to discuss."
            />
          </Form.Item>

          <Form.Item<ILesson>
            label="Greeting message"
            name="assistantFirstMessage"
            help="The bot will send this message at the beginning of every conversation."
          >
            <Input placeholder="e.g. Hello! My name is Braum. I'm here to help you practice socializing." />
          </Form.Item>

          <Form.Item<ILesson> className="flex justify-center mt-2">
            <AppButton
              htmlType="submit"
              className="inline-flex !h-10"
              size="large"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-4 h-4"
                >
                  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
                  <path d="m14 7 3 3"></path>
                  <path d="M5 6v4"></path>
                  <path d="M19 14v4"></path>
                  <path d="M10 2v2"></path>
                  <path d="M7 8H3"></path>
                  <path d="M21 16h-4"></path>
                  <path d="M11 3H9"></path>
                </svg>
              }
              loading={isLoading}
            >
              Create your Situational
            </AppButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
