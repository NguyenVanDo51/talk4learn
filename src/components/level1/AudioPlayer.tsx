import { useSpeech } from '@/hooks/helpers/useSpeech'
import { FC, useState } from 'react'

interface IProps {
  text: string
}

export const AudioPlayer: FC<IProps> = ({ text }) => {
  const { isPlaying, startSpeak, stopSpeak, reStart } = useSpeech()

  const play = () => {
    startSpeak(text, false)
  }

  const handleStop = () => {
    stopSpeak()
  }

  return (
    <div>
      <span className="cursor-pointer inline-flex gap-3">
        {isPlaying ? (
          <i className="fa-solid fa-pause" onClick={handleStop}></i>
        ) : (
          <i className="fa-solid fa-play" onClick={play}></i>
        )}

        <i className="fa-solid fa-rotate-left" onClick={() => reStart(text, false)}></i>
      </span>
    </div>
  )
}
