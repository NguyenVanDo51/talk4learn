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
    colorText: 'rgb(227,227,227)',
    colorPrimary: '#e3e3e3',
    colorBgBase: '#1b1b1d',
    colorBorder: '#979797',
  },
}

export const UITheme = {
  space: {
    normal: 16,
    large: 24,
  },
}
