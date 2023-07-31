const msg = new SpeechSynthesisUtterance()

export const speak = (phrase: string) => {
  msg.text = phrase
    .replace(/(\()(.*)(\))/, '')
    .replace(/(\[)(.*)(\])/, '')
    .replaceAll('  ', '')
  window.speechSynthesis.speak(msg)
}
