import React from "react";
import "./TimerControl.scss";

function TimerControl({ playBtnClick, audienceTime, minutes = 0, seconds, cancelClick}) {
  
  const padding = (num, pad = "0") => {
    num = parseInt(num);
    return num < 10 ? "0" + num : num;
  };

  return (
    <div className="timer-controls">
      <div className="title">Timer and Controls</div>
      <hr />
      <p className="timer">
        <span className="minute">{padding(minutes)} </span>
        <span className="seperator">:</span>
        <span className="seconds"> {padding(seconds)} </span>
        {/* <span className="presec">{padding(mseconds)}</span> */}
      </p>
      <div className="controls">
        <div className="btn play" onClick={playBtnClick}>
          <img src="/assets/codicon_debug-start.png" alt="Play" />
        </div>
        <div className="btn">
          <img src="/assets/ic_outline-cancel.png" alt="Cancel" onClick={cancelClick}/>
        </div>
        <div className="btn">
          <img src="/assets/lucide_timer-reset.png" alt="Stop Timer" />
        </div>
        <div className="btn">
          <img src="/assets/icon-park_stopwatch-start.png" alt="Start Timer" />
        </div>
        <div className="btn play audience" onClick={audienceTime}>
          <h1>Audience Time</h1>
        </div>
      </div>
    </div>
  );
}

export default TimerControl;
