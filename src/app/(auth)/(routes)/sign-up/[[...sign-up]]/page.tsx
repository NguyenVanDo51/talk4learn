import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return <SignUp afterSignInUrl={"/home"} />
}

export default SignUpPage
