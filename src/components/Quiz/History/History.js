import React from "react";
import Event from "./Event/Event";

import "./History.scss";

function History() {
  let datetime = new Date();
  return (
    <div className="history">
      <div className="title">History</div>
      <div className="events">
        <Event message={"This is the random message1"} timestamp={datetime} />
        <Event message={"This is the random message2"} timestamp={datetime} />
        <Event message={"This is the random message3"} timestamp={datetime} />
        <Event message={"This is the random message4"} timestamp={datetime} />
        <Event message={"This is the random message5"} timestamp={datetime} />
        <Event message={"This is the random message6"} timestamp={datetime} />
        <Event message={"This is the random message7"} timestamp={datetime} />
        <Event message={"This is the random message8"} timestamp={datetime} />
        <Event message={"This is the random message9"} timestamp={datetime} />
        <Event message={"This is the random message10"} timestamp={datetime} />
        <Event message={"This is the random message11"} timestamp={datetime} />
        <Event message={"This is the random message12"} timestamp={datetime} />
      </div>
    </div>
  );
}

export default History;
