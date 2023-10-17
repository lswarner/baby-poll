import React, { useState, FC, useEffect, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom"
import { questions } from '../data/questions';
import type { TextQuestion, MultipleChoiceQuestion } from '../data/questions'
import { useLocalStorage } from '~/hooks/useLocalStorage';


const Questions = () => {
    const [count, setCount] = useState<number>(0);
    const [responses, setResponses] = useLocalStorage<string[]>('responses', []);
    const navigate = useNavigate();

    const storeGuess = async (guess: string) => {
        console.log(`storing new guess: ${guess}`);

        // store guess locally
        const newResponses= responses;
        newResponses[count] = guess;
        setResponses(newResponses);
        console.log(`updated responses: ${JSON.stringify(newResponses)}`)
        
        if(count < questions.length - 1){
            setCount(count + 1);
        }
        else {
            navigate('/summary')
        }
    }

    useEffect(() => {
        console.log(responses.join('\n'))
    }, [count])

    const q= questions[count];

    return (
        <div className="flex flex-col">
            
            <div className="container mx-auto px-2 mt-6 md:px-20 md:mt-10">
                <div className="text-4xl md:text-6xl font-bold text-primary-focus font-display">Christina + Luke&apos;s Baby Pool</div>
            </div>

            <div className="container mx-auto px-2 mt-6 md:px-20 md:mt-10 w-full md:w-4/5">
                <div className="flex flex-row">
                    <div className="hidden md:block w-1/5 text-5xl font-display text-primary-content py-4 px-4">
                        <div className="border-secondary border-r-4 border-b-4 pt-4 rounded-full w-20 h-20 text-center">
                            {count + 1}
                        </div>
                        
                    </div>
                    <div className="w-full md:w-4/5 bg-secondary p-4 rounded-xl">
                        <div className="flex flex-row">
                            <div className="md:hidden w-1/5 border-black border-r-4 border-b-4 pt-2 text-3xl rounded-full w-12 h-12 text-center">
                                {count + 1}
                            </div>
                            <div className="w-4/5 md:w-full ml-2 md:ml-0 flex flex-col">
                                <div className="text-4xl font-bold font-display">{q.text}</div>
                                {q.subtext && <div className="text-zinc-700">{q.subtext}</div>}
                            </div>
                        </div>
                        
                        { q.type === 'text'
                            ? <RenderTextQuestion 
                                question={q} 
                                storedGuess={responses[count]} 
                                onBackButton={() => setCount(count - 1)}
                                onSubmit={storeGuess} 
                                isFirst={count === 0}
                            />
                            : <RenderMultipleChoiceQuestion 
                                storedGuess={responses[count]} 
                                question={q} 
                                onBackButton={()=>setCount(count - 1)}
                                onSubmit={storeGuess} 
                                isFirst={count === 0}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


interface RenderTextQuestionProps {
    question: TextQuestion;
    storedGuess: string | undefined;
    onBackButton: () => void;
    onSubmit: (v:string) => void;
    isFirst: boolean;
}
const RenderTextQuestion: FC<RenderTextQuestionProps> = ({
    question,
    storedGuess,
    onBackButton,
    onSubmit,
    isFirst,
}) => {
    const [guess, setGuess] = useState<string>();
    // console.log(`Question ${question.text} has a stored guess: '${storedGuess}' and current guess '${guess}'`);

    useEffect(() => {
        if(storedGuess){
            setGuess(storedGuess);
        }
    }, [storedGuess])

    const handleBackButtonClick = () => {
        onBackButton();
        setGuess('');

    }
    const handleButtonClick = () => {
        if(guess){
            console.log(`submitting guess: ${guess}`)
            onSubmit(guess);
            setGuess('');
        }
    }

    return (
            <>
                <div className="form-control w-full max-w-xs my-4">
                    {question.instructions && (
                        <label className="label text-zinc-500">
                            <span className="label-text">{question.instructions}</span>
                        </label>
                    )}
                    <input 
                        type="text" 
                        placeholder={question.placeholder} 
                        className="input input-bordered input-primary w-full max-w-xs" 
                        value={guess}
                        onInput={(e) => setGuess(e.currentTarget.value)}
                    />
                </div> 
                <div className={`pt-2 flex flex-row ${isFirst ? 'justify-end' : 'justify-between'}`}>

                    { !isFirst && <button 
                        className="btn bg-zinc-300 border-zinc-800 hover:bg-zinc-200 font-display text-2xl w-1/3 mr-2"
                        onClick={handleBackButtonClick}
                    >
                        Back
                    </button>
                    }
                    <button 
                        className="btn bg-primary border-primary-content hover:bg-primary-focus font-display text-2xl w-2/3"
                        onClick={handleButtonClick}
                    >
                        Save Answer
                    </button>
                </div>
            </>
        
    )
};

interface RenderMultipleChoiceQuestionProps {
    question: MultipleChoiceQuestion;
    storedGuess: string | undefined;
    onBackButton: () => void;
    onSubmit: (v: string) => void;
    isFirst: boolean;
}

const RenderMultipleChoiceQuestion: FC<RenderMultipleChoiceQuestionProps> = ({
    question,
    storedGuess,
    onBackButton,
    onSubmit,
    isFirst,
}) => {
    const [selectedIndex, setSelectedIndex]= useState<number>();

    // console.log(`Question ${question.text} has a stored guess: '${storedGuess}' and current guess '${selectedIndex ? question.options[selectedIndex].text : ''}'`);

    useEffect(() => {
        if(storedGuess){
            question.options.forEach((option, i) => {
                if(option.text === storedGuess){
                    setSelectedIndex(i);
                }
            });
        }
    }, [question, storedGuess]);


    const selectOption = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedIndex(Number.parseInt(e.target.value));
    }

    const handleBackButtonClick = () => {
        onBackButton();
        setSelectedIndex(undefined);

    }

    const handleButtonClick = () => {
        if(selectedIndex !== undefined && question.options[selectedIndex]){
            onSubmit(question.options[selectedIndex].text); 

            // cleanup
            setSelectedIndex(undefined);
        }
    }

    useEffect(()=>{
        // console.log(`index: ${selectedIndex}`)
    }, [selectedIndex]);

    return (
        <>
            <div className="form-control w-full max-w-xs my-4">
                {question.instructions && (
                    <label className="label text-zinc-500">
                        <span className="label-text">{question.instructions}</span>
                    </label>
                )}
                { question.options?.map((option, i) => {
                    // console.log(`${typeof i} =?= ${typeof selectedIndex}: ${i === selectedIndex}`)
                    return (
                    <div key={i} className="flex gap-x-3">
                        <div className="flex h-6 items-center mt-1">
                            <input 
                                key={i}
                                id="comments" 
                                name="comments"
                                type="checkbox"
                                checked={i === selectedIndex ? true : undefined}
                                value={i}
                                className="h-6 w-6 checkbox checkbox-primary border-primary-content rounded-lg hover:border-primary-content hover:bg-secondary-focus" 
                                onChange={selectOption}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="comments" className="text-lg font-bold">{option.text}</label>
                            <div className="text-gray-500 text-sm">{option.subtext}</div>
                        </div>
                    </div>
                )})}
            </div>

            <div className={`flex flex-row ${isFirst ? 'justify-end' : 'justify-between'}`} >
                { !isFirst && <button 
                    className="btn bg-zinc-300 border-zinc-800 hover:bg-zinc-200 font-display text-2xl w-1/3 mr-2"
                    onClick={handleBackButtonClick}
                >
                    Back
                </button>
                }
                <button 
                    className="btn bg-primary border-primary-content  hover:bg-primary-focus font-display text-2xl w-2/3"
                    onClick={handleButtonClick}
                >
                    Save Answer
                </button>
            </div>
        </>
    )
}

export default Questions;

/* 
<label key={i} className="label cursor-pointer">
    <input type="checkbox" checked={false} className="checkbox" />Foo
    <span className="">{option.text}</span> 
    <span className="label-text">{option.subtext}</span>
</label>
*/