/* eslint-disable no-tabs */
import React from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import { quiz } from 'reducers/quiz';
import swal from 'sweetalert';
import { ProgBar } from './ProgressBar';
import universe from '../images/universe.jpg';
import questionsBackground from '../images/questions-background.jpg';

export const CurrentQuestion = () => {
  const question = useSelector((store) => store.quiz.questions[store.quiz.currentQuestionIndex])
  const wholeStore = useSelector((store) => store)
  console.log(wholeStore);
  console.log(question);

  const dispatch = useDispatch();
  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  /* const onAnswerSubmit = (id, index) => {
    dispatch(quiz.actions.submitAnswer({ questionId: id, answerIndex: index }))
  } */

  const onAnswerSubmit = (questionId, answerIndex) => {
    dispatch(quiz.actions.submitAnswer({ questionId, answerIndex }));
    if (question.correctAnswerIndex === answerIndex) {
      swal({
        title: 'Good job!',
        text: 'You picked the right one!',
        icon: 'success',
        button: 'continue'

      });
      dispatch(quiz.actions.goToNextQuestion());
    } else {
      swal({
        title: 'Wrong answer!',
        icon: 'error',
        button: 'continue'
      });
      dispatch(quiz.actions.goToNextQuestion());
    }
  }

  return (
    <OuterWrapper>
      <Container>
        <ProgBar />
        <Title>
          <Question>Question: {question.questionText}</Question>
        </Title>
        <ButtonContainer>
          {question.options.map((option, index) => {
            return <Button onClick={() => onAnswerSubmit(question.id, index)} key="{option}" type="button">{option}</Button>
          })}
        </ButtonContainer>
      </Container>
    </OuterWrapper>
  )
}

const OuterWrapper = styled.div`
/* BACKGROUND PICTURE */
background: linear-gradient(rgba(7, 7, 7, 0.7), rgba(0, 0, 0, 0)),
url(${universe});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
	display: flex;
	justify-content: center;

`
const Question = styled.h1`
color: white;
`
const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	background: linear-gradient(rgba(7, 7, 7, 0.7), rgba(0, 0, 0, 0)),
url(${questionsBackground});
  background-size: cover;
	max-width: 50rem;
	margin-top: 4%;
  margin-bottom: 8%;
`;

const Title = styled.h3`
	width: 90%;
	font-size: 1.8rem;
	text-align: center;
`;

const ButtonContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-top: 4rem;
	margin-bottom: 4rem;
	gap: 1rem;
	width: 90%;

`;

const Button = styled.button`
	border-radius: 5px;
	background-color: #005efff4;
	color: white;
	font-family: 'Raleway', sans-serif;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	border: none;
	height: 4rem;
`;

/* const Counter = styled.p`
	font-weight: 500;
	font-size: 1.3rem;
`; */
