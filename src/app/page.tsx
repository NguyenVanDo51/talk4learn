import { Logo } from "@/components/level1/Logo"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import clsx from "clsx"
import Image from "next/image"

const LoginButton = ({
  size = "normal",
  className,
}: {
  size?: "normal" | "large"
  className?: string
}) => {
  return (
    <a
      href="/sign-in"
      className={clsx(
        "bg-indigo-500 text-white transition-all shadow rounded hover:bg-indigo-600 font-medium group",
        {
          "py-2 px-5": size === "normal",
          "py-2.5 px-5": size === "large",
        },
        className
      )}
    >
      Try for free
      <i className="fa-regular fa-arrow-right text-sm tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2"></i>
    </a>
  )
}

export default async function Home() {
  const user = await currentUser()

  if (user?.id) {
    return redirect("/home")
  }

  return (
    <div className="">
      <header className="w-full">
        <div className="px-8 py-4 flex items-center justify-between bg-white">
          <div className="cursor-pointer">
            <Logo />
          </div>

          <div>
            <LoginButton />
          </div>
        </div>
      </header>

      <main className="bg-primary text-white">
        <section className="py-40 px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-5xl font-bold">
              Design Your Dialogue: Master English through Personal Scenarios.
            </h1>

            <p className="text-base mt-3">
              {`Chat with AI, craft your scenarios, explore others' situations - all
            in one app for mastering English.`}
            </p>

            <div className="mt-6">
              <LoginButton
                size="large"
                className="bg-white hover:bg-white !text-text-primary"
              />
            </div>
          </div>

          <div>
            <div className="bg-[#4f35db] rounded-2xl p-2">
              <img
                className="rounded-lg w-full h-auto"
                src="https://img.freepik.com/free-photo/blank-catalog-magazines-book-mock-up-blue-background_1232-4969.jpg"
                alt=""
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-screen-2xl mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="md:flex md:items-center md:justify-between pb-4 md:pb-8">
            <div className="text-sm">
              <a className=" transition duration-150 ease-in-out" href="/terms">
                Terms
              </a>
              {" · "}
              <a
                className=" transition duration-150 ease-in-out"
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
