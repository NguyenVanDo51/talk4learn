import { Logo } from "@/components/level1/Logo"
import { auth, redirectToSignIn } from "@clerk/nextjs"
import Link from "next/link"

const Introduction = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirectToSignIn()
  }

  return (
    <>
      <footer
        className="px-5 lg:px-[10vw] py-6  grid gap-4 mt-16"
        style={{ gridTemplateColumns: "auto auto" }}
      >
        <div className="flex flex-col gap-2">
          <div className="text-xl ">
            <Logo /> - Practice English with AI Chatbot
          </div>

          <p>
            A great way to improve your English skills in a fun and interactive
            way.
          </p>
          <Link href="mailto:andy510@gmail.com" target="_blank">
            <i className="fa-regular fa-envelope mr-2"></i>
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl ">Policy</div>
          <Link href="/policy">Privacy Policy</Link>
          <Link href="/policy">Terms of Use</Link>
        </div>
      </footer>
    </>
  )
}

export default Introduction
