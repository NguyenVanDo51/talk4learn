import { AppButton } from '@/components/level1/AppButton'
import { IVocabulary } from '@/types/vocabulary'
import { FC } from 'react'

interface IProps {
  vocabularies: IVocabulary[]
  onDeleteVocabulary?: (id: string) => void
}
export const VocabularyList: FC<IProps> = ({ vocabularies, onDeleteVocabulary }) => {
  return (
    <ul className="grid gap-3">
      {vocabularies.map((word, index) => (
        <li key={index}>
          <span className="font-medium">{word.en}</span>: {word.translated}{' '}
          {onDeleteVocabulary && (
            <AppButton size="small" danger onClick={() => onDeleteVocabulary(word.id)}>
              Delete
            </AppButton>
          )}
        </li>
      ))}
    </ul>
  )
}
