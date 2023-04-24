import React from 'react'
import groupStyles from './Group.module.scss'

function Group({ name = "Group", score = 0, active = false, id = '' }) {
    return (
        <div className={groupStyles.group} key={id} id={id}>
            <div className={groupStyles.score}>{score}</div>
            <h1 className={groupStyles.groupName}>{name}</h1>
            <div className={groupStyles.turnContainer}>
                <div key={id} className={ active ? `${groupStyles.turnIndicator} ${groupStyles.turn}` : groupStyles.turnIndicator }></div>
            </div>
        </div>
    )
}
export default Group