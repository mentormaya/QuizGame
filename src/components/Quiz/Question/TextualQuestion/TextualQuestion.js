import React from "react";
import './TextualQuestion.scss'

function TextualQuestion({question}) {
  return (
    <>
      <article className="q-textual-question">
        {question}
      </article>
    </>
  );
}

export default TextualQuestion;
