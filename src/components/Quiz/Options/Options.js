import React from 'react'
import Option from './Option/Option'

import './Options.scss'

function Options({options}) {
  return (
    <div className='options'>
      <Option option={"MyOption"} classes={"option-a"}/>
      <Option option={"MyOption"} classes={"option-b"}/>
      <Option option={"MyOption"} classes={"option-c"}/>
      <Option option={"MyOption"} classes={"option-d"}/>
    </div>
  )
}

export default Options