import React from 'react'
import optionStyles from './Option.module.scss'

function Option({option, opt, checkOption, refer}) {
  return (
    <div ref={refer} className={`${optionStyles.option} ${opt === 'a' ? optionStyles.optionA : opt === 'b' ? optionStyles.optionB : opt === 'c' ? optionStyles.optionC : optionStyles.optionD}`} onClick={checkOption}>{option}</div>
  )
}

export default Option