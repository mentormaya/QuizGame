import React from 'react'
import './Group.scss'

function Group({name = "Group", score = 0, active = false, id}) {
    let classes = "turn-indicator";
    classes = classes + (active ?  " turn" : '');
  return (
    <div className='group' id={id}>
        <div className="score">{score}</div>
        <h1 className="group-name">{name}</h1>
        <div className="turn-container">
            <div className={classes}></div>
        </div>
    </div>
  )
}

export default Group