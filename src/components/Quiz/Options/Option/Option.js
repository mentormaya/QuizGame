import React from 'react'
import './Option.scss'

function Option({option, classes, checkOption, refer}) {
    classes = 'option ' + classes
  return (
    <div ref={refer} className={classes} onClick={checkOption}>{option}</div>
  )
}

export default Option