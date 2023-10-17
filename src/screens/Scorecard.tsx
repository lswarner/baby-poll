import { useState, useEffect } from 'react'
import { fetchGroupById, type GroupEntity } from "~/firebase";
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { questions } from '~/data/questions';

const Scorecard = () => {
    const [groupId] = useLocalStorage<string>('groupId');
    const [group, setGroup] = useState<GroupEntity>();
    const [questionsAndGuesses, setQuestionsAndGuesses]= useState<{
        question: string;
        guesses: Map<string, string[]>;
    }[]>()
    

      // fetch the group from db after groupId is set
      useEffect(()=>{
        const initializeGroup = async () => {
            console.log(groupId)
            if(groupId){
                console.log(`<<< Fetching Group ${groupId}`)
                const group = await fetchGroupById(groupId);
                setGroup(group);
            }
        }

        initializeGroup();
    }, []);

    useEffect(() => {

        /*
            participants: [
                {'Luke',   guesses: ['a1','b1','c1']},
                {'Vesper', guesses: ['a2','b1','c1']},
            ]

            guesses: [
                {
                    'a1': ['Luke'],
                    'a2': ['Vesper']
                },
                {
                    'b1': ['Luke', 'Vesper']
                }
                
            ]

        */
       

        const qAndG = questions.map((q, i) => {
            const guesses= new Map<string, string[]>();
            
            group?.participants.forEach(p => {
                const guess = p.guesses[i];
                if(!guess){
                    return
                }
                if(!guesses.has(guess)){
                    guesses.set(guess, [p.name]);
                }
                else {
                    const names =guesses.get(guess);
                    if(names){
                        guesses.set(guess, names?.concat(p.name))
                    } 
                }
            })

            return {
                question: q.text,
                guesses
            }

        });


        console.log(qAndG)
        setQuestionsAndGuesses(qAndG);

    }, [group]);

    



    return (
        <div className="flex flex-col">
            <div className="container mx-auto px-2 mt-6 md:px-20 md:mt-10">
                <div className="text-4xl md:text-6xl font-bold text-primary-focus font-display">Christina + Luke&apos;s Baby Pool</div>
            </div>
            
            
            <div className="container mx-auto px-2 mt-6 md:px-20 md:mt-10">
                <div>Here&apos;s what the rest of the group is guessing.</div>
                { questionsAndGuesses?.map(({question, guesses}, i) => {
                    const color = i %2 ? 'primary' : 'secondary';

                    return (
                     <div className="flex flex-row mt-4" key={i}>
                         <div className="hidden md:block md:w-1/5 text-5xl font-display text-primary-content py-4 px-4">
                             <div className={`border-${color} border-r-4 border-b-4 pt-4 rounded-full w-20 h-20 text-center`}>
                                 {i + 1}
                             </div>
                             
                         </div>
                        <div className={`w-full md:w-3/5 bg-${color} p-4 rounded-xl`}>
                            <div className="text-4xl font-bold font-display pb-2 flex flex-row">
                                <div className="md:hidden w-1/5 border-black border-r-4 border-b-4 pt-2 text-3xl rounded-full w-12 h-12 text-center">
                                    {i + 1}
                                </div>
                                <div className="w-4/5 md:w-full ml-2 md:ml-0">{question}</div>
                            </div>
                            <div className="bg-white px-4 py-1 rounded-md">
                                {[...guesses].map( ([guess, names], ii) => (
                                    <div className={`flex flex-col py-2 border-b-2 border-${color} last:border-none`} key={ii}>
                                        <div className="text-lg font-bold pr-2">{guess}</div>
                                        <div className="text-slate-700 pl-6">{names.join(', ')}</div> 
                                    </div> 
                                ))}
                            </div>
                        </div>
                    </div>
                
                )} )}
            </div>
        </div>
    )
}

export default Scorecard