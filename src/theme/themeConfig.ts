import type { ThemeConfig } from 'antd'

export const defaultTheme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: 'rgb(168 85 247)',
  },
}

export const darkTheme: ThemeConfig = {
  ...defaultTheme,
  token: {
    ...defaultTheme.token,
    colorPrimary: '#e3e3e3',
  },
}

export const UITheme = {
  space: {
    normal: 16,
    large: 24,
  },
}
