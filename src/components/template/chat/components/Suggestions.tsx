import { FC, useContext, useReducer, useState } from 'react'
import { HelperBox } from './HelperBox'
import { ChatContext } from '../context'
import { AppButton } from '@/components/level1/antd/AppButton'
import { ChatService } from '../service'
import { AppSpin } from '@/components/level1/antd/AppSpin'

export const Suggestions: FC = () => {
  const { messages } = useContext(ChatContext)
  const [suggestion, setSuggestion] = useState(false)
  const [isGetting, setIsGetting] = useState(false)

  const getSuggestion = () => {
    setIsGetting(true)
    ChatService.getSuggestion(messages)
      .then((res) => {
        setSuggestion(res.data)
      })
      .finally(() => {
        setIsGetting(false)
      })
  }

  return (
    <HelperBox image="https://img.icons8.com/fluency/28/microsoft-tips.png" title="Gợi ý">
      {isGetting && <AppSpin className="mr-2" />}

      {suggestion ? (
        <span>{suggestion}</span>
      ) : (
        <AppButton type="link" onClick={getSuggestion} disabled={isGetting}>
          Nhận gợi ý
        </AppButton>
      )}
    </HelperBox>
  )
}
