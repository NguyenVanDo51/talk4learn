'use client'

let audio: null | SpeechSynthesisUtterance = null

if (SpeechSynthesisUtterance) audio = new SpeechSynthesisUtterance()
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
  if (window) {
    window.speechSynthesis.speak(audio)
  }
}
