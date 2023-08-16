import { AuthenLayout } from '@/components/layout/AuthenLayout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <AuthenLayout>{children}</AuthenLayout>
}
