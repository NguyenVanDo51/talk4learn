import { ISetting, setThemeState } from '@/redux/slices/settingSlice'
import { useAppDispatch, useAppSelector } from '../redux'
import { useEffect } from 'react'

export const useTheme = () => {
  const theme = useAppSelector((state) => state.setting.theme)
  const dispatch = useAppDispatch()

  const setTheme = (theme: ISetting['theme']) => {
    dispatch(setThemeState(theme))
  }

  useEffect(() => {
    localStorage.theme = theme
  }, [theme])

  return { theme, setTheme }
}
