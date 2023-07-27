import { FC, ReactNode } from 'react'

interface IProps {
  front: ReactNode
  back: ReactNode
}

export const FlastCard: FC<IProps> = ({ back, front }) => {
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
