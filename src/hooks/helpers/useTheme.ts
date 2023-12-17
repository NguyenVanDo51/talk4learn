import { useAppDispatch, useAppSelector } from "../redux"
import { useEffect } from "react"
import { ISetting } from "./use-settings"

export const useTheme = () => {
  const theme = useAppSelector((state) => state.setting.theme)
  const dispatch = useAppDispatch()

  const setTheme = (theme: ISetting["theme"]) => {}

  useEffect(() => {
    localStorage.theme = theme
  }, [theme])

  return { theme, setTheme }
}
