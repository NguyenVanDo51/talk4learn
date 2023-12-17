import { useEffect } from "react"
import { ISetting } from "./use-settings"

export const useTheme = () => {
  const theme = ""

  const setTheme = (theme: ISetting["theme"]) => {}

  useEffect(() => {
    localStorage.theme = theme
  }, [theme])

  return { theme, setTheme }
}
