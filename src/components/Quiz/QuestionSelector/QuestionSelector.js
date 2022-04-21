import React from 'react'
import QList from './QList/QList'
import './QuestionSelector.scss'

function QuestionSelector({count, selectQuestion}) {
  return (
    <div className='question-selector'>
      <h2>Question Selector : <span className='badge badge-success'>{count}</span></h2>
      <hr />
      <QList total={count} selectQuestion={selectQuestion}/>
    </div>
  )
}

export default QuestionSelector