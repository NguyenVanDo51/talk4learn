import { appConfig, CACHE_DATA_TIMEOUT } from "@/libs/appConfig"

export async function GET(req: Request) {
  const res = await fetch(
    appConfig.apiDataBI +
      "/hot_product/get_cate_2/search" +
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
