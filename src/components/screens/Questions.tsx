import { useState, FC } from 'react';
import { questions } from '../../data/questions';
import { type Question } from '../../data/questions'

const Questions = () => {
    const [count, setCount] = useState<number>(0);

    const storeAnswer = () => {
        setCount(count + 1);
    }

    const q= questions[count];

    return (
        <div className="flex flex-col p-4">
            <div className="text-6xl font-bold text-primary-focus font-display">Christina + Luke&apos;s Prenatal Pool</div>
            { q.type === 'text'
                 ? <TextQuestion question={q} />
                 : <MultipleChoiceQuestion question={q} />
            }
            <button 
                className="btn bg-primary w-full hover:bg-primary-focus font-display text-2xl"
                onClick={storeAnswer}
            >
                Save Answer
            </button>
        </div>
    )
}

interface RenderQuestionProps {
    question: Question;
}
const TextQuestion: FC<RenderQuestionProps> = ({
    question
}) => (
    <div className="border-l-primary border-l-8 my-8">
        <div className="border-primary border-2 border-l-8 bg-secondary p-4">

            <div className="text-4xl font-bold font-display">{question.text}</div>
            {question.subtext && <div className="text-zinc-700">{question.subtext}</div>}
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
                />
            </div> 
        </div>
    </div>
);


const MultipleChoiceQuestion: FC<RenderQuestionProps> = ({
    question
}) => (
    <div className="border-l-primary border-l-8 my-8">
        <div className="border-primary border-2 border-l-8 bg-secondary p-4">

            <div className="text-4xl font-bold font-display">{question.text}</div>
            {question.subtext && <div className="text-zinc-700">{question.subtext}</div>}
            <div className="form-control w-full max-w-xs my-4">
                {question.instructions && (
                    <label className="label text-zinc-500">
                        <span className="label-text">{question.instructions}</span>
                    </label>
                )}
                { question.options?.map((option, i) => (
                    <div key={i} className="flex gap-x-3 my-1">
                        <div className="flex h-6 items-center mt-1">
                            <input 
                                id="comments" 
                                name="comments"
                                type="checkbox" 
                                className="h-6 w-6 rounded-lg border-gray-300 text-primary focus:ring-primary" 
                            />
                        </div>
                        <div className="">
                            <label htmlFor="comments" className="text-lg font-bold">{option.text}</label>
                            <div className="text-gray-500 text-sm">{option.subtext}</div>
                        </div>
                    </div>
                    
                    
                    
                    
                   
                ))}
            </div> 
        </div>
    </div>
);

export default Questions;

/* 
<label key={i} className="label cursor-pointer">
    <input type="checkbox" checked={false} className="checkbox" />Foo
    <span className="">{option.text}</span> 
    <span className="label-text">{option.subtext}</span>
</label>
*/