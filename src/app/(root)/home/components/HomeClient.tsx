"use client"
import SituationCard from "@/components/displayers/SituationCard"
import { AppSpin } from "@/components/level1/antd/AppSpin"
import { Empty } from "@/components/level1/antd/Empty"
import { httpClient } from "@/service/httpClient"
import { ScenarioInterface } from "@/types/lesson/type"
import { useQuery } from "@tanstack/react-query"

export const HomeClient = () => {
  const { data: bots, isLoading } = useQuery<ScenarioInterface[]>({
    queryKey: ["my_situations"],
    queryFn: () => httpClient.get("/api/situations/mine").then((r) => r.data),
    refetchOnWindowFocus: false,
  })

  return (
    <div className="container max-w-2xl my-0 mx-auto p-3">
      <div className="flex flex-col">
        <h1 className="text-xl mb-6">Your personal situations</h1>

        {isLoading ? (
          <AppSpin />
        ) : (
          <>
            {bots && bots.length < 1 && <Empty />}

            {bots?.map((bot) => (
              <SituationCard key={bot.id} bot={bot} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
