import React from "react";
import Image from 'next/image'

import Marquee from "../Marquee/Marquee";

import quizHStyle from './Header.module.scss'

import QuizLogo from 'public/assets/QuizLogo-removebg.png'
import SettingsIcon from 'public/assets/settings-icon-removebg.png'

function Header({title, message} : { title: string, message: string }) {
  return (
    <>
      <header className={quizHStyle.quizHeader}>
        <div className={quizHStyle.brandLogo}>
          <Image src={QuizLogo} alt="Quiz Logo"/>
        </div>
        <div className={quizHStyle.banner}>
          <div className={quizHStyle.title}>{title}</div>
          <Marquee message={message} />
        </div>
        <div className={quizHStyle.settings}>
          <Image src={SettingsIcon} alt="Quiz Settings" />
        </div>
      </header>
    </>
  );
}

export default Header;