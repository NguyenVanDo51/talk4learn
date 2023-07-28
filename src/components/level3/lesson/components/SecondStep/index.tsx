import { IVocabulary } from '@/types/vocabulary'
import { Col, Row } from 'antd'
import { FC } from 'react'
import { VocabularyList } from '../VocabularyList'
import { FlashCardPractice } from './FlashCardPractice'

interface IProps {
  vocabularies: IVocabulary[]
}

export const SecondStep: FC<IProps> = ({ vocabularies }) => {
  return (
    <>
      <Row className="h-full">
        <Col xs={24} lg={12}>
          <VocabularyList vocabularies={vocabularies} />
        </Col>
        <Col xs={24} lg={12} className="h-full">
          <FlashCardPractice vocabularies={vocabularies} />
        </Col>
      </Row>
    </>
  )
}
