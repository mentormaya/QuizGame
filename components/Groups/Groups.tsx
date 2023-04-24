import React from 'react'
import Group from './Group/Group'

import groupsStyles from './Groups.module.scss'


function Groups({groups}) {
  return (
    <div className={groupsStyles.groups} key={"groups"}>
      <div className={groupsStyles.title}>Groups</div>
      <hr />
      { groups?.map( group => (
        <Group  key={group.id} name={group.name} id={group.id} score={group.score} active={group.turn}/>
      ))}
    </div>
  )
}

export default Groups