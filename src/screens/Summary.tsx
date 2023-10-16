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
    }

    return (
        <div className="flex flex-col">
            <div className="container mx-auto px-20 mt-10">
                <div className="text-6xl font-bold text-primary-focus font-display">Christina + Luke&apos;s Prenatal Pool</div>
            </div>
            
            
            <div className="container mx-auto px-20 mt-10">
                <p className="text-3xl font-bold mb-3 font-display">Thanks {name}! That&apos;s all the questions we have.</p>

                <div className="py-4 px-6 w-3/4">
                <div className="text-lg text-secondary-content text-xl">Your guesses: </div>
                {questions.map((question, i) => (
                    <div key={i} className="flex flex row my-1 list-disc border-l-8 border-secondary">
                        <div key={i} className="text-md pl-2 pr-4 pt-[3px]  border-b-2 border-secondary">{question.text}:</div>
                        <div className="text-xl pr-2 font-bold  border-b-2 border-secondary">{responses[i]}</div>
                    </div>
                ))}
            </div>
            </div>

            
            

            <div className="container mx-auto px-20 mt-10 ">
                <div className="pt-2 flex flex-row justify-between w-3/4">

                    <button 
                        className="btn bg-zinc-300 border-zinc-800 hover:bg-zinc-200 font-display text-2xl w-1/3 mr-2"
                        onClick={handleBackButtonClick}
                    >
                        Change My Guesses
                    </button>
                    
                    <button 
                        className="btn bg-primary border-primary-content hover:bg-primary-focus font-display text-2xl w-2/3"
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