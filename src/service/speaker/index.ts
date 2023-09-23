import { setTextSpeaking } from '@/redux/slices/appSlice'
import store from '@/redux/store'
import { VoiceDefault, Voices } from '@/types/constants/voices'

class Speaker {
  cancel = () => {
    store.dispatch(setTextSpeaking(''))
    responsiveVoice.cancel()
  }

  speak = (text: string, voice = VoiceDefault, options: ResponsiveVoiceOption = {}) => {
    const setting = store.getState().setting
    const voicename = setting.voice
    const { speed } = setting
    responsiveVoice.setDefaultVoice(Voices[voicename] || VoiceDefault)
    responsiveVoice.speak(text, Voices[voicename] || VoiceDefault, {
      ...options,
      rate: speed,
      onstart: () => {
        store.dispatch(setTextSpeaking(text))
      },
      onend: () => {
        store.dispatch(setTextSpeaking(''))
      },
    })
  }

  speakFree = (text: string, voice: string) => {
    responsiveVoice.setDefaultVoice(voice)
    responsiveVoice.speak(text)
  }
}

export const SpeakerService = new Speaker()
