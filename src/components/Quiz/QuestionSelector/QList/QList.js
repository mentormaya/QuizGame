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
    <ul className='q-list'>
        {generateList(total)}
    </ul>
  )
}

export default QList