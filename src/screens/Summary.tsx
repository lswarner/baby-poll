import { useLocalStorage } from "~/hooks/useLocalStorage";

const Summary = () => {
    const [name] = useLocalStorage<string>('name');

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
                        <p className="text-xl font-bold mb-3">Thanks for playing {name}!</p>
                        <p className="my-2">Celebrate with them by playing this baby-birthday guessing game.</p>
                        <p className="my-2">Just enter your name and email to get started. After the baby is born, we&apos;ll calculate the results, then contact you so you can see who guessed best.</p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Summary;