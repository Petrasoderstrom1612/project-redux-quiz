/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux';
import RestartButton from './RestartButton';
import { Image } from './ReusableStyles';

const Summary = () => {
  const allAnswers = useSelector((state) => state.quiz.answers)
  const allQuestions = useSelector((state) => state.quiz.questions);
  let temp;

  const listOfQuestions = allQuestions.map((question) => {
    return <h3 key={question.id}>{question.questionText}</h3>
  })

  const imageAnswerText = allAnswers[4].answer.name;
  const imageAnswerImage = allAnswers[4].answer.img;
  const imageAnswerCorrect = () => {
    if (allAnswers[4].isCorrect === true) {
      temp = 'Correct'
    } else {
      temp = 'Wrong'
    }
  }
  const answerList = allAnswers.map((answer) => {
    return (
      <div>
        <p>Your answer:  {answer.answer}</p>
        {answer.isCorrect ? <p style={{ color: 'green' }}>Correct</p> : <p style={{ color: 'red' }}>Wrong</p>}
      </div>
    )
  })

  return (
    <SummaryPage>
      <h1>You rock-et that quiz!!</h1>
      <FinalCitate>
        Now go teach your friends your spacetastic knowledge. See you crater, space invader!
      </FinalCitate>
      <QuestionsAndAnswers>
        {listOfQuestions[0]}
        {answerList[0]}
        {listOfQuestions[1]}
        {answerList[1]}
        {listOfQuestions[2]}
        {answerList[2]}
        {listOfQuestions[3]}
        {answerList[3]}
        {listOfQuestions[4]}
        <div>
          <p>{imageAnswerText}</p>
          <p>{temp}</p>
          <ClonedImage src={imageAnswerImage} alt="sdg" />
        </div>
      </QuestionsAndAnswers>
      <RestartButton />
    </SummaryPage>
  )
}

export default Summary;

const FinalCitate = styled.p`
text-align: center;
`

const QuestionsAndAnswers = styled.div`
line-height: 2rem;
text-align: center;
`

const SummaryPage = styled.div`
text-align: center;
line-height: 3rem;
padding: 2rem;
`

const ClonedImage = styled(Image)`
  animation: none;
  transform: rotate(-120deg);
  width: 10rem;
`