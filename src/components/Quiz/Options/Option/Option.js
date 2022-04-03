import React from 'react'
import './Option.scss'

function Option({option, classes}) {
    classes = 'option ' + classes
  return (
    <div className={classes}>{option}</div>
  )
}

export default Option