import React from 'react'
import './event.scss'

function Event({message, timestamp}) {

    timestamp = Date.parse(timestamp);

    timestamp = timestamp.toDateString();
  return (
    <div className='event'>
        <div className="e-message">{message}</div>
        <div className="timestamp">{timestamp}</div>
    </div>
  )
}

export default Event