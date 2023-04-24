import React from "react";
import Image from "next/image"
import timerControlStyles from "./TimerControl.module.scss";

import playBtn from "../../public/assets/codicon_debug-start.png"
import cancelBtn from "../../public/assets/ic_outline-cancel.png"
import stopTimer from "../../public/assets/lucide_timer-reset.png"
import startTimer from "../../public/assets/icon-park_stopwatch-start.png"

function TimerControl({ playBtnClick, audienceTime, minutes = 0, seconds, cancelClick}) {
  
  const padding = (num, pad = "0") => {
    num = parseInt(num);
    return num < 10 ? "0" + num : num;
  };

  return (
    <div className={timerControlStyles.timerControls}>
      <div className={timerControlStyles.title}>Timer and Controls</div>
      <hr />
      <p className={timerControlStyles.timer}>
        <span className={timerControlStyles.minute}>{padding(minutes)} </span>
        <span className={timerControlStyles.seperator}>:</span>
        <span className={timerControlStyles.seconds}> {padding(seconds)} </span>
        {/* <span className="presec">{padding(mseconds)}</span> */}
      </p>
      <div className={timerControlStyles.controls}>
        <div className={`${timerControlStyles.btn} ${timerControlStyles.play}`} onClick={playBtnClick}>
          <Image src={playBtn} alt="Play" />
        </div>
        <div className={timerControlStyles.btn}>
          <Image src={cancelBtn} alt="Cancel" onClick={cancelClick}/>
        </div>
        <div className={timerControlStyles.btn}>
          <Image src={stopTimer} alt="Stop Timer" />
        </div>
        <div className={timerControlStyles.btn}>
          <Image src={startTimer} alt="Start Timer" />
        </div>
        <div className={`${timerControlStyles.btn} ${timerControlStyles.play} ${timerControlStyles.audience}`} onClick={audienceTime}>
          <h1>Audience Time</h1>
        </div>
      </div>
    </div>
  );
}

export default TimerControl;