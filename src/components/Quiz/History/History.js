import React from 'react'
import Event from './Event/Event'

import './History.scss'

function History() {
  let datetime = new Date();
  return (
    <div className="history">
      <Event message={"This is the random message"} timestamp = {datetime}/>
      <Event message={"This is the random message"} timestamp = {datetime}/>
      <Event message={"This is the random message"} timestamp = {datetime}/>
    </div>
  )
}

export default History