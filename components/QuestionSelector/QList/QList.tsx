import React from 'react'
import qListStyles from './QList.module.scss'

const generateList = (total, selectQuestion) => {
    let list = [];
    for (let index = 1; index <= total; index++) {
        list.push(<li key = {index} onClick={() => selectQuestion(index)}>{index}</li>)
    }
    return list
}

function QList({questions, selectQuestion}) {
  return (
    <div className={qListStyles.qList}>
      <ul>
        {/* {generateList(total, selectQuestion)} */}
        {questions.map((question) => {
          return <li key = {question.id} className={question.published ? qListStyles.passed : ''} onClick={() => selectQuestion(question.id)}>{question.id}</li>
        })}
    </ul>
    </div>
  )
}

export default QList