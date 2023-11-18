import { Logo } from "../level1/Logo"
import Link from "next/link"
import { Sidebar } from "./sidebar"
import "antd/lib/"
import { UserButton, auth, redirectToSignIn } from "@clerk/nextjs"

export const AuthenLayout = async ({ children }: any) => {
  const { userId } = auth()

  if (!userId) {
    return redirectToSignIn()
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <div className="bg-white h-fit min-h-full">
        <header className="py-2 px-6 border-b h-14 flex justify-between items-center sticky top-0 bg-white z-50">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          <UserButton afterSignOutUrl="/" />
        </header>

        <main>
          <aside
            id="logo-sidebar"
            className="fixed top-14 left-0 z-40 w-20 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full py-2 px-2 overflow-y-auto bg-white dark:bg-gray-800">
              <Sidebar />
            </div>
          </aside>

          <div className="sm:ml-20">{children}</div>
        </main>
      </div>
    </>
  )
}
