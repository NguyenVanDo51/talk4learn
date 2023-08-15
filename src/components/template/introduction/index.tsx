import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { LoginButton } from '@/components/level1/LoginButton'
import { Logo } from '@/components/level1/Logo'
import { APP_NAME } from '@/types/constants'
import { getServerSession } from 'next-auth/next'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const Introduction = async () => {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/app')
  }

  return (
    <>
      <header className="px-5 lg:px-[10vw] py-4 bg-black shadow-2xl mx-auto flex items-center justify-between">
        <Logo />
        <LoginButton>Login</LoginButton>
      </header>
      <div className="container flex flex-col mx-auto gap-10 px-10">
        <div className="flex flex-col justify-center gap-4 text-center mt-16">
          <h1 className="text-lg lg:text-4xl font-bold text-white">Chat and Speak Practice English with {APP_NAME} </h1>
          <div className="lg:px-20">
            <p className="lg:text-lg">
              {APP_NAME} is a free online English learning platform that helps you improve your listening and speaking
              skills through AI-powered chat. With {APP_NAME}, you can have conversations with Chatbot, and get feedback
              on your pronunciation, grammar, and vocabulary.
            </p>
          </div>
          <div className="mt-6">
            <LoginButton />
          </div>
        </div>

        <div className="flex flex-grow justify-center">
          <Image
            className="h-full w-auto max-h-[650px] hidden lg:block"
            width={400}
            height={200}
            alt="ranga desktop preview"
            src="/images/mac-view.gif"
          ></Image>

          <Image
            className="h-full w-auto max-h-[650px] lg:hidden"
            width={400}
            height={200}
            alt="ranga desktop preview"
            src="/images/mobile-preview.png"
          ></Image>
        </div>
      </div>
      <footer className="px-5 lg:px-[10vw] py-6 bg-black grid gap-4 mt-16" style={{ gridTemplateColumns: 'auto auto' }}>
        <div className="flex flex-col gap-2">
          <div className="text-xl text-white">
            <Logo /> - Practice English with AI Chatbot
          </div>

          <p>A great way to improve your English skills in a fun and interactive way.</p>
          <a href="mailto:andy510@gmail.com" target="_blank">
            <i className="fa-regular fa-envelope mr-2"></i>
            Contact
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl text-white">Policy</div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </footer>
    </>
  )
}

export default Introduction