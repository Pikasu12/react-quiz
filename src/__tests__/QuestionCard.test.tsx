import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionCard from "../components/QuestionCard"

test('renders question card', () => {
  const userAnswer = {
    question: "Sino ang malakas?",
    answer: "Marco",
    correct: true,
    correctAnswer: "Marco"
  }

  render(<QuestionCard 
    question={"Sino ang malakas?"} 
    answers={["Marco", "Ramos"]} 
    callback={() => {}} 
    userAnswer={userAnswer} 
    questionNr={1} 
    totalQuestions={10} />
  )
  
  const questionNumber = screen.getByText("Question: 1 / 10");  
  const question = screen.getByText(/Sino ang malakas/i);
  const answer1 = screen.getByText(/Marco/i);
  const answer2 = screen.getByText(/Ramos/i);
  
  expect(questionNumber).toBeInTheDocument();
  expect(question).toBeInTheDocument();
  expect(answer1).toBeInTheDocument();
  expect(answer2).toBeInTheDocument();
});
