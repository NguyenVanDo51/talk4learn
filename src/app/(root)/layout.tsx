import { Logo } from "@/components/level1/Logo"
import { auth, redirectToSignIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { SidebarClient } from "./components/SidebarClient"
import { UpgradeButton } from "./components/UpgradeButton"
import { checkSubscription } from "@/libs/stripe"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    return redirectToSignIn()
  }

  const isPro = await checkSubscription()

  return (
    <>
      <div className="bg-white h-fit min-h-full">
        <header className="py-2 px-3 sm:px-6 border-b h-14 flex justify-between items-center sticky top-0 bg-white z-50">
          <SidebarClient mobile />

          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          <div className="flex gap-6 items-center">
            {isPro ? "Pro Version" : <UpgradeButton />}
            <UserButton />
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
