import { FC, useRef, useState } from 'react'
import { VocabularyList } from './VocabularyList'
import { Lesson } from '../../VideoSelectionScreen'
import { IVocabulary } from '@/app/types/vocabulary'
import { AppInput } from '@/components/level1/AppInput'
import { Button, Col, Form, Input, InputRef, Row } from 'antd'
import { uniqueId } from 'lodash'
import { FloatingLabel } from '@/components/level1/FloadingLabel'
import { AppButton } from '@/components/level1/AppButton'

interface IProps {
  lesson: Lesson
  vocabularies: IVocabulary[]
  setVocabularies: (vocabularies: IVocabulary[]) => void
}

export const StepOne: FC<IProps> = ({ lesson, vocabularies, setVocabularies }) => {
  const vocabularyRef = useRef<InputRef>()

  const [form] = Form.useForm()

  const handleAddVocabulary = (values: any) => {
    console.log('handleAddVocabulary', values)
    setVocabularies([
      ...vocabularies,
      {
        id: uniqueId(),
        ...values,
      },
    ])
    form.resetFields()
    setTimeout(() => {
      vocabularyRef.current?.focus()
    }, 0)
  }

  return (
    <div className="flex flex-col justify-between gap-3 h-full">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Step 1: Watch the Video and Add Vocabulary</h1>
        <Row gutter={[24, 24]} className="flex-1">
          <Col xs={24} xl={12} xxl={14}>
            <div className="h-full min-h-[40vh]">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
                title="Beginner Levddasdasels - Learn English through Oxford English video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </Col>

          <Col xs={24} xl={12} xxl={10}>
            <h2 className="text-xl font-medium">Your vocabularies: </h2>
            <VocabularyList vocabularies={vocabularies} />
          </Col>
        </Row>
      </div>

      <div className="flex gap-3 mt-4">
        <Form
          form={form}
          onFinish={handleAddVocabulary}
          layout="inline"
          className="grid w-full"
          style={{ gridTemplateColumns: 'auto auto 60px' }}
        >
          <FloatingLabel
            ref={vocabularyRef as any}
            name="en"
            rules={[{ required: true, message: '' }]}
            label="Vocabulary"
            form={form}
          />
          <FloatingLabel name="translated" rules={[{ required: true, message: '' }]} label="Meaning" form={form} />
          <AppButton htmlType="submit">Add</AppButton>
        </Form>
      </div>
    </div>
  )
}
