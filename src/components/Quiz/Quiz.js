import { useState, useEffect } from "react";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";
import Groups from "./Groups/Groups.js";
import Hystory from "./History/History.js";
import Question from "./Question/Question.js";
import Options from "./Options/Options.js";
import QuestionSelector from "./QuestionSelector/QuestionSelector.js";
import TimerControl from "./TimerControls/TimerControl";

import "./quiz.scss";

function Quiz() {
  let date = new Date();
  const year = date.getFullYear("YYYY").toString();

  let ts = date.toString().split(" ")

  let timestamp = `${ts[0]}, ${ts[1]} ${ts[2]}, ${ts[3]} ${ts[4]} ${ts[4].split(':')[0] >= 12 ? "PM" : "AM"}`

  const db_url = "http://localhost:5000"

  //States for the app
  const [questions, setQuestions] = useState([]);

  useEffect( () => {
    const getQuestions = async () => {
      const questionsFromServer = await fetchQuestions()
      setQuestions(questionsFromServer)
    }
    getQuestions()
  }, [])

  const [selectedQuestion, setSelQuestion] = useState({});

  const [settings, setSettings] = useState({})

  const [events, setEvents] = useState([{
    "msg": "Quiz Application is initialized!",
    "timestamp": timestamp
  }])

  useEffect( () => {
    const getSettings = async () => {
      const settingsFromServer = await fetchSettings()
      setSettings(settingsFromServer)
    }
    getSettings()
  }, [])

  //Load the DB
  const fetchQuestions = async () => {
    const res = await fetch(`${db_url}/questions`)
    const data = await res.json()
    return data
  }

  const fetchSettings = async () => {
    const res = await fetch(`${db_url}/settings`)
    const data = await res.json()
    return data
  }

  //Utilities functions
  const selectQuestion = (num) => {
    if(questions){
      setSelQuestion(questions.filter( question => question.id === num )[0])
      let log = {
        "msg": `Group # JANAKI selects Question No. ${num}`,
        "timestamp": timestamp
      }
      logger(log)
    } else {
      console.log('No Questions to Select')
    }
  }
  const logger = (log) => {
    setEvents(...events, log)//add new events to the array
    console.log(events)
  }


  //Main App Container
  return (
    <div className="quiz-container">
      <Header title={settings.TITLE} message={settings.MESSAGE} />
      <div className="quiz-body">
        <aside className="left-side-bar">
          <Groups />
          <hr />
          <Hystory />
        </aside>
        <main className="main-container">
          <section className="question-area">
            <Question question={selectedQuestion}/>
          </section>
          <section className="options-area">
            <Options options={selectedQuestion.options}/>
          </section>
        </main>
        <aside className="right-side-bar">
          <QuestionSelector count={questions.length} selectQuestion = {selectQuestion}/>
          <hr />
          <TimerControl />
        </aside>
      </div>
      <Footer year={year} />
    </div>
  );
}

export default Quiz;
