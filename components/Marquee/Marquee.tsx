import React from "react";
import "./Marquee.module.scss";

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