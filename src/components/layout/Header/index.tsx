'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const MainHeader = () => {
  const route = useRouter()
  return (
    <nav className="h-[46px]">
      <ul className="flex w-full gap-8 justify-end px-10 py-2">
        <li onClick={() => route.push('/lessons')}>Lessons</li>
        <li>
          <a href={'/chat'}> Chat</a>
        </li>
      </ul>
    </nav>
  )
}
