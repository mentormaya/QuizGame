import React from 'react'
import QList from './QList/QList'
import './QuestionSelector.module.scss'

function QuestionSelector({questions, selectQuestion}) {
  return (
    <div className='question-selector'>
      <h2>Question Selector : <span className='badge badge-success'>{questions.length}</span></h2>
      <hr />
      <QList questions={questions} selectQuestion={selectQuestion}/>
    </div>
  )
}

export default QuestionSelector