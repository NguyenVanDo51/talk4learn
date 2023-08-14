import { setTextSpeaking } from '@/redux/slices/appSlice'
import store from '@/redux/store'
import { VoiceDefault, Voices } from '@/types/constants/voices'

class Speaker {
  cancel = () => {
    store.dispatch(setTextSpeaking(''))
    responsiveVoice.cancel()
  }

  speak = (text: string, voice = VoiceDefault, options: ResponsiveVoiceOption = {}) => {
    const voicename = store.getState().setting.voice
    responsiveVoice.setDefaultVoice(Voices[voicename] || VoiceDefault)

    responsiveVoice.speak(text, Voices[voicename] || VoiceDefault, {
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
