"use client"

import { Divider, Form, Input, Select } from "antd"
import { FC, useEffect, useRef, useState } from "react"
import { AppButton } from "@/components/level1/antd/AppButton"
import { ImageUpload } from "@/components/inputs/image-upload"
import { ScenarioInterface } from "@/types/lesson/type"
import { BotService } from "@/service/bot/index.service"
import { useRouter } from "next/navigation"
import { AppNotifycation } from "@/components/level1/antd/AppNotification"
import { LoadingScreen } from "@/components/level1/Loading"
import { useMounted } from "@/hooks/helpers/use-mounted"

export const tagOptions = [
  "working",
  "school",
  "interview",
  "social",
  "conversation",
  "networking",
]
interface CreateScenarioProps {
  scenario?: ScenarioInterface
}

export const CreateScenario: FC<CreateScenarioProps> = ({ scenario }) => {
  const isMounted = useMounted()
  const [botImage, setBotImage] = useState("/bot_placeholder.png")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const nameRef = useRef<HTMLInputElement>()

  const [form] = Form.useForm<ScenarioInterface>()

  const onFinish = (values: ScenarioInterface) => {
    if (isLoading) return
    setIsLoading(true)

    BotService.create({ ...(scenario ?? {}), ...values, botImage })
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

  useEffect(() => {
    if (!scenario) return
    nameRef.current?.focus()

    setBotImage(scenario.botImage)
    form.setFieldsValue({
      name: scenario.name,
      tags: scenario.tags,
      public: scenario.public,
      assistantInstruction: scenario.assistantInstruction,
      userInstruction: scenario.userInstruction,
      assistantFirstMessage: scenario.assistantFirstMessage,
    })
  }, [form, scenario])

  if (!isMounted) return <LoadingScreen noLogo />

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
          form={form}
        >
          <Form.Item<ScenarioInterface>
            label="Name of sutiation"
            name="name"
            rules={[
              { required: true, message: "" },
              { min: 10, message: "Name must be at least 10 characters" },
            ]}
          >
            <Input
              ref={nameRef as any}
              min={10}
              max={50}
              placeholder="e.g. Meeting New People"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item<ScenarioInterface> label="Tags" name="tags">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select tags"
                maxLength={3}
                options={tagOptions.map((t) => ({ value: t, label: t }))}
              />
            </Form.Item>

            <Form.Item<ScenarioInterface>
              label="Public access"
              name="public"
              initialValue={true}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select tags"
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

          <Form.Item<ScenarioInterface>
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

          <Form.Item<ScenarioInterface>
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

          <Form.Item<ScenarioInterface>
            label="Greeting message"
            name="assistantFirstMessage"
            help="The bot will send this message at the beginning of every conversation."
          >
            <Input placeholder="e.g. Hello! My name is Braum. I'm here to help you practice socializing." />
          </Form.Item>

          <Form.Item<ScenarioInterface> className="flex justify-center mt-2">
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
              {scenario ? "Update" : "Create"} your Situational
            </AppButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
