import { useNavigate } from "react-router-dom"
import { useLocalStorage } from '~/hooks/useLocalStorage';

const JoinGroup = () => {
    const [name, setName] = useLocalStorage<string>('name', '');
    const [email, setEmail] = useLocalStorage<string>("email", '');
    const navigate = useNavigate();
    
    const handleSubmit = () => {
        navigate('/questions');
    }

    return (
        <div className="flex flex-col">
            <div className="container mx-auto px-20 mt-10">
                <div className="text-6xl font-bold text-primary-focus font-display">Christina + Luke&apos;s Prenatal Pool</div>
            </div>
            
         
            <div className="container mx-auto px-20 mt-10">
                
                
                <div className="flex flex-row justify-start">
                    <div className="w-1/3">
                    <div className="avatar">
                        <div className="w-64 mask mask-squircle">
                            <img src="/public/bump2.jpg" />
                        </div>
                    </div>
                    </div>
                    <div className="py-2 px-2 mt-2 w-2/3">
                        <p className="text-xl font-bold mb-3">Christina and Luke are having a girl!</p>
                        <p className="my-2">Celebrate with them by playing this baby-birthday guessing game.</p>
                        <p className="my-2">Just enter your name and email to get started. After the baby is born, we&apos;ll calculate the results, then contact you so you can see who guessed best.</p>
                    </div>
                    
                </div>
                
            </div>
     

            <div className="container mx-auto px-20 mt-16">
                <div className="flex flex-row justify-end">
                    <div className="w-2/5 mr-10 mt-4">
                        <div className="chat chat-end">
                                <div className="chat-bubble chat-bubble-accent text-xl font-bold">When will she be born?</div>
                        </div>
                        <div className="chat chat-start">
                            <div className="chat-bubble chat-bubble-neutral text-xl font-bold">How big will the bump get?</div>
                        </div>
                        <div className="chat chat-end">
                            <div className="chat-bubble chat-bubble-secondary text-xl font-bold">What will her name will be?</div>
                        </div>
                    </div>
                    <div className="py-4 px-4 w-3/5 bg-primary border-2 border-primary-focus rounded-xl">
                        <div className="text-xl font-bold mb-3">Enter your name and email to get started</div>
                        <div className="form-control w-full max-w-xs my-4">
                            <label className="label">
                                <span className="label-text">What is your name?</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Your first name or a nickname" 
                                className="input input-bordered input-primary w-full max-w-xs" 
                                value={name}
                                onInput={(e) => setName(e.currentTarget.value)}
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
                                value={email}
                                onInput={(e) => setEmail(e.currentTarget.value)}
                            />
                        </div>
                        <button 
                            className="btn bg-secondary border-secondary-content text-secondary-content w-full hover:bg-secondary-focus font-display text-2xl mt-4"
                            onClick={handleSubmit}
                        >
                            Let&apos;s Play!
                        </button>
                    </div>
                            
                </div>      
            </div>
            
          
    
        </div>
    )
}

export default JoinGroup