'use client'
import { useEffect, useState } from 'react'
import { IVocabulary } from '@/types/vocabulary'
import { AppButton } from '@/components/level1/antd/AppButton'
import { Lesson, lessons } from '@/components/level3/VideoSelectionScreen'
import { Spin } from 'antd'
import { FirstStep } from './components/FirstStep'
import { SecondStep } from './components/SecondStep'
import { ThirdStep } from './components/ThirdStep'

const steps: { [key in number]: string } = {
  1: 'Step 1: Watch the Video with english subtitle and add vocabulary',
  2: 'Step 2: Vocabulary List',
  3: 'Step 3: Listen and Transcribe',
}

export function LessonPractice({ id }: { id: number }) {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [lesson, setLesson] = useState<Lesson>()
  const [vocabularies, setVocabularies] = useState<IVocabulary[]>(JSON.parse(localStorage?.getItem(String(id)) ?? '[]'))

  // Function to handle next step
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  function getLesson() {
    setLesson(lessons.find((l) => l.id == id))
  }

  useEffect(() => {
    localStorage.setItem(String(id), JSON.stringify(vocabularies))
  }, [id, vocabularies])

  useEffect(() => {
    getLesson()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!lesson) return <Spin />

  return (
    <div className="flex-1 flex flex-col gap-3 justify-between">
      <h1 className="text-2xl font-bold mb-4 text-center">{steps[currentStep]}</h1>
      <div className="flex-1">
        {currentStep === 1 && (
          <FirstStep lesson={lesson} vocabularies={vocabularies} setVocabularies={setVocabularies} />
        )}
        {currentStep === 2 && <SecondStep vocabularies={vocabularies} />}
        {currentStep === 3 && <ThirdStep lesson={lesson} vocabularies={vocabularies} />}
      </div>

      <div className="flex gap-3 justify-center">
        {currentStep > 1 && <AppButton onClick={handlePrevStep}>Prev Step</AppButton>}
        {currentStep === 3 ? (
          <AppButton onClick={() => {}}>Finish</AppButton>
        ) : (
          <AppButton onClick={handleNextStep}>Next Step</AppButton>
        )}
      </div>
    </div>
  )
}
