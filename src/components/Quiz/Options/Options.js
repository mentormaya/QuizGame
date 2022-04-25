import React from 'react'
import Option from './Option/Option'

import './Options.scss'

function Options({options}) {
  return (
    <div className='options'>
      <Option option={options ? 'A)  '+ options.a : 'Option A'} classes={"option-a"}/>
      <Option option={options ? 'B)  '+ options.b : 'Option B'} classes={"option-b"}/>
      <Option option={options ? 'C)  '+ options.c : 'Option C'} classes={"option-c"}/>
      <Option option={options ? 'D)  '+ options.d : 'Option D'} classes={"option-d"}/>
    </div>
  )
}

export default Options