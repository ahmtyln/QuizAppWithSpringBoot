import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { fetchQuizForUser } from '../../utils/QuizService'

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([{
    id: "", correctAnswers: "", question: "", questionType : ""
  }])
  const[selectedAnswers, setSelectedAnswers] = useState([{id:"", answer:""}])
  const[currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const[totalScores, setTotalScores] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const {selectedSubject, selectedNumOfQuestion} = location.state

  useEffect(() => {
    fetchQuizData()
  },[])

  const fetchQuizData = async() =>{
    if(selectedNumOfQuestion && selectedSubject){
      const questions = await fetchQuizForUser(selectedNumOfQuestion, selectedSubject)
      setQuizQuestions(questions)
    }
  }

  const handleAnswerChange = (questionId, answer) =>{
    setSelectedAnswers((prevAnswers) =>{
      const existingAnswerIndex = prevAnswers.findIndex((answerObj) =>answerObj.id === questionId)
      const selectedAnswer = Array.isArray(answer) ? answer.map((a) => a.charAt(0)) : answer.charAt(0)
      if(existingAnswerIndex !== -1){
        const updatedAnswer =[...prevAnswers]
        updatedAnswers[existingAnswerIndex] ={id:questionId,answer:selectedAnswer}
        return updatedAnswers
      }else{
        const newAnswer = {id:questionId, answer:selectedAnswer}
        return [...prevAnswers, newAnswer]
      }
    })
  }

  const isChecked = (questionId, choice) =>{
    const selectedAnswer = selectedAnswers.find((answer) => answer.id === questionId)
    if(!selectedAnswer){
      return false
    }
    if(Array.isArray(selectedAnswer.answer)){
      return selectedAnswer.answer.includes(choice.charAt(0))
    }

    return selectedAnswer.answer === choice.charAt(0)
  }

  const handleCheckboxChange = (questionId,choice) =>{
     setSelectedAnswers((prevAnswers) =>{
      const existingAnswerIndex = prevAnswers.findIndex((answerObj) =>answerObj.id === questionId)
      const selectedAnswer = Array.isArray(choice) ? choice.map((c) => c.charAt(0)) : choice.charAt(0)
      if(existingAnswerIndex !== -1){
        const updatedAnswer =[...prevAnswers]
        const existingAnswers=updatedAnswers[existingAnswerIndex].answer
        let newAnswer
        if(Array.isArray(existingAnswers)){
          newAnswer=existingAnswers.includes(selectedAnswer) ? existingAnswers.filter((a) => a !== selectedAnswer)
          : [...existingAnswers, selectedAnswer]
        }else{
          newAnswer=[existingAnswers, selectedAnswer]
        }
      }
    })
     
  }

  return (
    <div>Quiz</div>
  )
}

export default Quiz;