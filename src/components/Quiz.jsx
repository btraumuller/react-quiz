import { useState, useCallback } from "react"
import questions from "../data/questions"
import quixCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answersState, setAnswerState] = useState([])
    
    const activeQuestionIndex = answersState === '' ? userAnswers.length: answersState.length -1;
    
    const handleAnserClick = useCallback(function handleAnswerClick(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers( (prevUserAnswers) => {
            return [...prevUserAnswers, answer]
        });

        setTimeout(() => {
            if (selectedAnswer = questions[activeQuestionIndex].answers[0]){
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

    const quizIsCompleted = activeQuestionIndex === questions.length;

    if (quizIsCompleted) {
        return (
            <div id="summary">
                <img src={quixCompleteImg} alt="Quiz Complete" />
                <h2>Quiz Completed</h2>
            </div>
        )
    }

    const shuffledAnswers = [...questions[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (    
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
                <h2>{questions[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer, index) => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;
                        let cssClass = '';

                        if (answersState === 'answered' && isSelected) {
                            cssClass = 'selected';
                        }

                        if (answersState === 'correct' || answersState === 'wrong' && isSelected) {
                            cssClass = answersState;
                        } 

                        return (
                            <li key={index} className="answer">
                                <button onClick={() => handleAnserClick(answer)} className={cssClass}>
                                    {answer}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}