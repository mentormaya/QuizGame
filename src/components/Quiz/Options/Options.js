import React from 'react'
import Option from './Option/Option'

import './Options.scss'

function Options({options, checkOption, optionA, optionB, optionC, optionD}) {
  return (
    <div className='options'>
      <Option option={options ? 'A)  '+ options.a : 'Option A'} classes={"option-a"} checkOption={checkOption} refer={optionA}/>
      <Option option={options ? 'B)  '+ options.b : 'Option B'} classes={"option-b"} checkOption={checkOption} refer={optionB}/>
      <Option option={options ? 'C)  '+ options.c : 'Option C'} classes={"option-c"} checkOption={checkOption} refer={optionC}/>
      <Option option={options ? 'D)  '+ options.d : 'Option D'} classes={"option-d"} checkOption={checkOption} refer={optionD}/>
    </div>
  )
}

export default Options