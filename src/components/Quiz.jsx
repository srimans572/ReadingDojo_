import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from "../styles/quiz.module.css"
import Navbar from './Navbar';
import PageNotFound from './PageNotFound'
import Footer from './Footer';

const QuizGame = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const {state} = useLocation()
  const quizData = state?.questions;
  const passage = state?.passage;

  const handleAnswerChange = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = () => {
    let currentScore = 0;
    Object.entries(answers).forEach(([questionId, selectedAnswer]) => {
      const correctAnswer = quizData[questionId].correct_answer;
      if (selectedAnswer === correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
  };

  return (
    <div>
   { quizData ? 
   <div>
   <Navbar></Navbar>     
   <div className={styles.quizContainer}>   
          {passage && <p style={{whiteSpace:"pre-wrap"}}className={styles.passage}>{passage}</p>}  
        <div className={styles.quizQuestions}>
      {Object.entries(quizData).map(([questionId, questionData]) => (
        <div className={styles.questionBox} key={questionId}>
          <h4>{questionId}. {questionData.question}</h4>
          <div>
            {questionData.choices.map((choice) => (
            <div className={styles.answerChoice}>
              <label className={styles.answerbox} key={choice}>
                <div><input
                  className={styles.input}
                  type="radio"
                  name={questionId}
                  value={choice}
                  checked={answers[questionId] === choice}
                  onChange={() => handleAnswerChange(questionId, choice)}
                  disabled={score !== null}
                /></div>
                {choice}
              </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      {score === null ? (
        <button className={styles.submit} onClick={handleSubmit}>Submit</button>
      ) : (
        <p>Your score: {score}/{Object.keys(quizData).length}</p>
      )}
    </div>
    </div>
    <br />
    <Footer></Footer>
    </div> : <PageNotFound quizNotFoundError = "Whoops! You haven't generated your questions"></PageNotFound>
    }
  
 </div>
  );
};

export default QuizGame;
