import NextAuth from "next-auth"
import { PrismaClient } from "@prisma/client" 
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Provider } from "next-auth/providers"

//--- Providers
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

const prisma = new PrismaClient()

const providers: Provider[] = [
  GitHub,
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      }
    },
  }),
]

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "sign-in"
  }
})