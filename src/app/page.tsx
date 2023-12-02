import { Logo } from "@/components/level1/Logo"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import clsx from "clsx"

const LoginButton = ({ size = "normal" }: { size?: "normal" | "large" }) => {
  return (
    <a
      href="/sign-in"
      className={clsx(
        "bg-indigo-500 text-white transition-all shadow rounded hover:bg-indigo-600 font-medium group",
        {
          "py-2 px-5": size === "normal",
          "py-2.5 px-5": size === "large",
        }
      )}
    >
      Get Started
      <i className="fa-regular fa-arrow-right text-sm tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2"></i>
    </a>
  )
}

export default async function Home() {
  const user = await currentUser()

  if (user?.id) {
    return redirect("/home")
  }

  return (
    <div className="bg-[#0f172a] text-[#e2e8f0]">
      <header className="w-full">
        <div className="px-20 py-4 flex items-center justify-between">
          <div className="cursor-pointer">
            <Logo />
          </div>

          <div>
            <LoginButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl">
        <section className="py-40 px-10 text-center">
          <h1 className="text-6xl font-bold">
            Design Your Dialogue: Master English through Personal Scenarios.
          </h1>

          <p className="text-[#64748b] text-xl mt-3">
            {`Chat with AI, craft your scenarios, explore others' situations - all
            in one app for mastering English.`}
          </p>

          <div className="flex gap-3 justify-center mt-10">
            <LoginButton size="large" />

            <a
              href="/sign-in"
              className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium transition-all shadow py-2.5 px-5 rounded"
            >
              Read Docs
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="md:flex md:items-center md:justify-between pb-4 md:pb-8">
            <div className="text-sm text-slate-600">
              <a
                className="text-slate-500 hover:text-slate-300 transition duration-150 ease-in-out"
                href="/terms"
              >
                Terms
              </a>
              {" · "}
              <a
                className="text-slate-500 hover:text-slate-300 transition duration-150 ease-in-out"
                href="/privacy"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
