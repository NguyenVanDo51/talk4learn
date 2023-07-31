const audio = new SpeechSynthesisUtterance()
let speeding = false
export const speak = (phrase: string) => {
  if (speeding) return
  audio.text = phrase
    .replace(/(\()(.*)(\))/, '')
    .replace(/(\[)(.*)(\])/, '')
    .replaceAll('  ', '')

  audio.onstart = () => {
    speeding = true
  }
  audio.onend = () => {
    speeding = false
  }
  window.speechSynthesis.speak(audio)
}
