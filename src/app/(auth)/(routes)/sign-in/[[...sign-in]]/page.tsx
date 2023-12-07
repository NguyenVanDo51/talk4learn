import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
  return (
    <SignIn
      appearance={{
        variables: {
          colorPrimary: "#ec4899",
        },
      }}
    />
  )
}

export default SignInPage
