import React from 'react'
import Group from './Group/Group'

import './Groups.scss'


function Groups({groups}) {
  return (
    <div className="groups">
      <div className="title">Groups</div>
      <hr />
      { groups.map( group => (
        <Group name={group.group_name} key={group.group_id} id={group.group_id} score={group.score} active={group.turn}/>
      ))}
    </div>
  )
}

export default Groups