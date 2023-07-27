import { FC, useRef } from 'react'
import { VocabularyList } from './VocabularyList'
import { Lesson } from '../../VideoSelectionScreen'
import { IVocabulary } from '@/types/vocabulary'
import { Col, Form, InputRef, Row } from 'antd'
import { uniqueId } from 'lodash'
import { FloatingLabel } from '@/components/level1/FloatingLabel'
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

  const onDeleteVocabulary = (id: IVocabulary['id']) => {
    setVocabularies([...vocabularies].filter((v) => v.id !== id))
  }

  return (
    <div className="flex flex-col justify-between gap-3 h-full">
      <div className="flex-1">
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
            <h2 className="text-2xl font-medium mb-3">Your vocabularies: </h2>
            <VocabularyList vocabularies={vocabularies} onDeleteVocabulary={onDeleteVocabulary} />
          </Col>
        </Row>
      </div>

      <div className="flex gap-3 mt-4">
        <Form
          form={form}
          onFinish={handleAddVocabulary}
          layout="inline"
          className="grid w-full"
          style={{ gridTemplateColumns: 'auto auto 200px' }}
        >
          <FloatingLabel
            ref={vocabularyRef as any}
            name="en"
            rules={[{ required: true, message: '' }]}
            label="Vocabulary"
            form={form}
          />
          <FloatingLabel name="translated" rules={[{ required: true, message: '' }]} label="Meaning" form={form} />
          <AppButton htmlType="submit">Add Your vocabulary</AppButton>
        </Form>
      </div>
    </div>
  )
}
