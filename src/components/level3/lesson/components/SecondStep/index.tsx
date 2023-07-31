import { IVocabulary } from '@/types/vocabulary'
import { Card, Col, Collapse, Row } from 'antd'
import { FC, useEffect, useState } from 'react'
import { VocabularyList } from '../VocabularyList'
import { FlashCardPractice } from './FlashCardPractice'

interface IProps {
  vocabularies: IVocabulary[]
}

export const SecondStep: FC<IProps> = ({ vocabularies }) => {
  const [duringPractice, setDuringPractice] = useState(false)
  const [activeKey, setActiveKey] = useState(['1'])

  console.log('key', activeKey)

  return (
    <>
      <Row className="h-full" gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Collapse
            collapsible={duringPractice ? 'disabled' : undefined}
            activeKey={duringPractice ? -1 : activeKey}
            onChange={(key) => setActiveKey(key as string[])}
            items={[
              {
                key: '1',
                label: 'Your vocabularies',
                children: <VocabularyList vocabularies={vocabularies} />,
              },
            ]}
          />
        </Col>
        <Col xs={24} lg={12} className="h-full">
          <Collapse
            expandIcon={() => null}
            activeKey={1}
            items={[
              {
                key: 1,
                label: 'Practice with flashcard',
                children: <FlashCardPractice vocabularies={vocabularies} setDuringPractice={setDuringPractice} />,
              },
            ]}
          ></Collapse>
        </Col>
      </Row>
    </>
  )
}
