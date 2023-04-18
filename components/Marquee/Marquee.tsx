import React from "react";
import marqueeStyle from "./Marquee.module.scss";

function Marquee({ message }) {
  return (
    <>
      <div className={marqueeStyle.messageContainer}>
        <p className={marqueeStyle.message}>{message}</p>
      </div>
    </>
  );
}

export default Marquee;