import Link from 'next/link'

export const MainHeader = () => {
  return (
    <nav className="h-[46px]">
      <ul className='flex w-full gap-8 justify-end px-10 py-2'>
        <li>
          <Link href={'/lessons'}> Lessons</Link>
        </li>
        <li>
          <Link href={'/chat'}> Chat</Link>
        </li>
      </ul>
    </nav>
  )
}
