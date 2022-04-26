import React from "react";
import Event from "./Event/Event";

import "./History.scss";

function History({events}) {
  // console.log(events)
  events = events.reverse()
  // console.log(events)
  return (
    <div className="history">
      <div className="title">History</div>
      <hr />
      <div className="events">
        { events.map( (event, index) => (
          <Event message={event.msg} timestamp={event.timestamp} key={index}/>
        ))}
      </div>
    </div>
  );
}

export default History;
