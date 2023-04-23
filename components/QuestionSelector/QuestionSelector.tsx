import React from 'react'
import QList from './QList/QList'
import questionSelectorStyles from './QuestionSelector.module.scss'

import quizStyles from '../Quiz.module.scss'

function QuestionSelector({questions, selectQuestion}) {
  return (
    <div className={questionSelectorStyles.questionSelector}>
      <h2>Question Selector : <span className={`${quizStyles.badge} ${quizStyles.badgeSuccess}`}>{questions.length}</span></h2>
      <hr />
      <QList questions={questions} selectQuestion={selectQuestion}/>
    </div>
  )
}

export default QuestionSelector