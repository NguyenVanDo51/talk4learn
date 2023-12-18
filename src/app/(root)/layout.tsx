import { Logo } from "@/components/level1/Logo"
import { auth, currentUser, redirectToSignIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { SidebarClient } from "./components/SidebarClient"
import { checkSubscription } from "@/libs/stripe"
import { AppFeedback } from "@/components/feedback"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    return redirectToSignIn()
  }

  const isPro = await checkSubscription()

  return (
    <>
      <AppFeedback />
      <div className="bg-white h-fit min-h-full">
        <header className="py-1 px-3 sm:px-6 border-b h-12 flex justify-between items-center sticky top-0 bg-white z-50">
          <SidebarClient mobile />

          <Link href="/home" className="flex items-center">
            <Logo />
          </Link>

          <div className="flex gap-6 items-center">
            {/* {isPro ? "Pro Version" : <UpgradeButton />} */}
            <span className="inline-flex items-center gap-2">
              <UserButton />
            </span>
          </div>
        </header>

        <main>
          <aside
            id="logo-sidebar"
            className="fixed top-14 left-0 z-40 w-20 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full py-2 px-2 overflow-y-auto bg-white dark:bg-gray-800">
              <SidebarClient />
            </div>
          </aside>

          <div className="sm:ml-20">{children}</div>
        </main>
      </div>
    </>
  )
}
