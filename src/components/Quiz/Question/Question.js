import React from "react";
import TextualQuestion from "./TextualQuestion/TextualQuestion";
import ExtraContent from "./ExtraContent/ExtraContent";

import './Question.scss'

function Question({question, audio, video}) {
  return (
    <div className="question">
      <TextualQuestion question={question.question}/>
      {question.extra ? <ExtraContent src={question.extra.resource} type={question.extra.type} audio={audio} video={video}/> : ''}
    </div>
  );
}

export default Question;
