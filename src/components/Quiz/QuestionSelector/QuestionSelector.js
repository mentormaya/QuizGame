import React from 'react'
import QList from './QList/QList'
import './QuestionSelector.scss'

function QuestionSelector({count}) {
  return (
    <div className='question-selector'>
      <h2>Question Selector : {count}</h2>
      <hr />
      <QList total={count}/>
    </div>
  )
}

export default QuestionSelector