import React from 'react'
import './quiz.scss'

function Quiz() {
  let date = new Date();
  const year = date.getFullYear('YYYY').toString();

  console.log(year)
  return (
    <div className='quiz-container'>
      <header className='quiz-header'>
        <div className="brand-logo">
          <img src="/assets/QuizLogo-removebg.png" alt="Quiz Logo" />
        </div>
        <div className="banner">
          <div className="title">Nepal Rastra Bank Quiz</div>
          <div className="message">Organized on the auspicious moment of Happy Birthday 😜😜</div>
        </div>
        <div className="settings">
          <img src="/assets/settings-icon-removebg.png" alt="Quiz Settings" />
        </div>
      </header>
      <div className='quiz-body'>
        <aside className='left-side-bar'>Left Side Bar</aside>
        <main className='main-container'>
          <section className="question-area">
            <article className="question">What is the height of Mount Everest?</article>
            <article className='q-extra-content'>
              <img src="#" alt=""/>
            </article>
          </section>
          <section className="options-area">

          </section>
        </main>
        <aside className='right-side-bar'>Right Side Bar</aside>
      </div>
      <footer className='quiz-footer'>
        <div className="copyright">
          &copy; Copyright &nbsp;
          <a href="https://mentormaya.com/" title='Ajay Singh'>@mentormaya</a>&nbsp;
          { year === "2022" ? '2022' : `2022 - ${year}`}. 
        </div>
        <div className="rights-info">
          All the rights are reserved.
        </div>
      </footer>
    </div>
  )
}

export default Quiz