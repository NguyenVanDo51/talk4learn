import { useSession, signIn } from 'next-auth/react'
import { LoadingScreen } from '../level1/Loading'
import { AppModal } from '../level1/antd/AppModal'
import { Logo } from '../level1/Logo'

export const AuthenLayout = ({ children }: any) => {
  const { status } = useSession()
  if (status === 'loading') {
    return <LoadingScreen />
  }

  return (
    <>
      {children}
      <AppModal
        open={status === 'unauthenticated'}
        footer={null}
        title={
          <div>
            <Logo />
            <p className="text-md lg:text-lg mt-4">
              Practice English, improve grammar, and enhance your skills with Ranga, the AI-powered chatbot.
            </p>
          </div>
        }
        closable={false}
      >
        <h2 className="text-md lg:text-lg mb-3 lg:mb-5">Welcome back, please login to continue: </h2>
        <div className="w-full flex items-center justify-center">
          <button
            onClick={() => signIn('google')}
            className="border border-slate-500 shadow rounded-md py-2 w-full max-w-[240px] inline-flex gap-2 items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="26px" height="26px">
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span className="font-medium">Log in with google</span>
          </button>
        </div>
      </AppModal>
    </>
  )
}
