import { setTextSpeaking } from "@/redux/slices/appSlice"
import store from "@/redux/store"
import { VoiceDefault, Voices } from "@/types/constants/voices"

class Speaker {
  cancel = () => {
    store.dispatch(setTextSpeaking(""))
    responsiveVoice.cancel()
  }

  speak = (text: string, options: ResponsiveVoiceOption = {}) => {
    const setting = store.getState().setting
    const voicename = setting.voice ? Voices[setting.voice] : VoiceDefault
    const { speed } = setting

    try {
      responsiveVoice.speak(text, voicename, {
        ...options,
        rate: speed || 1,
        onstart: () => {
          store.dispatch(setTextSpeaking(text))
        },
        onend: () => {
          store.dispatch(setTextSpeaking(""))
          options?.onend?.()
        },
      })
    } catch (e) {
      console.log(e)
      options?.onend?.()
    }
  }

  speakFree = (text: string, voice: string = VoiceDefault) => {
    responsiveVoice.speak(text, voice)
  }
}

export const SpeakerService = new Speaker()
