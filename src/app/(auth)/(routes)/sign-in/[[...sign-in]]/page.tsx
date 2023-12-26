import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
  return <SignIn afterSignInUrl={"/home"} />
}

export default SignInPage
