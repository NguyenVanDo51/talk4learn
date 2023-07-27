'use client'
import { useEffect, useState } from 'react'
import { IVocabulary } from '@/app/types/vocabulary'
import { AppButton } from '@/components/level1/AppButton'
import { Lesson, lessons } from '@/components/level3/VideoSelectionScreen'
import { Spin } from 'antd'
import { StepOne } from './components/StepOne'
import { SecondStep } from './components/SecondStep'

const steps: { [key in number]: string } = {
  1: 'Step 1: Watch the Video and Add Vocabulary',
  2: 'Step 2: Vocabulary List',
  3: 'Step 3: Listen and Transcribe',
}

export function LessonPractice({ id }: { id: number }) {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [lesson, setLesson] = useState<Lesson>()
  const [vocabularies, setVocabularies] = useState<IVocabulary[]>([])
  const [transcription, setTranscription] = useState<string>('')

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
    getLesson()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!lesson) return <Spin />

  return (
    <div className="container mx-auto p-4 h-[100vh] flex flex-col gap-3 justify-between">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4 text-center">{steps[currentStep]}</h1>

        {currentStep === 1 && <StepOne lesson={lesson} vocabularies={vocabularies} setVocabularies={setVocabularies} />}

        {currentStep === 2 && <SecondStep vocabularies={vocabularies} />}

        {currentStep === 3 && (
          <>
            {/* Video player component for transcription */}
            <video controls>
              <source src={lesson?.videoUrl} type="video/mp4" />
            </video>
            {/* Transcription textarea */}
            <div className="mt-4">
              <textarea
                placeholder="Transcribe what you hear..."
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
              />
            </div>
            {/* Finish button */}
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => {
                // Handle completion of the lesson, e.g., save transcription data
              }}
            >
              Finish
            </button>
          </>
        )}
      </div>

      <div className="flex gap-3 justify-center">
        {currentStep > 1 && <AppButton onClick={handlePrevStep}>Prev Step</AppButton>}
        <AppButton onClick={handleNextStep}>Next Step</AppButton>
      </div>
    </div>
  )
}
