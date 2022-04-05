import React from 'react'
import Group from './Group/Group'

import './Groups.scss'


function Groups() {
  return (
    <div className="groups">
      <div className="title">Groups</div>
      <Group name='Janaki'/>
      <Group name='Janak Nandini' active={true}/>
      <Group name='Sita'/>
      <Group name='Vaidehi'/>
    </div>
  )
}

export default Groups