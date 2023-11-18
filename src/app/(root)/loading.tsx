import { LoadingScreen } from "@/components/level1/Loading"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="mt-3">
      <LoadingScreen noLogo />
    </div>
  )
}
