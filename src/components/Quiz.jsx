import { useState, useCallback } from "react"
import QUESTIONS from "../data/questions"
import Question from "./Question";
import Summary from "./Summary";
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);    
    
    
    const activeQuestionIndex = userAnswers.length;
    
    const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;
    
    const handleAnswerClick = useCallback(function handleAnswerClick(selectedAnswer) {
        setUserAnswers( (prevUserAnswers) => {
            const isCorrect = selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0];
            return [...prevUserAnswers, { answer: selectedAnswer, isCorrect }]
        });
        
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => {
        handleAnswerClick(null);
    }, [handleAnswerClick]);

    

    if (quizIsCompleted) {
        return (
            <Summary userAnswers={userAnswers}  />
        )
    }

   
    

    return (    
        <div id="quiz">
            <Question
                questionIndex={activeQuestionIndex} 
                onSelectAnswer={handleAnswerClick}
                onSkipAnswer={handleSkipAnswer}
                />
        </div>
    )
}