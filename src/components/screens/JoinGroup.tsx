import { useNavigate } from "react-router-dom"

const JoinGroup = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/questions');
    }

    return (
        <div className="flex flex-col p-4">
            <div className="text-6xl font-bold text-primary-focus font-display">Christina + Luke&apos;s Prenatal Pool</div>
            <div className="flex flex-row justify-between">
                <div className="py-2 px-2 mt-2 w-1/2">
                    <p className="text-xl font-bold mb-3">Christina and Luke are having a girl!</p>
                    <p className="my-2">Celebrate with them by playing this baby-birthday guessing game.</p>
                    <p className="my-2">Just enter your name and email to get started. We&apos;ll contact you when the baby is born so you can see who guessed best.</p>
                </div>
                <div className="w-2/5">
                    <div className="chat chat-end">
                            <div className="chat-bubble chat-bubble-primary text-xl font-bold">When will she be born?</div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-bubble chat-bubble-neutral text-xl font-bold">How big will the bump get?</div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble chat-bubble-secondary text-xl font-bold">What will her name will be?</div>
                    </div>
                </div>
            </div>

            <div className="border-l-primary border-l-8 my-8">
                <div className="border-primary border-2 border-l-8 bg-secondary p-4">

                    <div className="text-xl font-bold mb-3">Enter your name and email to get started</div>
                    <div className="form-control w-full max-w-xs my-4">
                        <label className="label">
                            <span className="label-text">What is your name?</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Choose a name people know you by, like your first name or a nickname" 
                            className="input input-bordered input-primary w-full max-w-xs" 
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">What is your email?</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="you@email.com" 
                            className="input input-bordered inout-primary w-full max-w-xs" 
                        />
                    </div>
                    
                </div>
            </div>
            <button 
                className="btn bg-primary w-full hover:bg-primary-focus font-display text-2xl"
                onClick={handleSubmit}
            >
                Let&apos;s Play!
            </button>
    
        </div>
    )
}

export default JoinGroup