import { useSpeech } from '@/hooks/helpers/useSpeech'
import { uniqueId } from 'lodash'
import { ForwardRefExoticComponent, RefAttributes, forwardRef, useImperativeHandle } from 'react'

interface IProps {
  text: string
  autoPlay?: boolean
}

export interface IAudioPlayerRef {
  startSpeak: () => void
}

export const AudioPlayer: ForwardRefExoticComponent<IProps & RefAttributes<unknown>> = forwardRef(function AudioPlayer(
  { text }: IProps,
  ref: any
) {
  const { isPlaying, startSpeak, stopSpeak } = useSpeech()

  const onClick = () => {
    if (isPlaying) {
      stopSpeak()
    } else {
      startSpeak(text, false)
    }
  }

  useImperativeHandle(
    ref,
    (): IAudioPlayerRef => ({
      startSpeak: onClick,
    })
  )

  const id = uniqueId()
  const waveLength = Math.floor(text?.length / 1.5) || 1

  return (
    <div className="flex gap-3 items-center cursor-pointer overflow-hidden" onClick={onClick}>
      <span className="cursor-pointer inline-block w-3">
        {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
      </span>

      <div className={`sound-wave ${isPlaying ? 'playing' : ''}`}>
        {new Array(waveLength >= 50 ? 50 : waveLength).fill(null).map((_, index) => (
          <span key={`${id}_${index}`} className="sound-wave-bar"></span>
        ))}
      </div>
    </div>
  )
})
