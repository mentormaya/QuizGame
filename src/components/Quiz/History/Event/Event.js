import React from 'react'
import './event.scss'

function Event({message, timestamp}) {

    let ts = timestamp.toString().split(" ")

    ts = `${ts[0]}, ${ts[1]} ${ts[2]}, ${ts[3]} ${ts[4]} ${ts[4].split(':')[0] >= 12 ? "PM" : "AM"}`
    
    // console.log(ts)

  return (
    <div className='event'>
        <div className="e-message">{message}</div>
        <div className="timestamp">{ts}</div>
    </div>
  )
}

export default Event