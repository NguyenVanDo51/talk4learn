import { FC, useEffect, useRef } from 'react'
import { VocabularyList } from '../VocabularyList'
import { Lesson } from '../../../VideoSelectionScreen'
import { IVocabulary } from '@/types/vocabulary'
import { Card, Col, Form, InputRef, Row } from 'antd'
import { uniqueId } from 'lodash'
import { FloatingLabel } from '@/components/level1/FloatingLabel'
import { AppButton } from '@/components/level1/AppButton'

interface IProps {
  lesson: Lesson
  vocabularies: IVocabulary[]
  setVocabularies: (vocabularies: IVocabulary[]) => void
}

export const FirstStep: FC<IProps> = ({ lesson, vocabularies, setVocabularies }) => {
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

  useEffect(() => {
    if (vocabularies.length > 0) {
      console.log('vocabularies.at(-1)', vocabularies.at(-1)?.id)
      setTimeout(() => {
        document.getElementById(vocabularies.at(-1)?.id as string)?.scrollIntoView()
      }, 100)
    }
  }, [vocabularies])

  return (
    <div className="flex flex-col justify-between gap-3 h-full">
      <div className="flex-1">
        <Row gutter={[24, 24]} className="flex-1">
          <Col xs={24} lg={24} xxl={12}>
            <div className="h-full min-h-[50vh] max-h-[50vh]">
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

          <Col xs={24} lg={16}>
            <Card title="Subtitle" bodyStyle={{ maxHeight: '80vh', overflow: 'auto' }}>
              <p>{lesson.textTranscription}</p>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Your vocabularies" bodyStyle={{ maxHeight: '80vh', overflow: 'auto' }} id="vocabulary">
              <VocabularyList vocabularies={vocabularies} onDeleteVocabulary={onDeleteVocabulary} />
            </Card>
            <Form
              form={form}
              onFinish={handleAddVocabulary}
              layout="inline"
              className="grid w-full mt-4"
              style={{ gridTemplateColumns: 'auto auto 80px' }}
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
          </Col>
        </Row>
      </div>
    </div>
  )
}
