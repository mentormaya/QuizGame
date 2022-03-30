import React from 'react'
import '../css/quiz.scss'

function Quiz() {
  return (
    <div className='quiz-container'>
      <div className='quiz-header'>Header</div>
      <div className='quiz-body'>
        <div className='left-side-bar'>Left Side Bar</div>
        <div className='main-container'>MCQ Area</div>
        <div className='right-side-bar'>Right Side Bar</div>
      </div>
      <div className='quiz-footer'>footer</div>
    </div>
  )
}

export default Quiz