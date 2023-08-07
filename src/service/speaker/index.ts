class Speaker {
  audio: any

  constructor() {
    if (typeof SpeechSynthesisUtterance !== 'undefined' && !this.audio) this.audio = new SpeechSynthesisUtterance()
  }

  speak = (phrase: string, isVocabulary: boolean = true) => {
    this.audio.text = isVocabulary
      ? phrase
          .replace(/(\()(.*)(\))/, '')
          .replace(/(\[)(.*)(\])/, '')
          .replaceAll('  ', '')
      : phrase
    window.speechSynthesis.speak(this.audio)
  }

  startSpeak = (phrase: string, isVocabulary: boolean = true) => {
    this.speak(phrase, isVocabulary)
  }

  stopSpeak = () => {
    window.speechSynthesis.cancel()
  }
}
