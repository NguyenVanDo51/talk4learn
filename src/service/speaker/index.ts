import { useSettings } from "@/hooks/helpers/use-settings"
import { useSpeech } from "@/hooks/helpers/use-speech"
import { VoiceDefault, Voices } from "@/types/constants/voices"

class Speaker {
  cancel = () => {
    useSpeech.getState().setTextSpeaking("")
    responsiveVoice.cancel()
  }

  speak = (text: string, options: ResponsiveVoiceOption = {}) => {
    const setting = useSettings.getState().settings
    const voicename = setting.voice ? Voices[setting.voice] : VoiceDefault
    const { speed } = setting

    try {
      SpeakerService.cancel()
      responsiveVoice.speak(text, voicename, {
        ...options,
        rate: speed || 1,
        onstart: () => {
          useSpeech.getState().setTextSpeaking(text)
        },
        onend: () => {
          useSpeech.getState().setTextSpeaking("")
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
