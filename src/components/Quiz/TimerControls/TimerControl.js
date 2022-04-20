import React from "react";
import "./TimerControl.scss";

function TimerControl() {
  return (
    <div className="timer-controls">
      <div className="title">Timer and Controls</div>
      <hr />
      <p className="timer">
        <span className="minute">00 </span>
        <span className="seperator">:</span>
        <span className="seconds"> 00 </span>
        <span className="presec">00</span>
      </p>
      <div className="controls">
        <div className="btn play">
          <img src="/assets/codicon_debug-start.png" alt="Play" />
        </div>
        <div className="btn">
          <img src="/assets/ic_outline-cancel.png" alt="Cancel" />
        </div>
        <div className="btn">
          <img src="/assets/lucide_timer-reset.png" alt="Stop Timer" />
        </div>
        <div className="btn">
          <img src="/assets/icon-park_stopwatch-start.png" alt="Start Timer" />
        </div>
      </div>
    </div>
  );
}

export default TimerControl;
