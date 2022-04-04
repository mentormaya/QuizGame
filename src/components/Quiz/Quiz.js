import React from "react";
import "./quiz.scss";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";
import Groups from "./Groups/Groups.js";
import Hystory from "./History/History.js";
import Question from "./Question/Question.js";
import Options from "./Options/Options.js";
import QuestionSelector from "./QuestionSelector/QuestionSelector.js";

function Quiz() {
  let date = new Date();
  const year = date.getFullYear("YYYY").toString();

  // console.log(year)

  //title for the Quiz

  const title = "नेपाल राष्ट्र बैंक जनकपुर कार्यालय";

  const message =
    "नेपाल राष्ट्र बैंककाे ६७औं जयन्तिकाे सुअवसरमा आयाेजित हाजिरी जवाफ प्रतियाेगिता ।";

    let question = {
      "id": 1,
      "question": "What is the height of Mount Everest?",
      "type": "MCQ_TEXT",
      "extra": {
        "type": "PHOTO",
        "resource": "assets/Questions/Everest.png"
      },
      "options": [
        {
          "a": 2348
        },
        {
          "b": 3948
        },
        {
          "c": 1548
        },
        {
          "d": 8848
        }
      ],
      "correct_option": "d"
    }

  return (
    <div className="quiz-container">
      <Header title={title} message={message} />
      <div className="quiz-body">
        <aside className="left-side-bar">
          <Groups />
          <Hystory />
        </aside>
        <main className="main-container">
          <section className="question-area">
            <Question question={question}/>
          </section>
          <section className="options-area">
            <Options options={question.options}/>
          </section>
        </main>
        <aside className="right-side-bar">
          <QuestionSelector />
          <h1>Timer and Controls</h1>
        </aside>
      </div>
      <Footer year={year} />
    </div>
  );
}

export default Quiz;
