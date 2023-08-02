"use client"

import Link from 'next/link'

export const MainHeader = () => {
  return (
    <nav className="h-[46px]">
      <ul className='flex w-full gap-8 justify-end px-10 py-2'>
        <li>
          <a href={'/lessons'}> Lessons</a>
        </li>
        <li>
          <a href={'/chat'}> Chat</a>
        </li>
      </ul>
    </nav>
  )
}
