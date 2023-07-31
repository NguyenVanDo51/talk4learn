import { AppButton } from '@/components/level1/AppButton'
import { speak } from '@/helps/speech'

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
        <li key={index} id={word.id}>
          <span className="font-medium">{word.en}</span>: {word.translated}{' '}
          <div className="inline-flex gap-inline">
            <AppButton onClick={() => speak(word.en)} size="small">
              Speak
            </AppButton>

            {onDeleteVocabulary && (
              <AppButton size="small" danger onClick={() => onDeleteVocabulary(word.id)}>
                Delete
              </AppButton>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
