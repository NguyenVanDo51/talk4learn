import { ISetting, setThemeState } from '@/redux/slices/settingSlice'
import { useAppDispatch, useAppSelector } from '../redux'

export const useTheme = () => {
  const theme = useAppSelector((state) => state.setting.theme)
  const dispatch = useAppDispatch()

  const setTheme = (theme: ISetting['theme']) => {
    dispatch(setThemeState(theme))
  }

  return { theme, setTheme }
}
