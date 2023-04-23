import React from "react";
import textualQuestionStyles from './TextualQuestion.module.scss'

function TextualQuestion({question}) {
  return (
    <>
      <article className={textualQuestionStyles.qTextualQuestion}>
        {question}
      </article>
    </>
  );
}

export default TextualQuestion;