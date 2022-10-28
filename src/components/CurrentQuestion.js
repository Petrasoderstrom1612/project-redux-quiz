/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { quiz } from 'reducers/quiz'
import { ProgBar } from './ProgressBar'
import Summary from './Summary'
import universe from '../images/universe.jpg'
import { StyledButton, Image } from './ReusableStyles.js'

export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const entireStore = useSelector((state) => state);
  const dispatch = useDispatch();

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  const onAnswerSubmit = (questionId, answerIndex) => {
    dispatch(quiz.actions.submitAnswer(
      { questionId, answerIndex }
    ))
    if (question.correctAnswerIndex === answerIndex) {
      alert('Correct answer!')
    } else {
      alert('You are wrong!')
    }
    dispatch(quiz.actions.goToNextQuestion())
  }

  const allAnswers = question.options.map((option, index) => {
    return (
      <>
        {question.id === 5
          ? <Image
              src={option.img}
              alt={option}
              onClick={() => onAnswerSubmit(question.id, index)}
              key={option} />
          : <StyledButton
            onClick={() => onAnswerSubmit(question.id, index)}
            key={option}
            type="button"><p>{option}</p>
          </StyledButton>}
      </>)
  })

  return (
    <OuterWrapper>
      <Container>
        {entireStore.quiz.quizOver
          ? <Summary />
          : <>
            <ProgBar />
            <QuestionContainer>
              <h1>{question.questionText}</h1>
            </QuestionContainer>
            <ButtonContainer>
              {allAnswers}
            </ButtonContainer>
          </>}
      </Container>
    </OuterWrapper>
  )
}

const OuterWrapper = styled.div`
  background: linear-gradient(rgba(7, 7, 7, 0.7), rgba(0, 0, 0, 0)),
  url(${universe});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  color: var(--lightPink-color);
`

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background: linear-gradient(rgba(7, 7, 7, 0.7), rgba(0, 0, 0, 0.0));
background-size: cover;
max-width: 50rem;
margin-top: 4vh;
margin-bottom: 8%;
border-radius: 8px;
height: 96vh;
`;

const QuestionContainer = styled.div`
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
`

const ButtonContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
margin-top: 4rem;
margin-bottom: 4rem;
gap: 1rem;
width: 90%;


@media (min-width: 667px) {

}
`;