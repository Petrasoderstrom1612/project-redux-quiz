import React from 'react';
/* import styled from 'styled-components'; */
import { useSelector } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';

export const ProgBar = () => {
  const question = useSelector(
    (store) => store.quiz.questions[store.quiz.currentQuestionIndex]
  );

  const percentage = (question.id / 5) * 100 - 20;
  const questionsLeft = (6 - question.id);
  const progressInstance = (
    <ProgressBar> <div style={{ color: 'white' }}>{`Completed ${percentage}%`}</div> <div style={{ color: 'white' }}>{`Questions left: ${questionsLeft}/5`}</div></ProgressBar>
  );

  return progressInstance;
};

