import SituationCard from "@/components/displayers/SituationCard"
import { ScenarioInterface } from "@/types/lesson/type"

export const HomeClient = ({ bots }: { bots: ScenarioInterface[] }) => {
  return (
    <div className="container max-w-2xl my-0 mx-auto p-3">
      <div className="flex flex-col">
        {bots?.length > 0
          ? bots.map((bot) => <SituationCard key={bot.id} bot={bot} />)
          : "No Data"}
      </div>
    </div>
  )
}
