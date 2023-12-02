import { auth } from "@clerk/nextjs"

const DAY_IN_MS = 86_400_000

export const checkSubscription = async () => {
  const { userId } = auth()

  if (!userId) {
    return false
  }
  return true
}
