import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Question({questionText, answers, onSelectAnswer, selectedAnswer, answersState, onSkipAnswer, activeQuestionIndex}){
    return (
        <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={onSkipAnswer} />
                <h2>{questionText}</h2>
                <Answers
                    key={activeQuestionIndex} 
                    answers={answers} 
                    selectedAnswer={selectedAnswer}
                    answersState={answersState}
                    onSelect={onSelectAnswer}
                />
            </div>
    )
}