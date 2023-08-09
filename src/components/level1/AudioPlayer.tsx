import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { IAppSlice, setTextSpeaking } from '@/redux/slices/appSlice'
import { uniqueId } from 'lodash'
import { useCallback, useEffect, useMemo } from 'react'

interface IProps {
  text: string
}

export interface IAudioPlayerRef {
  startSpeak: () => void
}

export const AudioPlayer = ({ text }: IProps) => {
  const dispatch = useAppDispatch()
  const textSpeaking = useAppSelector((state) => state.app.textSpeaking)

  const isPlaying = useMemo(() => text === textSpeaking, [textSpeaking, text])

  const setGlobalPlayingState = useCallback(
    (value: IAppSlice['textSpeaking']) => {
      dispatch(setTextSpeaking(value))
    },
    [dispatch]
  )

  const onClick = () => {
    if (isPlaying) {
      setGlobalPlayingState(null)
    } else {
      setGlobalPlayingState(text)
    }
  }

  useEffect(() => {
    setGlobalPlayingState(text)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const id = useMemo(() => uniqueId(), [])
  const waveLength = Math.floor(text?.length / 1.5) || 1

  return (
    <div className="flex gap-3 items-center cursor-pointer overflow-hidden" onClick={onClick}>
      <span className="cursor-pointer inline-block w-3">
        {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
      </span>

      <div className={`sound-wave ${isPlaying ? 'playing' : ''}`}>
        {new Array(waveLength >= 50 ? 50 : waveLength).fill(null).map((_, index) => (
          <span key={`node_${id}_${index}`} className="sound-wave-bar"></span>
        ))}
      </div>
    </div>
  )
}
