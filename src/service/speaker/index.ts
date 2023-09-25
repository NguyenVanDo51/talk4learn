import { setTextSpeaking } from '@/redux/slices/appSlice'
import store from '@/redux/store'
import { VoiceDefault, Voices } from '@/types/constants/voices'

class Speaker {
  cancel = () => {
    store.dispatch(setTextSpeaking(''))
    responsiveVoice.cancel()
  }

  speak = (text: string, options: ResponsiveVoiceOption = {}) => {
    const setting = store.getState().setting
    const voicename = setting.voice || VoiceDefault
    const { speed } = setting
    responsiveVoice.setDefaultVoice(Voices[voicename])
    try {
      responsiveVoice.speak(text, Voices[voicename], {
        ...options,
        rate: speed || 1,
        onstart: () => {
          store.dispatch(setTextSpeaking(text))
        },
        onend: () => {
          store.dispatch(setTextSpeaking(''))
        },
      })
    } catch {
      responsiveVoice.speak(text, Voices[voicename], {
        ...options,
        rate: speed || 1,
        onstart: () => {
          store.dispatch(setTextSpeaking(text))
        },
        onend: () => {
          store.dispatch(setTextSpeaking(''))
        },
      })
    }
  }

  speakFree = (text: string, voice: string = VoiceDefault) => {
    responsiveVoice.speak(text, voice)
  }
}

export const SpeakerService = new Speaker()
