import React, { useEffect, useRef, useState } from 'react'
import Footer from './Footer/Footer';
import Groups from './Groups/Groups';
import Header from './Header/Header';
import Hystory from './History/History';
import Options from './Options/Options';
import Question from './Question/Question';
import QuestionSelector from './QuestionSelector/QuestionSelector';
import TimerControl from './TimerControl/TimerControl';

import './Quiz.module.scss'

function Quiz() {
  let date = new Date();
  const year = date.getFullYear().toString();

  let ts = date.toString().split(" ");

  let timestamp = `${ts[0]} ${ts[1]} ${ts[2]} ${ts[3]} ${ts[4]} ${parseInt(ts[4].split(":")[0]) >= 12 ? "PM" : "AM"
    }`;

  const api_url = process.env.API_URL;

  //States for the app
  const [showAudQuiz, setShowAudQuiz] = useState(false)
  const [lastID, setLastID] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false)
  const [seconds, setSeconds] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [settings, setSettings] = useState({});
  const [selectedQuestion, setSelQuestion] = useState({
    id: 0,
    question: "राष्ट्र गान, राष्ट्रिय सम्मान",
    type: "MCQ_TEXT_AUDIO",
    extra: {
      type: "AUDIO",
      resource: "assets/Audio/Sayau_thunga.mp3",
    },
    options: {
      a: "Nepal",
      b: "India",
      c: "China",
      d: "Bangladesh",
    },
    correct_option: "a",
    published: true,
  });
  const [events, setEvents] = useState([
    {
      msg: "Quiz Application is initialized!",
      timestamp: timestamp,
    },
  ]);
  const [turn, setTurn] = useState({});

  //timer countdown code
  let timer = null;

  const stopTimer = () => {
    setSeconds(0);
    setTimerRunning(false)
    clearInterval(timer);
  };

  const startTimer = () => {
    setTimerRunning(true)
    timer = seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearInterval(timer);
  };

  React.useEffect(() => {
    startTimer();
  }, [seconds]);

  // startTimer()

  const audioPlayer = useRef();
  const videoPlayer = useRef();

  const optionA = useRef();
  const optionB = useRef();
  const optionC = useRef();
  const optionD = useRef();

  //Loading Questions
  useEffect(() => {
    const getQuestions = async () => {
      const questionsFromServer = await fetchQuestions();
      setQuestions(questionsFromServer);
    };
    if(!api_url) return
    getQuestions()
    logger({
      msg: `Questions Loaded Successfully!`,
      timestamp: timestamp,
    });
  }, [questions]);

  //Loading Groups
  useEffect(() => {
    const getGroups = async () => {
      const groupsFromServer = await fetchGroups();
      setGroups(groupsFromServer);
      if(groups.length){
        setTurn(groups.filter((group) => group.turn === true)[0]);
      } else {
        console.log(groups)
      }
    };
    if(!api_url) return
    getGroups();
    logger({
      msg: `Groups Loaded Successfully!`,
      timestamp: timestamp,
    });
  }, [groups]);

  //Loading Settings
  useEffect(() => {
    const getSettings = async () => {
      const settingsFromServer = await fetchSettings();
      setSettings(settingsFromServer);
    };
    if(!api_url) return
    getSettings();
    logger({
      msg: `Settings Loaded Successfully!`,
      timestamp: timestamp,
    });
  }, [settings]);

  useEffect(() => {
    // console.log(timer, seconds)
    if (timerRunning && seconds <= 0) {
      console.log('timeup')
      shiftTurn(false)
    }
  }, [seconds, timer])

  //Load the DB
  const fetchQuestions = async () => {
    let url = `${api_url}/${process.env.QUESTIONS_ROUTE}`
    const res = await fetch(url);
    const data = await res.json();
    logger({
      msg: `Questions Fetched Successfully!`,
      timestamp: timestamp,
    });
    return data;
  };

  const fetchSettings = async () => {
    const res = await fetch(`${api_url}/${process.env.SETTINGS_ROUTE}`);
    const data = await res.json();
    logger({
      msg: `Settings Fetched Successfully!`,
      timestamp: timestamp,
    });
    return data;
  };

  const fetchGroups = async () => {
    const res = await fetch(`${api_url}/${process.env.GROUPS_ROUTE}`);
    const data = await res.json();
    logger({
      msg: `Groups Fetched Successfully!`,
      timestamp: timestamp,
    });
    return data;
  };

  const resetOptions = () => {
    optionA.current.classList.remove('option-correct')
    optionB.current.classList.remove('option-correct')
    optionC.current.classList.remove('option-correct')
    optionD.current.classList.remove('option-correct')
    optionA.current.classList.remove('option-wrong')
    optionB.current.classList.remove('option-wrong')
    optionC.current.classList.remove('option-wrong')
    optionD.current.classList.remove('option-wrong')
  }

  //Utilities functions
  const selectQuestion = async (num) => {
    resetOptions()
    if (questions) {
      await setSelQuestion(
        questions.filter((question) => question.id === num)[0]
      );

      logger({
        msg: `${turn.group_name} selects Question No. ${num}`,
        timestamp: timestamp,
      });

      //mark the question as passed
      let qs = questions;
      qs[num - 1].published = true;
      await setQuestions(qs);

      //TODO check to start the timer
      checkTimer(num);
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

  const checkTimer = (num) => {
    if (
      questions[num - 1].type === "MCQ_TEXT" ||
      questions[num - 1].type === "MCQ_TEXT_PHOTO"
    ) {
      setSeconds(60);
      startTimer();
    }
  };

  const play = () => {
    let duration = 60;
    if (audioPlayer.current) {
      duration = duration + audioPlayer.current.duration;
      duration = Math.floor(duration);
      audioPlayer.current.play();
    }
    console.log(`Playing Media for ${duration} seconds`);
    setSeconds(duration);
    startTimer();
  };

  const cancelAction = () => {
    stopTimer();
    audioPlayer.current && audioPlayer.current.pause();
    videoPlayer.current && videoPlayer.current.pause();
  };

  const audienceQuestion = () => {
    console.log("Audience Question Time");
    setShowAudQuiz(true);
  };

  const checkAnswer = (e) => {
    stopTimer();
    let optionHoler = e.target
    let option = optionHoler.innerHTML;
    logger({
      msg: `${turn.group_name} answered ${option === selectedQuestion.correct_option ? "correct" : "incorrect"} Option ${option}`,
      timestamp: timestamp,
    });
    option = option.split(")")[0].toLowerCase();

    if (option === selectedQuestion.correct_option) {
      rightAnswer();
      revealAnswer(true, optionHoler)
    } else {
      wrongAnswer();
      revealAnswer(false, optionHoler)
    }
  };

  const shiftTurn = (ans) => {
    let grps = groups
    let nxtGrp = 0
    grps[turn?.group_id - 1].turn = false
    if (lastID === 0 && ans) {
      //case for original team answers the question correctly
      nxtGrp = parseInt(turn.group_id) >= grps.length ? 1 : parseInt(turn.group_id) + 1
      grps[turn.group_id - 1].score += 10
      console.log('original team answers correctly for 10 marks')
    } else if (lastID === 0 && !ans) {
      //case for original ask fails
      setLastID(turn.group_id)
      setSeconds(15)
      startTimer()
      nxtGrp = parseInt(turn.group_id) >= grps.length ? 1 : parseInt(turn.group_id) + 1
      console.log("original team can't answers correctly for 10 marks")
    } else if (lastID !== 0 && ans) {
      //case for bonus question answered
      nxtGrp = lastID >= grps.length ? 1 : parseInt(lastID) + 1
      grps[turn.group_id - 1].score += 5
      console.log(`${grps[turn.group_id - 1].group_name} answered bonus question`)
      setLastID(0) //clearing bonus
    } else {
      nxtGrp = lastID >= grps.length ? 1 : parseInt(lastID) + 1
      setLastID(0) //clearing bonus
      console.log('no one can answer the question')
    }
    console.log(nxtGrp)
    grps[nxtGrp - 1].turn = true
    setGroups(grps)
    setTurn(groups.filter((group) => group.turn === true)[0]);
  }

  const revealAnswer = (ans, option) => {
    if (ans) {
      option.classList.add('option-correct')
    } else if (lastID !== 0) {
      option.classList.add('option-wrong')
      showCorrectAnswer(selectedQuestion.correct_option)
    } else {
      option.classList.add('option-wrong')
    }
    console.log(`answered correctly : ${ans}`)
  }

  const showCorrectAnswer = (ans) => {
    console.log(`Showing correct answer ${ans.toUpperCase()} automatically`)
    if (selectedQuestion.correct_option === 'a') {
      //highlight option A
      // console.log(optionA.current)
      optionA.current.classList.add('option-correct')
    } else if (selectedQuestion.correct_option === 'b') {
      //highlight option B
      optionB.current.classList.add('option-correct')
    } else if (selectedQuestion.correct_option === 'c') {
      //highlight option C
      optionC.current.classList.add('option-correct')
    } else if (selectedQuestion.correct_option === 'd') {
      //highlight option D
      optionD.current.classList.add('option-correct')
    }
  }

  const rightAnswer = () => {
    console.log("right");
    shiftTurn(true)
  };

  const wrongAnswer = () => {
    console.log("wrong");
    shiftTurn(false)
  };


  //Main App Container
  return (
    <div className="quizContainer">
      <Header title={settings.TITLE} message={settings.MESSAGE} />
      {showAudQuiz ? <Modal setShowAudQuiz={setShowAudQuiz} /> : null}
      <div className="quiz-body">
        <aside className="left-side-bar">
          <Groups groups={groups} />
          <hr />
          <Hystory events={events} />
        </aside>
        <main className="main-container">
          <section className="question-area">
            <Question
              question={selectedQuestion}
              audio={audioPlayer}
              video={videoPlayer}
            />
          </section>
          <section className="options-area">
            <Options
              options={selectedQuestion.options}
              checkOption={checkAnswer}
              optionA={optionA}
              optionB={optionB}
              optionC={optionC}
              optionD={optionD}
            />
          </section>
        </main>
        <aside className="right-side-bar">
          <QuestionSelector
            questions={questions}
            selectQuestion={selectQuestion}
          />
          <hr />
          <TimerControl
            playBtnClick={play}
            audienceTime={audienceQuestion}
            seconds={seconds}
            cancelClick={cancelAction}
          />
        </aside>
      </div>
      <Footer year={year} />
    </div>
  );
}

export default Quiz