import { useLocalStorage } from "~/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { questions } from '../data/questions';
import { storeParticipantsGuesses } from "~/firebase";

const Summary = () => {
    const [name] = useLocalStorage<string>('name');
    const [responses] = useLocalStorage<string[]>('responses');
    const navigate = useNavigate();


    const handleBackButtonClick = () => {
        navigate('/questions')
    }

    const handleSaveResponses = async () => {
        await storeParticipantsGuesses('7HaxvKxuQ6MHqSYwp3Uz', name, responses);
        navigate('/scorecard')
    }

    return (
        <div className="flex flex-col">
            <div className="container mx-auto px-2 mt-6 md:px-20 md:mt-10">
                <div className="text-4xl md:text-6xl font-bold text-primary-focus font-display">Christina + Luke&apos;s Baby Pool</div>
            </div>
            
            
            <div className="container mx-auto px-2 mt-6 md:px-20 md:mt-10">
                <p className="text-2xl font-bold mb-3 font-display">Thanks {name}! That&apos;s all the questions we have.</p>

                <div className="py-4 px-2 md:w-3/4">
                <div className="text-lg text-secondary-content text-xl">Your guesses: </div>
                {questions.map((question, i) => (
                    <div key={i} className="flex flex-col md:flex-row my-1 list-disc border-l-8 border-secondary border-b-2 md:border-none">
                        <div key={i} className="text-md pl-2 pr-4 pt-[3px] md:border-secondary md:border-b-2">{question.text}:</div>
                        <div className="text-lg pr-2 font-bold pl-8 md:pl-0 md:border-secondary md:border-b-2">{responses[i]}</div>
                    </div>
                ))}
            </div>
            </div>

            
            

            <div className="container mx-auto px-2 mt-2 md:px-20 md:mt-10 ">
                <div className="pt-2 flex flex-row justify-between md:w-3/4">

                    <button 
                        className="btn bg-zinc-300 border-zinc-800 hover:bg-zinc-200 font-display text-xl w-1/2 md:w-1/3 mr-2"
                        onClick={handleBackButtonClick}
                    >
                        Change My Guesses
                    </button>
                    
                    <button 
                        className="btn bg-primary border-primary-content hover:bg-primary-focus font-display text-2xl w-1/2 md:w-2/3"
                        onClick={handleSaveResponses}
                    >
                        Finish
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Summary;