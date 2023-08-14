import Introduction from '@/components/template/introduction'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route'

export default function Home(props: any) {
  console.log('props', props)
  // if (session) {
  //   redirect('/app')
  // }
  return <Introduction />
}

export async function getServerSideProps(context: any) {
  // const session = await getServerSession(context.req, context.res, authOptions)
  const session = await getServerSession(authOptions)
  console.log('session', session)

  return {
    props: {
      session,
    },
  }
}
