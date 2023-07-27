import { IVocabulary } from '@/app/types/vocabulary'
import { FC } from 'react'

interface IProps {
  vocabularies: IVocabulary[]
}
export const VocabularyList: FC<IProps> = ({ vocabularies }) => {
  return (
    <ul>
      {vocabularies.map((word, index) => (
        <li key={index}>{word.en}</li>
      ))}
    </ul>
  )
}
