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
    colorBgBase: '#1b1b1d',
    colorBorder: '#979797',
    colorPrimary: '#1b1b1d',
    colorPrimaryBg: '#111111',
    colorPrimaryBgHover: '#0f0f0f',
    colorPrimaryBorder: '#161617',
    colorPrimaryBorderHover: '#171718',
    colorPrimaryHover: '#5b626b',
    colorPrimaryActive: '#19191a',
    colorPrimaryTextHover: '#242427',
    colorPrimaryText: '#1a1a1c',
    colorPrimaryTextActive: '#19191a',
  },
}

export const UITheme = {
  space: {
    normal: 16,
    large: 24,
  },
}
