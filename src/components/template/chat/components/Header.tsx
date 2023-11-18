import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CupIcon } from '../icons/cup'
import { useLessonsCompleted } from '@/hooks/fetchers/useLessonsCompleted'
import { useContext } from 'react'
import { ChatContext } from '../context'

export const Header = () => {
  const router = useRouter()
  return (
    <div className="flex justify-between items-center px-4 h-16 border-b">
      <span onClick={() => router.push("/")} className="cursor-pointer">
        <Image
          width="32"
          height="32"
          src="https://img.icons8.com/pulsar-color/32/delete-sign.png"
          alt="delete-sign"
        />
      </span>
    </div>
  )
}
