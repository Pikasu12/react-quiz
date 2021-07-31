import React, { useState } from "react"
import { fetchQuizQuestions } from "./api"
// components
import QuestionCard from "./components/QuestionCard"
// Types
import { QuestionState, Difficulty } from "./api"

type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correct_answer: string
}

const TOTAL_QUESTIONS = 10

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EAST))
  console.log(questions)
  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuizQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EAST
    )

    setQuestions(newQuizQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {}

  const nextQuestion = () => {}

  return (
    <div className="App">
      <h1>ONE PIECE QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}

      {!gameOver ? <p className="score">Score:</p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  )
}

export default App
