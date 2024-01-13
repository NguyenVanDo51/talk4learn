import { appConfig, CACHE_DATA_TIMEOUT } from "@/libs/appConfig"

export async function GET() {
  const res = await fetch("https://api.publicapis.org/entries", {
    next: {
      revalidate: CACHE_DATA_TIMEOUT,
    },
  })
  const data = await res.json()

  return Response.json(data)
}
