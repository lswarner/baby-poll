import { useLocalStorage } from "~/hooks/useLocalStorage";
import { questions } from '../data/questions';
import { storeParticipantsGuesses } from "~/firebase";

const Summary = () => {
    const [name] = useLocalStorage<string>('name');
    const [responses] = useLocalStorage<string[]>('responses');


    const handleSaveResponses = async () => {
        await storeParticipantsGuesses('7HaxvKxuQ6MHqSYwp3Uz', name, responses)
    }

    return (
        <div className="flex flex-col">
            <div className="container mx-auto px-20 mt-10">
                <div className="text-6xl font-bold text-primary-focus font-display">Christina + Luke&apos;s Prenatal Pool</div>
            </div>
            
            
            <div className="container mx-auto px-20 mt-10">
                <p className="text-xl font-bold mb-3">Thanks for playing {name}!</p>

                <div className="text-lg text-secondary">Your guesses: </div>
                {questions.map((question, i) => (
                    <div key={i} className="text-md">{question.text}: {responses[i]}</div>
                ))}
                
            </div>

            <button 
                className="btn bg-primary border-primary-content hover:bg-primary-focus font-display text-2xl w-2/3"
                onClick={handleSaveResponses}
            >
                Finish!
            </button>
        </div>
    )
}

export default Summary;