'use client'

let audio: any = null

if (typeof SpeechSynthesisUtterance !== 'undefined') audio = new SpeechSynthesisUtterance()
let speeding = false

export const speak = (phrase: string, isVocabulary: boolean = true) => {
  if (speeding || !audio) return
  
  audio.text = isVocabulary
    ? phrase
        .replace(/(\()(.*)(\))/, '')
        .replace(/(\[)(.*)(\])/, '')
        .replaceAll('  ', '')
    : phrase

  audio.onstart = () => {
    speeding = true
  }
  audio.onend = () => {
    speeding = false
  }
  if (typeof window !== 'undefined') {
    window.speechSynthesis.speak(audio)
  }
}
