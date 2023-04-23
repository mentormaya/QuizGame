import React from 'react'
import eventStyles from './Event.module.scss'

function Event({message, timestamp}) {

    let ts = timestamp.toString().split(" ")

    ts = `${ts[0]}, ${ts[1]} ${ts[2]}, ${ts[3]} ${ts[4]} ${ts[4].split(':')[0] >= 12 ? "PM" : "AM"}`
    
    // console.log(ts)

  return (
    <div className={eventStyles.event}>
        <div className={eventStyles.eMessage}>{message}</div>
        <div className={eventStyles.timestamp}>{ts}</div>
    </div>
  )
}

export default Event