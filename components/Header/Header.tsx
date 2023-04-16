import React from "react";
import Image from 'next/image'

import Marquee from "components/Marquee/Marquee";

import './Header.module.scss'

import QuizLogo from 'public/assets/QuizLogo-removebg.png'
import SettingsIcon from 'public/assets/settings-icon-removebg.png'

function Header({title, message}) {
  return (
    <>
      <header className="quiz-header">
        <div className="brand-logo">
          <Image src={QuizLogo} alt="Quiz Logo"/>
        </div>
        <div className="banner">
          <div className="title">{title}</div>
          <Marquee message={message} />
        </div>
        <div className="settings">
          <Image src={SettingsIcon} alt="Quiz Settings" />
        </div>
      </header>
    </>
  );
}

export default Header;