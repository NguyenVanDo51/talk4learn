'use client'

import { IS_SERVER } from '@/types/constants'

export const saveData = (key: string, value: any) => {
  if (IS_SERVER) return
  localStorage.setItem(key, JSON.stringify(value))
}

export const getData = (key: string) => {
  if (IS_SERVER) return

  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : undefined
}
