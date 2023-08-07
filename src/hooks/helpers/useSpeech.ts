import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux'
import { IAppSlice, setTextSpeaking } from '@/redux/slices/appSlice'

let audio: null | SpeechSynthesisUtterance = null
if (typeof SpeechSynthesisUtterance !== 'undefined' && !audio) audio = new SpeechSynthesisUtterance()

export const useSpeech = () => {
  // nếu có nhiều thằng gọi, đây chỉ là status chung, ko phân biệt đc thằng nào đang đc speak
  const dispatch = useAppDispatch()
  const textSpeaking = useAppSelector((state) => state.app.textSpeaking)

  const setTextSpeakingState = useCallback(
    (value: IAppSlice['textSpeaking']) => {
      dispatch(setTextSpeaking(value))
    },
    [dispatch]
  )

  const speak = useCallback((phrase: string) => {
    audio!.text = phrase
    window.speechSynthesis.speak(audio!)
  }, [])

  useEffect(() => {
    if (!audio) return

    audio.onend = () => {
      setTextSpeakingState(null)
    }
    audio.onerror = () => {
      setTextSpeakingState(null)
    }
  }, [setTextSpeakingState])

  useEffect(() => {
    if (!textSpeaking) return

    window.speechSynthesis.cancel()
    speak(atob(textSpeaking))
  }, [textSpeaking, speak])

  return {}
}
