import { IVocabulary } from '@/app/types/vocabulary'
import { Button } from 'antd'
import { FC, useState } from 'react'
import { VocabularyList } from './VocabularyList'

interface IProps {
  vocabularies: IVocabulary[]
}

export const SecondStep: FC<IProps> = ({ vocabularies }) => {
  const [showFlashcards, setShowFlashcards] = useState<boolean>(false)

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Step 2: Vocabulary List</h1>
      <VocabularyList vocabularies={vocabularies} />
      <Button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={() => setShowFlashcards(true)}
      >
        Start Learning with Flashcards
      </Button>
    </>
  )
}
