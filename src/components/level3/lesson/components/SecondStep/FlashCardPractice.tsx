import { IVocabulary } from '@/types/vocabulary'
import { AppButton } from '@/components/level1/AppButton'
import { FlashCard } from '@/components/level2/FlashCard'
import { FC, useState } from 'react'

interface IProps {
  vocabularies: IVocabulary[]
}

export const FlashCardPractice: FC<IProps> = ({ vocabularies }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rememberedWords, setRememberedWords] = useState<number[]>([])
  const currentWord = vocabularies[currentIndex]

  const nextWord = () => {
    setCurrentIndex(currentIndex + 1)
  }

  return (
    <div className="flex flex-col items-center gap-3 h-full">
      {currentIndex < vocabularies.length ? (
        <>
          <div>
            <FlashCard front={currentWord.en} back={currentWord.translated} />
          </div>

          <div className="flex gap-3">
            <AppButton onClick={nextWord}>X</AppButton>
            <AppButton
              onClick={() => {
                nextWord()
                setRememberedWords([...rememberedWords, currentIndex])
              }}
            >
              OK
            </AppButton>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <p>
            Remembered words: {rememberedWords.length}/{vocabularies.length}
          </p>
          <AppButton
            onClick={() => {
              setRememberedWords([])
              setCurrentIndex(0)
            }}
          >
            Restart
          </AppButton>
        </div>
      )}
    </div>
  )
}
