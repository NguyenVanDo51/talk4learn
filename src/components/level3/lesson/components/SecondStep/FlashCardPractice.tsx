import { IVocabulary } from '@/app/types/vocabulary'
import { AppButton } from '@/components/level1/AppButton'
import { FlastCard } from '@/components/level2/FlashCard'
import { FC, useState } from 'react'

interface IProps {
  vocabularies: IVocabulary[]
}

export const FlashCardPractice: FC<IProps> = ({ vocabularies }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rememberedWords, setRememberedWords] = useState<number[]>([])
  const currentWord = vocabularies[currentIndex]

  const nextWord = () => {
    if (currentIndex > vocabularies.length - 2) return

    setCurrentIndex(currentIndex + 1)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3 h-full">
      {currentIndex < vocabularies.length - 1 ? (
        <>
          <div>
            <FlastCard front={currentWord.en} back={currentWord.translated} />
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
          <AppButton>Restart</AppButton>
        </div>
      )}
    </div>
  )
}
