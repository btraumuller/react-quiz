import {useRef} from 'react';
export default function Answers({answers, selectedAnswer, answersState, onSelect}){

    const shuffledAnswers = useRef();
    
    if (!shuffledAnswers.current){
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer, index) => {
                const isSelected = selectedAnswer === answer;
                let cssClass = '';

                if (answersState === 'answered' && isSelected) {
                    cssClass = 'selected';
                }

                if (answersState === 'correct' && isSelected) {
                    cssClass = 'correct';
                } else if (answersState === 'wrong' && isSelected) {
                    cssClass = 'wrong';
                } 

                return (
                    <li key={index} className="answer">
                        <button onClick={() => onSelect(answer)} className={cssClass} disabled={answersState !== ''}>
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    )
}