import React from 'react'
import './QList.scss'


const generateList = (total, selectQuestion) => {
    let list = [];
    for (let index = 1; index <= total; index++) {
        list.push(<li key = {index} onClick={() => selectQuestion(index)}>{index}</li>)
    }
    return list
}

function QList({total, selectQuestion}) {
  return (
    <div className='q-list'>
      <ul>
        {generateList(total, selectQuestion)}
    </ul>
    </div>
  )
}

export default QList