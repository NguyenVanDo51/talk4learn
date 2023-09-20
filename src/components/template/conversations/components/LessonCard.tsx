import { ISetting } from '@/redux/slices/settingSlice'
import { SettingLangEnum } from '@/service/user/request'
import { ILesson } from '@/types/lesson/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface LessonCardProps {
  lesson: ILesson
  lang: ISetting['lang']
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, lang = SettingLangEnum.EN }) => {
  return (
    <Link href={`/app/conversations/${lesson.id}`}>
      <div className="bg-white shadow-md rounded-md p-4 cursor-pointer hover:bg-gray-100 transition duration-300 w-full md:w-[300px] h-[200px]">
        <div className="flex items-center justify-between">
          <Image width={56} height={56} src={lesson.image} alt={lesson.name} />
          <span>
            <Image
              width="32"
              height="32"
              src="https://img.icons8.com/color/32/checked-radio-button--v1.png"
              alt="checked-radio-button--v1"
            />
          </span>
        </div>
        <h2 className="text-lg font-semibold mt-2 bt-1">{lesson.name}</h2>
        <p className="text-gray-500 text-sm">{lesson.userContext[lang]}</p>
      </div>
    </Link>
  )
}
