import React from "react";
import Event from "./Event/Event";

import historyStyles from "./History.module.scss";

function History({events}) {
  // console.log(events)
  events = events.reverse()
  // console.log(events)
  return (
    <div className={historyStyles.history}>
      <div className={historyStyles.title}>History</div>
      <hr />
      <div className={historyStyles.events}>
        { events.map( (event, index) => (
          <Event message={event.msg} timestamp={event.timestamp} key={index}/>
        ))}
      </div>
    </div>
  );
}

export default History;