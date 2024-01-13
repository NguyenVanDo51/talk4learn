import { appConfig, CACHE_DATA_TIMEOUT } from "@/libs/appConfig"

export async function GET(req: Request) {
  const res = await fetch(
    "https://gsa.bi.gobizdev.com/hot_product/items/search" +
      "?" +
      req.url.split("?")[1] || "",
    {
      next: {
        revalidate: CACHE_DATA_TIMEOUT,
      },
    }
  )
  const data = await res.json()

  return Response.json(data)
}
