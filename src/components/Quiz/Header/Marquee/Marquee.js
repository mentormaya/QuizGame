import React from "react";
import "./marquee.scss";

function Marquee({ message }) {
  return (
    <>
      <div className="message-container">
        <p className="message">{message}</p>
      </div>
    </>
  );
}

export default Marquee;
