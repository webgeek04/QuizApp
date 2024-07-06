import { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assests/data'

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const option_arr = [Option1, Option2, Option3, Option4];

    const checkAns = (e, ans) => {
        if (lock == false) {
            if (question.ans == ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(score + 1);
            }
            else {
                e.target.classList.add("wrong");
                setLock(true);
                option_arr[question.ans - 1].current.classList.add("correct");
            }
        }
    }

    const handleButtonClick = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(index + 1);
            setQuestion(data[index]);
            setLock(false);
            option_arr.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const handleReset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false)
    }

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {result ? <></>
                :
                <>
                    <h2>{index + 1}.{question.question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                        <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                        <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                        <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                    </ul>
                    <button onClick={handleButtonClick}>Next</button>
                    <div className='index'>{index + 1} of {data.length}</div>
                </>
            }
            {result ?
                <>
                    <h2>Your Score: {score} Out Of  {data.length}</h2>
                    <button onClick={handleReset}>Reset</button>
                </>
                :
                <></>}

        </div>
    );
};

export default Quiz;