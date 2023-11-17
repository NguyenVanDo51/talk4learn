import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { UploadProps, UploadFile, Upload, message } from "antd"
import { UploadChangeParam, RcFile } from "antd/es/upload"
import { useState } from "react"

import "./style.scss"
import Image from "next/image"

export const AppUploadAvatar = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Upload
      name="avatar"
      listType="picture-circle"
      className="avatar-uploader"
      showUploadList={false}
      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="avatar"
          style={{ width: "100%" }}
          width={64}
          height={64}
        />
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center">
          <Image
            width="64"
            height="64"
            src="https://img.icons8.com/external-emojis-because-i-love-you-royyan-wijaya/64/external-avatar-hana-emojis-general-ii-emojis-because-i-love-you-royyan-wijaya-2.png"
            alt="external-avatar-hana-emojis-general-ii-emojis-because-i-love-you-royyan-wijaya-2"
          />
          Edit picture
        </div>
      )}
    </Upload>
  )
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!")
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!")
  }
  return isJpgOrPng && isLt2M
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener("load", () => callback(reader.result as string))
  reader.readAsDataURL(img)
}
