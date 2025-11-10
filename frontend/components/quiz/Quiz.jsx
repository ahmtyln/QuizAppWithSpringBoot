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

  return (
    <div>Quiz</div>
  )
}

export default Quiz;