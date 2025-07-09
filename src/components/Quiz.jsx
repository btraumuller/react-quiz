import { useState, useCallback, useRef } from "react"
import questions from "../data/questions"
import quixCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answersState, setAnswerState] = useState([])
    
    
    
    const activeQuestionIndex = userAnswers.length;
    
    const quizIsCompleted = activeQuestionIndex === questions.length;
    
    const handleAnserClick = useCallback(function handleAnswerClick(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers( (prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        });

        setTimeout(() => {
            if (selectedAnswer === questions[activeQuestionIndex].answers[0]){
                setAnswerState('correct')
            }else{
                setAnswerState('wrong')
            }
        }, 1000)

        setTimeout(() =>{
            setAnswerState('')
        }, 2000)
        
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => {
        handleAnserClick(null);
    }, [handleAnserClick]);

    

    if (quizIsCompleted) {
        return (
            <div id="summary">
                <img src={quixCompleteImg} alt="Quiz Complete" />
                <h2>Quiz Completed</h2>
            </div>
        )
    }

   
    

    return (    
        <div id="quiz">
            <Question
                key={activeQuestionIndex} 
                questionText={questions[activeQuestionIndex].text} 
                answers={questions[activeQuestionIndex].answers} 
                onSelectAnswer={handleAnserClick} 
                selectedAnswer={userAnswers[userAnswers.length-1]}
                answersState={answersState}
                onSkipAnswer={handleSkipAnswer}
                />
        </div>
    )
}