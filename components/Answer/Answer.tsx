import React from 'react'
import answerStyles from './Answer.module.scss'

function Answer({answer, checkOption}) {
  return (
    <div className={answerStyles.options}>
      <div className={`${answerStyles.option}`} onClick={checkOption}>{answer}</div>
    </div>
  )
}

export default Answer