import Image, { ImageProps } from "next/image"
import { FC } from "react"

interface IProps extends Omit<ImageProps, "alt"> {
  alt?: string
  size?: number
  shape?: "circle" | "square"
}

export const Avatar: FC<IProps> = ({
  alt = "alt-image",
  className = "",
  shape = "circle",
  size = 64,
  ...props
}) => {
  return (
    <Image
      width={size}
      height={size}
      className={`${
        shape === "square" ? "rounded-lg" : "rounded-full"
      } ${className} object-cover`}
      alt={alt}
      style={{ width: size, height: size }}
      {...props}
    />
  )
}
