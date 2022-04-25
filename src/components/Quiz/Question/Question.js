import React from "react";
import TextualQuestion from "./TextualQuestion/TextualQuestion";
import ExtraContent from "./ExtraContent/ExtraContent";

import './Question.scss'

function Question({question}) {
  return (
    <div className="question">
      <TextualQuestion question={question.question}/>
      {question.extra ? <ExtraContent src={question.extra.resource} type={question.extra.type}/> : ''}
    </div>
  );
}

export default Question;
