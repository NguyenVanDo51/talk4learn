'use client'

import { signIn } from 'next-auth/react'
import { AppButton } from './antd/AppButton'

export const LoginButton = ({ children = 'Try it now' }: any) => {
  return (
    <AppButton className="capitalize shadow-md bg-white text-black font-medium" onClick={() => signIn('google')}>
      {children}
    </AppButton>
  )
}
