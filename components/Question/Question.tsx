import React from "react";
import TextualQuestion from "./TextualQuestion/TextualQuestion";
import ExtraContent from "./ExtraContent/ExtraContent";

import questionStyles from './Question.module.scss'

function Question({question, audio, video}) {
  return (
    <div className={questionStyles.question}>
      <TextualQuestion question={question.body}/>
      {question.extra ? <ExtraContent src={question.extra.resource} type={question.extra.type} audio={audio} video={video}/> : ''}
    </div>
  );
}

export default Question;