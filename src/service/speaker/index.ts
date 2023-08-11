import { setTextSpeaking } from '@/redux/slices/appSlice'
import store from '@/redux/store'
import { Voices } from '@/types/constants/voices'

class Speaker {
  cancel = () => {
    store.dispatch(setTextSpeaking(''))
    responsiveVoice.cancel()
  }

  speak = (text: string, voice = Voices.Default, options: ResponsiveVoiceOption = {}) => {
    responsiveVoice.speak(text, voice, {
      ...options,
      onstart: () => {
        store.dispatch(setTextSpeaking(text))
      },
      onend: () => {
        store.dispatch(setTextSpeaking(''))
      },
    })
  }
}

export const SpeakerService = new Speaker()
