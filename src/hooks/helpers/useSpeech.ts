import { useCallback, useEffect, useState } from 'react'

let audio: any = null
if (typeof SpeechSynthesisUtterance !== 'undefined') audio = new SpeechSynthesisUtterance()

export const useSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    audio.onstart = () => {
      setIsPlaying(true)
    }
    audio.onend = () => {
      setIsPlaying(false)
    }
  }, [])

  const speak = (phrase: string, isVocabulary: boolean = true) => {
    audio.text = isVocabulary
      ? phrase
          .replace(/(\()(.*)(\))/, '')
          .replace(/(\[)(.*)(\])/, '')
          .replaceAll('  ', '')
      : phrase
    window.speechSynthesis.speak(audio)
  }

  const startSpeak = useCallback(
    (phrase: string, isVocabulary: boolean = true) => {
      if (isPlaying || !audio) return
      speak(phrase, isVocabulary)
    },
    [isPlaying]
  )

  const stopSpeak = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
  }, [])

  const reStart = (phrase: string, isVocabulary: boolean = true) => {
    stopSpeak()
    speak(phrase, isVocabulary)
  }

  return { isPlaying, startSpeak, stopSpeak, reStart }
}
