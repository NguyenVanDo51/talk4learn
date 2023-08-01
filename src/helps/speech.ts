const audio = new SpeechSynthesisUtterance()
let speeding = false
export const speak = (phrase: string, isVocabulary: boolean = true) => {
  if (speeding) return
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
  window.speechSynthesis.speak(audio)
}
