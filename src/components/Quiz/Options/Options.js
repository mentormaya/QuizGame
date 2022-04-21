import React from 'react'
import Option from './Option/Option'

import './Options.scss'

function Options({options}) {
  return (
    <div className='options'>
      <Option option={options ? options.a : 'Option A'} classes={"option-a"}/>
      <Option option={options ? options.b : 'Option B'} classes={"option-b"}/>
      <Option option={options ? options.c : 'Option C'} classes={"option-c"}/>
      <Option option={options ? options.d : 'Option D'} classes={"option-d"}/>
    </div>
  )
}

export default Options