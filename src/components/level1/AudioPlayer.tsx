import { useSpeech } from '@/hooks/helpers/useSpeech'
import { uniqueId } from 'lodash'
import { FC } from 'react'

interface IProps {
  text: string
  autoPlay?: boolean
}

export const AudioPlayer: FC<IProps> = ({ text }) => {
  const { isPlaying, startSpeak, stopSpeak } = useSpeech()

  const onClick = () => {
    if (isPlaying) {
      stopSpeak()
    } else {
      startSpeak(text, false)
    }
  }
  const id = uniqueId()
  console.log('isPlaying', isPlaying)
  const waveLength = Math.floor(text?.length / 1.5) || 1
  return (
    <div className="flex gap-3 items-center cursor-pointer" onClick={onClick}>
      <span className="cursor-pointer">
        {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
      </span>

      <div className={`sound-wave ${isPlaying ? 'playing' : ''}`}>
        {new Array(waveLength >= 50 ? 50 : waveLength).fill(null).map((_, index) => (
          <span key={`${id}_${index}`} className="sound-wave-bar"></span>
        ))}
      </div>
    </div>
  )
}
