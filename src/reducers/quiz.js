/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit'
import venus from '../images/venus.png'
import neptune from '../images/neptune.png'
import mercury from '../images/mercury.png'
import mars from '../images/mars.png'
// Change these to your own questions!
const questions = [
  { id: 1,
    questionText: 'Which is the brightest comet in the solar system?',
    options: ["Hayley's commet", "Herschel's commet", "Ganymed's commet", "Ether's commet"],
    correctAnswerIndex: 0 },
  { id: 2,
    questionText: 'What name was given to the invisible material once thought to occupy all space?',
    options: ['Black mud', 'Ether', 'Black hole', 'Tenebrosus'],
    correctAnswerIndex: 1 },
  { id: 3,
    questionText: 'The sun is made up of mostly which gas?',
    options: ['Neon', 'Helium', 'Oxygen', 'Hydrogen'],
    correctAnswerIndex: 1 },
  { id: 4,
    questionText: 'Approximately how many times bigger than Earth is Jupiter?',
    options: ['15 times', '23 times', '5 times', '11 times'],
    correctAnswerIndex: 3 },
  { id: 5,
    questionText: 'Choose which of the following planets is Mercury?',
    options: [
      {
        name: 'Venus',
        img: `${venus}`
      },
      {
        name: 'Mercury',
        img: `${mercury}`
      },
      {
        name: 'Mars',
        img: `${mars}`
      },
      {
        name: 'Neptune',
        img: `${neptune}`
      }
    ],
    correctAnswerIndex: 1 }
]
const initialState = {
  questions, /* can also be written questions: questions, */
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
}
export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => { /* : properties inside the object that work as functions */
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)
      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }
      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }
      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },
    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },
    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }
  }
})
