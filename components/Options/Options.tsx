import React from 'react'
import Option from './Option/Option'

import optionsStyles from './Options.module.scss'

function Options({options, checkOption, optionA, optionB, optionC, optionD}) {
  return (
    <div className={optionsStyles.options}>
      <Option option={options ? 'A)  '+ options.a : 'Option A'} classes='a' checkOption={checkOption} refer={optionA}/>
      <Option option={options ? 'B)  '+ options.b : 'Option B'} classes='b' checkOption={checkOption} refer={optionB}/>
      <Option option={options ? 'C)  '+ options.c : 'Option C'} classes='c' checkOption={checkOption} refer={optionC}/>
      <Option option={options ? 'D)  '+ options.d : 'Option D'} classes='d' checkOption={checkOption} refer={optionD}/>
    </div>
  )
}

export default Options