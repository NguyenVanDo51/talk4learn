import type { InferGetServerSidePropsType } from 'next'

export default function SignIn({ providers }: InferGetServerSidePropsType<any>) {
  console.log('providers', providers)

  return (
    <>
      Login
      {/* {Object.values(providers || {}).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      ))} */}
    </>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   // const session = await getServerSession(context.req, context.res, authOptions)

//   // // If the user is already logged in, redirect.
//   // // Note: Make sure not to redirect to the same page
//   // // To avoid an infinite loop!
//   // if (session) {
//   //   return { redirect: { destination: '/' } }
//   // }

//   const providers = await getProviders()

//   return {
//     props: { providers: providers ?? [] },
//   }
// }
