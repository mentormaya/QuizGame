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

  let ts = date.toString().split(" ");

  let timestamp = `${ts[0]} ${ts[1]} ${ts[2]} ${ts[3]} ${ts[4]} ${
    ts[4].split(":")[0] >= 12 ? "PM" : "AM"
  }`;

  const db_url = "http://localhost:5000";

  //States for the app
  const [questions, setQuestions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [settings, setSettings] = useState({});
  const [selectedQuestion, setSelQuestion] = useState({
    "id": 0,
    "question": "राष्ट्र गान, राष्ट्रिय सम्मान",
    "type": "MCQ_TEXT_AUDIO",
    "extra": {
      "type": "AUDIO",
      "resource": "assets/Audio/Sayau_thunga.mp3"
    },
    "options": {
      "a": "Nepal",
      "b": "India",
      "c": "China",
      "d": "Bangladesh"
    },
    "correct_option": "a",
    "published": true
  });
  const [events, setEvents] = useState([
    {
      msg: "Quiz Application is initialized!",
      timestamp: timestamp,
    },
  ]);
  const [turn, setTurn] = useState({})

  //Loading Questions
  useEffect(() => {
    const getQuestions = async () => {
      const questionsFromServer = await fetchQuestions();
      setQuestions(questionsFromServer);
    };
    getQuestions();
    logger({
      msg: `Questions Loaded Successfully!`,
      timestamp: timestamp,
    });
  }, [groups, settings]);

  //Loading Groups
  useEffect(() => {
    const getGroups = async () => {
      const groupsFromServer = await fetchGroups();
      setGroups(groupsFromServer);
      setTurn(groups.filter((group) => group.turn === true)[0])
    };
    getGroups();
    logger({
      msg: `Groups Loaded Successfully!`,
      timestamp: timestamp,
    });
  }, [settings]);

  //Loading Settings
  useEffect(() => {
    const getSettings = async () => {
      const settingsFromServer = await fetchSettings();
      setSettings(settingsFromServer);
    };
    getSettings();
    logger({
      msg: `Settings Loaded Successfully!`,
      timestamp: timestamp,
    });
  }, []);

  //Load the DB
  const fetchQuestions = async () => {
    const res = await fetch(`${db_url}/questions`);
    const data = await res.json();
    logger({
      msg: `Questions Fetched Successfully!`,
      timestamp: timestamp,
    });
    return data;
  };

  const fetchSettings = async () => {
    const res = await fetch(`${db_url}/settings`);
    const data = await res.json();
    logger({
      msg: `Settings Fetched Successfully!`,
      timestamp: timestamp,
    });
    return data;
  };

  const fetchGroups = async () => {
    const res = await fetch(`${db_url}/groups`);
    const data = await res.json();
    logger({
      msg: `Groups Fetched Successfully!`,
      timestamp: timestamp,
    });
    return data;
  };

  //Utilities functions
  const selectQuestion = (num) => {
    if (questions) {
      setSelQuestion(questions.filter((question) => question.id === num)[0]);
      logger({
        msg: `${turn.group_name} selects Question No. ${num}`,
        timestamp: timestamp,
      });
      //mark the question as passed
      let qs = questions
      qs[num-1].published = true
      setQuestions(qs)

      //TODO check to start the timer
      checkTimer()
    } else {
      logger({
        msg: `No Questions available!`,
        timestamp: timestamp,
      });
      console.log("No Questions to Select");
    }
  };
  const logger = (log) => {
    setEvents([...events, log]); //add new events to the array
    // console.log(events)
  };

  const checkTimer = () => {
    if(selectedQuestion.type === "MCQ_TEXT" || selectedQuestion.type === "MCQ_TEXT_PHOTO"){
      startTimer("01:00")
    }
  }

  const startTimer = (time) => {
    alert(`Countdown started for ${time}`)
  }

  //Main App Container
  return (
    <div className="quiz-container">
      <Header title={settings.TITLE} message={settings.MESSAGE} />
      <div className="quiz-body">
        <aside className="left-side-bar">
          <Groups groups={groups} />
          <hr />
          <Hystory events={events} />
        </aside>
        <main className="main-container">
          <section className="question-area">
            <Question question={selectedQuestion} />
          </section>
          <section className="options-area">
            <Options options={selectedQuestion.options} />
          </section>
        </main>
        <aside className="right-side-bar">
          <QuestionSelector
            questions={questions}
            selectQuestion={selectQuestion}
          />
          <hr />
          <TimerControl />
        </aside>
      </div>
      <Footer year={year} />
    </div>
  );
}

export default Quiz;
