import { speak } from '@/helps/speech'
import { FC, ReactNode, useEffect } from 'react'

interface IProps {
  front: ReactNode
  back: ReactNode
}

export const FlashCard: FC<IProps> = ({ back, front }) => {
  useEffect(() => {
    speak(String(front))
  }, [front])

  return (
    <div className="flashcard-container">
      <div className="flashcard">
        <div className="question">
          <div className="content">{front}</div>
        </div>

        <div className="answer">
          <div className="content">{back}</div>
        </div>
      </div>
    </div>
  )
}