import quixCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from '../data/questions';

export default function Summary({userAnswers}){

const skippedAnswers = userAnswers.filter((answerObj) => answerObj.answer === null)
const correctAnswers = userAnswers.filter ((answerObj) => answerObj.isCorrect === true)
const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    return  (
        <div id="summary">
            <img src={quixCompleteImg} alt="Quiz Complete" />
            <h2>Quiz Completed</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedAnswersShare}%</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className="number">{correctAnswersShare}%</span>
                    <span className="text">answered correctly</span>
                </p>
                <p>
                    <span className="number">{wrongAnswersShare}%</span>
                    <span className="text">answered incorrectly</span>
                </p>
            </div>
            <ol>
                {
                    userAnswers.map((answerObj, index) =>{
                        let cssClass = 'user-answer';
                        if (answerObj.answer === null){
                            cssClass += ' skipped';
                        } else if (answerObj.isCorrect){
                            cssClass += ' correct';
                        }else{
                            cssClass += ' wrong';
                        }
                        return (
                            <li key={index}>
                                <h3>{index + 1}</h3>
                                <p className="question">{QUESTIONS[index].text}</p>
                                <p className={cssClass}>{answerObj.answer ?? 'Skipped'}</p>
                            </li>
                        )
                    })
                }
                
            </ol>
        </div>
    )
}