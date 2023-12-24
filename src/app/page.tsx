import { Logo } from "@/components/level1/Logo"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import clsx from "clsx"
import Link from "next/link"

export const LoginButton = ({
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
        "rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo px-7 py-2.5 bg-indigo-600 text-white hover:bg-indigo-600 flex gap-1 items-center justify-center group",

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
        <div className="px-4 md:px-8 py-4 flex items-center justify-between bg-white">
          <Link href={"/"}>
            <Logo />
          </Link>

          <div>
            <LoginButton />
          </div>
        </div>
      </header>

      <div className="overflow-x-clip">
        <div className="max-w-screen-xl mx-auto px-5">
          <main className="grid lg:grid-cols-5 place-items-center relative">
            <div className="absolute w-96 h-96 blur-2xl -z-10 bg-gradient-radial from-indigo-200 right-0 top-0"></div>
            <div className="absolute w-96 h-96 blur-2xl -z-10 bg-gradient-radial from-purple-200 right-56 top-10"></div>
            <div className="max-w-sm md:max-w-max lg:col-span-2">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold lg:tracking-tight xl:tracking-tighter [text-wrap:balance] text-center lg:text-start">
                Design Your Dialogue: Master English through Personal Scenarios.
              </h1>
              <p className="text-lg mt-4 max-w-lg text-slate-600 [text-wrap:balance] text-center lg:text-start">
                {`Chat with AI, craft your scenarios, explore others' situations - all
            in one app for mastering English.`}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-3">
                <LoginButton size="large" />
              </div>
            </div>

            <div className="lg:col-span-3 lg:-mr-44 py-10">
              <div className="bg-black rounded-2xl p-2 max-w-[660px]">
                <img
                  className="rounded-lg w-full h-auto"
                  src="/images/mac-preview.png"
                  alt=""
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="bg-gradient-to-bl from-indigo-900 to-indigo-700 p-8 md:px-20 md:py-20 mt-20 flex flex-col items-center text-center">
        <h2 className="text-white text-4xl md:text-6xl tracking-tight">
          Ready to improve your language skills?
        </h2>
        <p className="text-white/70 mt-4 text-lg md:text-xl">
          Join us and experience learning English in a completely new and more
          exciting way than ever before.
        </p>
        <div className="flex mt-5">
          <a
            href="#"
            className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo px-7 py-2.5 bg-white text-indigo-800 border-2 border-transparent"
          >
            Sign up for Free
          </a>
        </div>
      </div>

      <footer className="py-14 bg-slate-100 border-t border-slate-100">
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
              <a href="/" className="text-lg flex items-center">
                <span className="font-bold text-primary">talk4learn</span>
              </a>
              <p className="mt-4 text-sm text-slate-700 max-w-xs">
                talk4learn is a English learning application that allows you
                chat with AI in customize situations
              </p>
              <div className="flex gap-3 mt-4 items-center">
                <a
                  href="https://twitter.com/surjithctly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-200 hover:bg-slate-300 rounded w-6 h-6 inline-flex items-center justify-center text-slate-500"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    astro-icon="bx:bxl-twitter"
                  >
                    <path
                      fill="currentColor"
                      d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                    ></path>
                  </svg>
                  <span className="sr-only">Twitter or X</span>
                </a>
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-200 hover:bg-slate-300 rounded w-6 h-6 inline-flex items-center justify-center text-slate-500"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    astro-icon="bx:bxl-facebook-circle"
                  >
                    <path
                      fill="currentColor"
                      d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"
                    ></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-200 hover:bg-slate-300 rounded w-6 h-6 inline-flex items-center justify-center text-slate-500"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    astro-icon="bx:bxl-linkedin-square"
                  >
                    <path
                      fill="currentColor"
                      d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"
                    ></path>
                  </svg>
                  <span className="sr-only">Linkedin</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm text-slate-800">Company</h3>
              <div className="flex flex-col mt-3">
                <a
                  href="/about"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  About
                </a>
                <a
                  href="#"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  Careers
                </a>
                <a
                  href="/blog"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  Blog
                </a>
                <a
                  href="/contact"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm text-slate-800">Product</h3>
              <div className="flex flex-col mt-3">
                <a
                  href="#"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  For Startups
                </a>
                <a
                  href="#"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  Features
                </a>
                <a
                  href="/pricing"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  Integrations
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm text-slate-800">Resources</h3>
              <div className="flex flex-col mt-3">
                <a
                  href="#"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  Guides
                </a>
                <a
                  href="#"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="py-2 text-sm text-slate-600 hover:text-indigo-600"
                >
                  Uptime Status
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 pt-8 px-5 border-t border-slate-200">
          <div className="max-w-screen-xl mx-auto px-5">
            <p className="text-center text-sm text-slate-600 [text-wrap:balance]">
              Copyright © 2023 Astroship. All rights reserved.
            </p>
            <p className="text-center text-xs text-slate-600 mt-2">
              <a href="/terms" className="hover:text-indigo-500">
                {" "}
                Terms
              </a>{" "}
              ・{" "}
              <a href="/privacy" className="hover:text-indigo-500">
                Privacy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
