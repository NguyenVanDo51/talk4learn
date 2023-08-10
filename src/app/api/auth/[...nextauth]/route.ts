import NextAuth, { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from '@prisma/client'

let prisma = null
if (!prisma) {
  prisma = new PrismaClient()
}

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    // async encode() {},
    // async decode() {},
  },
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  // },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
