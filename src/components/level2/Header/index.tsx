'use client'

import Link from "next/link"

export const MainHeader = () => {
  return (
    <nav className="h-[46px]">
      <ul>
        <li>
          <Link href={'/lessons'}> Lessons</Link>
        </li>
      </ul>
    </nav>
  )
}
