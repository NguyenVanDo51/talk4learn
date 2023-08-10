import { IVocabulary } from '@/types/vocabulary'
import { AppButton } from '@/components/level1/antd/AppButton'
import { FlashCard } from '@/components/level2/FlashCard'
import { FC, useEffect, useMemo, useState } from 'react'
import { speak } from '@/helps/speech'


interface IProps {
  vocabularies: IVocabulary[]
  setDuringPractice: (value: boolean) => void
}

export const FlashCardPractice: FC<IProps> = ({ vocabularies, setDuringPractice }) => {
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [rememberedWords, setRememberedWords] = useState<number[]>([])
  const currentWord = vocabularies[currentIndex]

  const nextWord = () => {
    setCurrentIndex(currentIndex + 1)
  }

  useEffect(() => {
    setDuringPractice(currentIndex > -1 && currentIndex < vocabularies.length)
  }, [currentIndex, setDuringPractice, vocabularies.length])

  return (
    <div className="flex flex-col items-center gap-3 h-full">
      {currentIndex === -1 || currentIndex >= vocabularies.length ? (
        <div className="flex flex-col items-center gap-3">
          {currentIndex !== -1 && (
            <p>
              Remembered words: {rememberedWords.length}/{vocabularies.length}
            </p>
          )}
          <AppButton
            onClick={() => {
              setRememberedWords([])
              setCurrentIndex(0)
              setDuringPractice(true)
            }}
          >
            {currentIndex < vocabularies.length ? 'Start' : 'Restart'}
          </AppButton>
        </div>
      ) : (
        <>
          <div>
            <FlashCard front={currentWord.en} back={currentWord.translated} />
          </div>

          <div className="flex gap-3">
            <AppButton onClick={nextWord}>X</AppButton>
            <AppButton onClick={() => speak(currentWord.en)} size="small">
              Speak
            </AppButton>
            <AppButton
              onClick={() => {
                nextWord()
                setRememberedWords([...rememberedWords, currentIndex])
              }}
              icon={<i className="fa-solid fa-check"></i>}
            ></AppButton>
          </div>
        </>
      )}
    </div>
  )
}
