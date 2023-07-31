import { Lesson } from '@/components/level3/VideoSelectionScreen'
import { UITheme } from '@/theme/themeConfig'
import { Col, Input, Row } from 'antd'
import { FC, MutableRefObject, Ref, RefObject, useEffect, useRef, useState } from 'react'
import { VocabularyList } from '../VocabularyList'
import { IVocabulary } from '@/types/vocabulary'
import { AppCard } from '@/components/level1/AppCard'
import ReactPlayer from 'react-player'
import { AppVideo } from '@/components/level1/AppVideo'
import { TextAreaRef } from 'antd/es/input/TextArea'

interface IProps {
  lesson: Lesson
  vocabularies: IVocabulary[]
}

let interval: any = null

export const ThirdStep: FC<IProps> = ({ lesson, vocabularies }) => {
  const key = `subtitle_${lesson.id}`
  const [transcription, setTranscription] = useState<string>(localStorage.getItem(key) ?? '')
  const ref: MutableRefObject<TextAreaRef | undefined> = useRef()

  useEffect(() => {
    clearInterval(interval)
    interval = setTimeout(() => {
      localStorage.setItem(key, transcription)
    }, 5000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcription])

  return (
    <>
      <Row gutter={[UITheme.space.large, UITheme.space.large]}>
        <Col xs={24} md={12} className="min-h-[40vh] max-h-[50vh]">
          <AppVideo url={`https://www.youtube.com/watch?v=${lesson.youtubeId}`} />
        </Col>

        <Col xs={24} md={12}>
          <AppCard>
            <VocabularyList vocabularies={vocabularies} />
          </AppCard>
        </Col>

        <Col xs={24} className="min-h-[40vh]">
          <Input.TextArea
            ref={ref as any}
            className="!h-full w-full"
            placeholder="Transcribe what you hear..."
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
          />
        </Col>
      </Row>
    </>
  )
}
