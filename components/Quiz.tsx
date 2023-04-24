import React, { useCallback, useEffect, useRef, useState } from 'react'
import Footer from './Footer/Footer';
import Groups from './Groups/Groups';
import Header from './Header/Header';
import Hystory from './History/History';
import Options from './Options/Options';
import Answer from './Answer/Answer';
import Question from './Question/Question';
import QuestionSelector from './QuestionSelector/QuestionSelector';
import TimerControl from './TimerControl/TimerControl';

import quizStyle from './Quiz.module.scss'

function Quiz() {
  let date = new Date();
  const year = date.getFullYear().toString();

  let ts = date.toString().split(" ");

  let timestamp = `${ts[0]} ${ts[1]} ${ts[2]} ${ts[3]} ${ts[4]} ${parseInt(ts[4].split(":")[0]) >= 12 ? "PM" : "AM"
    }`;

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  //States for the app
  const [quizTitle, setQuizTitle] = useState("Maya's Quiz v1.0")
  const [quizMessage, setquizMessage] = useState("Welcome to the Maya's Quiz and Best of luck to all the participants!")
  const [showAudQuiz, setShowAudQuiz] = useState(false)
  const [lastID, setLastID] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false)
  const [seconds, setSeconds] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [groups, setGroups] = useState([{
    id: 1,
    name: 'Sample Group',
    turn: true,
    score: 0,
    members: [
      {
        "full_name": "Ajay Singh",
        "isLeader": true
      }
    ]
  }]);
  const [settings, setSettings] = useState({});
  const [selectedQuestion, setSelQuestion] = useState({
    id: 0,
    body: "राष्ट्र गान, राष्ट्रिय सम्मान",
    type: "TEXT_AUDIO",
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
  const [turn, setTurn] = useState({
    id: 1,
    name: "First Group",
    members: [
      {
        full_name: "Ajay Singh",
        isLeader: true
      }
    ],
    turn: true,
    score: 0
  });

  //timer countdown code
  let timer = useRef(0);

  timer.current = 0

  const stopTimer = () => {
    setSeconds(0);
    setTimerRunning(false)
    clearInterval(timer.current);
    timer.current = 0;
  };

  const startTimer = useCallback(() => {
    setTimerRunning(true)
    timer.current = seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000) ? 1 : 0;
    return () => clearInterval(timer.current);
  }, [seconds]);

  const logger = useCallback((log: { msg: string; timestamp: string; }) => {
    setEvents([log, ...events]); //add new events to the array
    // console.log(events)
  }, [events]);

  //Load the DB
  const fetchQuestions = useCallback(async () => {
    let url = `${api_url}/${process.env.NEXT_PUBLIC_QUESTIONS_ROUTE}`
    const res = await fetch(url);
    const data = await res.json();
    logger({
      msg: `Questions Fetched Successfully!`,
      timestamp: timestamp,
    });
    return data;
  }, [api_url, logger, timestamp]);

  const fetchSettings = useCallback(async () => {
    const res = await fetch(`${api_url}/${process.env.NEXT_PUBLIC_SETTINGS_ROUTE}`);
    const data = await res.json();
    logger({
      msg: `Settings Fetched Successfully!`,
      timestamp: timestamp,
    });
    return data;
  }, [api_url, logger, timestamp]);

  const fetchGroups = useCallback(async () => {
    const res = await fetch(`${api_url}/${process.env.NEXT_PUBLIC_GROUPS_ROUTE}`);
    const data = await res.json();
    const turnGroup = data.filter((group) => group.turn)[0]
    setTurn({ ...turnGroup })
    logger({
      msg: `Groups Fetched Successfully!`,
      timestamp: timestamp,
    });
    return data;
  }, [api_url, logger, timestamp]);

  const resetOptions = (nonMCQ = true) => {
    if (nonMCQ) {
      //do reset for only one answer
      console.log('Non MCQ Question')
      return
    } else {
      optionA.current.classList.remove('optionCorrect')
      optionB.current.classList.remove('optionCorrect')
      optionC.current.classList.remove('optionCorrect')
      optionD.current.classList.remove('optionCorrect')
      optionA.current.classList.remove('optionWrong')
      optionB.current.classList.remove('optionWrong')
      optionC.current.classList.remove('optionWrong')
      optionD.current.classList.remove('optionWrong')
    }
  }

  //Utilities functions
  const selectQuestion = async (num: number) => {
    resetOptions()
    if (questions) {
      await setSelQuestion(
        questions.filter((question) => question.id === num)[0]
      );
      logger({
        msg: `${turn.name} selects Question No. ${num}`,
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

  const checkTimer = (num: number) => {
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

  const checkAnswer = (e: Event, nonMCQ = true) => {
    if(nonMCQ === true){
      e.target.innerHTML = `Answer: ${selectedQuestion.correct_option}`
      return
    }
    stopTimer();
    let optionHoler = e.target
    let option = optionHoler.innerHTML;
    console.log(selectedQuestion.type)
    logger({
      msg: `${turn.name} answered ${option === selectedQuestion.correct_option ? "correct" : "incorrect"} Option ${option}`,
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

  const shiftTurn = useCallback((ans: boolean) => {
    let grps = groups
    if (grps && turn?.id >= 0) {
      let nxtGrp = 0
      grps[turn?.id - 1].turn = false
      if (lastID === 0 && ans) {
        //case for original team answers the question correctly
        nxtGrp = turn.id >= grps.length ? 1 : turn.id + 1
        grps[turn.id - 1].score += 10
        console.log('original team answers correctly for 10 marks')
      } else if (lastID === 0 && !ans) {
        //case for original ask fails
        setLastID(turn.id)
        setSeconds(15)
        startTimer()
        nxtGrp = turn.id >= grps.length ? 1 : turn.id + 1
        console.log("original team can't answers correctly for 10 marks")
      } else if (lastID !== 0 && ans) {
        //case for bonus question answered
        nxtGrp = lastID >= grps.length ? 1 : parseInt(lastID) + 1
        grps[turn.id - 1].score += 5
        console.log(`${grps[turn.id - 1].name} answered bonus question`)
        setLastID(0) //clearing bonus
      } else {
        nxtGrp = lastID >= grps.length ? 1 : parseInt(lastID) + 1
        setLastID(0) //clearing bonus
        console.log('no one can answer the question')
      }
      // console.log(nxtGrp)
      grps[nxtGrp - 1].turn = true
      setGroups(grps)
      setTurn(groups.filter((group) => group.turn === true)[0]);
    }
  }, [groups, lastID, startTimer, turn])

  const revealAnswer = (ans: boolean, option: EventTarget | null) => {
    if (ans) {
      option.classList.add('optionCorrect')
    } else if (lastID !== 0) {
      option.classList.add('optionWrong')
      showCorrectAnswer(selectedQuestion.correct_option)
    } else {
      option.classList.add('optionWrong')
    }
    console.log(`answered correctly : ${ans}`)
  }

  const showCorrectAnswer = (ans: string) => {
    console.log(`Showing correct answer ${ans.toUpperCase()} automatically`)
    if (selectedQuestion.correct_option === 'a') {
      //highlight option A
      // console.log(optionA.current)
      optionA.current.classList.add('optionCorrect')
    } else if (selectedQuestion.correct_option === 'b') {
      //highlight option B
      optionB.current.classList.add('optionCorrect')
    } else if (selectedQuestion.correct_option === 'c') {
      //highlight option C
      optionC.current.classList.add('optionCorrect')
    } else if (selectedQuestion.correct_option === 'd') {
      //highlight option D
      optionD.current.classList.add('optionCorrect')
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

  React.useEffect(() => {
    startTimer();
  }, [seconds, api_url, startTimer]);

  // startTimer()

  const audioPlayer = useRef();
  const videoPlayer = useRef();

  const optionA = useRef();
  const optionB = useRef();
  const optionC = useRef();
  const optionD = useRef();

  //Loading Questions
  const getQuestions = async () => {
    const questionsFromServer = await fetchQuestions();
    setQuestions(questionsFromServer);
  };

  //Loading Groups
  const getGroups = async () => {
    const groupsFromServer = await fetchGroups();
    setGroups(groupsFromServer);
  };

  //Loading Settings
  const getSettings = async () => {
    const settingsFromServer = await fetchSettings();
    setSettings(settingsFromServer);
    setQuizTitle(settingsFromServer.filter(setting => setting.key === 'TITLE')[0].value)
    setquizMessage(settingsFromServer.filter(setting => setting.key === 'MESSAGE')[0].value)
  };

  useEffect(() => {
    if (!api_url) return
    getQuestions()
    logger({
      msg: `Questions Loaded Successfully!`,
      timestamp: timestamp,
    });

    getGroups();
    logger({
      msg: `Groups Loaded Successfully!`,
      timestamp: timestamp,
    });

    getSettings();
    logger({
      msg: `Settings Loaded Successfully!`,
      timestamp: timestamp,
    });
  }, []);


  useEffect(() => {
    console.log(`groups changed:`)
    if (groups.length) {
      setTurn(groups.filter((group) => group.turn === true)[0]);
    } else {
      console.log(groups)
    }
    console.log(`turn set to ${turn.name}`)
  }, [groups])

  useEffect(() => {
    console.log(`question changed:`)
    setAnswer(selectedQuestion.correct_option)
    console.log(`answer set for question no ${selectedQuestion.id}`)
  }, [selectedQuestion])

  //running timer
  useEffect(() => {
    // console.log(timer, seconds)
    if (timerRunning && seconds <= 0) {
      console.log('timeup')
      shiftTurn(false)
    }
  }, [])

  //Main App Container
  return (
    <div className={quizStyle.quizContainer}>
      <Header title={quizTitle} message={quizMessage} />
      {showAudQuiz ? <Modal setShowAudQuiz={setShowAudQuiz} /> : null}
      <div className={quizStyle.quizBody}>
        <aside className={quizStyle.leftSideBar}>
          <Groups groups={groups} />
          <hr />
          <Hystory events={events} />
        </aside>
        <main className={quizStyle.mainContainer}>
          <section className={quizStyle.questionArea}>
            <Question
              question={selectedQuestion}
              audio={audioPlayer}
              video={videoPlayer}
            />
          </section>
          <section className={quizStyle.optionsArea}>
            {(selectedQuestion.type.includes('MCQ')) &&
              <Options
                options={selectedQuestion.options}
                checkOption={checkAnswer}
                optionA={optionA}
                optionB={optionB}
                optionC={optionC}
                optionD={optionD}
              />
            }
            {(!selectedQuestion.type.includes('MCQ')) &&
              <Answer
                answer={"Answer: "}
                checkOption={checkAnswer}
              />
            }
          </section>
        </main>
        <aside className={quizStyle.rightSideBar}>
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