import React from 'react'
import './QList.scss'


const generateList = (total) => {
    let list = [];
    for (let index = 1; index <= total; index++) {
        list.push(<li key = {index}>{index}</li>)
    }
    return list
}

function QList({total}) {
  return (
    <div className='q-list'>
      <ul>
        {generateList(total)}
    </ul>
    </div>
  )
}

export default QList