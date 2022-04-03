import React from "react";

import Marquee from "./Marquee/Marquee";

import './header.scss'

function Header({title, message}) {
  return (
    <>
      <header className="quiz-header">
        <div className="brand-logo">
          <img src="/assets/QuizLogo-removebg.png" alt="Quiz Logo" />
        </div>
        <div className="banner">
          <div className="title">{title}</div>
          <Marquee message={message} />
        </div>
        <div className="settings">
          <img src="/assets/settings-icon-removebg.png" alt="Quiz Settings" />
        </div>
      </header>
    </>
  );
}

export default Header;
