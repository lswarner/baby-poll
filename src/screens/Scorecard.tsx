import { useState, useEffect } from 'react'
import { fetchGroupById, type GroupEntity } from "~/firebase";
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { questions } from '~/data/questions';
import { parse, format } from 'date-fns'

interface QuestionAndGuess {
    question: string;
    guesses: Map<string, string[]>;
}


type SorterParam = [key: string, value: string[]];


const sortTimeOfDay = (a: SorterParam, b: SorterParam) => {
    const sortedTimes= [
        `Early Morning: 2am - 7am`,
        `Morning: 7am - Noon`, 
        `Afternoon: Noon - 5pm`,
        `Evening: 5pm- 10pm`,
        `Late Night: 10pm - 2 am`,
    ];
    const aI = sortedTimes.indexOf(a[0]);
    const bI = sortedTimes.indexOf(b[0]);
    console.log(`   ${a} is ${aI} & ${b} is ${bI}`);
  
    return aI - bI
}


const sorters = [
    null,
    sortTimeOfDay,
    null,
    null,
    null,
    null,
    null,
    null
]


const displayDate = (d: string) => {
    try{
        const parsed= parse(d, 'MM/dd', new Date());
        const formatted= format(parsed, 'MMMM do');
        console.log(`display date: ${parsed} => ${formatted}`);

        return formatted
    }
    catch(e){
        console.log(`Error parsing and formatting date ${d}: ${e}`);
        return d;
    }
    
}

// const displayInches = (d: string) => `${d}"`
 
const formatGuessForDisplay = (i: number, guess: string): string => {
    const formatters= [
        displayDate,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];

    if(formatters[i] !== null){
        // @ts-ignore
        return formatters[i](guess)
    }
    return guess
}




const Scorecard = () => {
    const [groupId] = useLocalStorage<string>('groupId');
    const [group, setGroup] = useState<GroupEntity>();
    const [questionsAndGuesses, setQuestionsAndGuesses]= useState<QuestionAndGuess[]>()
    

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

            const sortedGuesses = sorters[i] !== null
                /* @ts-ignore */
                ? new Map([...guesses.entries()].sort(sorters[i]))
                : new Map([...guesses.entries()].sort())

            return {
                question: q.text,
                guesses: sortedGuesses,
            }

        });

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
                    const bgColor = i %2 ? 'bg-primary' : 'bg-secondary';
                    const borderColor = i %2 ? 'border-primary-focus' : 'border-secondary-focus';

                    return (
                     <div className="flex flex-row mt-4" key={i}>
                         <div className="hidden md:block md:w-1/5 text-5xl font-display text-primary-content py-4 px-4">
                             <div className={`${borderColor} border-r-4 border-b-4 pt-4 rounded-full w-20 h-20 text-center`}>
                                 {i + 1}
                             </div>
                             
                         </div>
                        <div className={`w-full lg:w-3/5 ${bgColor} p-4 rounded-xl`}>
                            <div className="text-4xl font-bold font-display pb-2 flex flex-row">
                                <div className="md:hidden w-1/5 border-black border-r-4 border-b-4 pt-2 text-3xl rounded-full w-12 h-12 text-center">
                                    {i + 1}
                                </div>
                                <div className="w-4/5 md:w-full ml-2 md:ml-0">{question}</div>
                            </div>
                            <div className="bg-white px-4 py-1 rounded-md">
                                {[...guesses].map( ([guess, names], ii) => (
                                    <div className={`flex flex-col py-2 border-b-2 ${borderColor} last:border-none`} key={ii}>
                                        <div className="text-lg font-bold pr-2">{formatGuessForDisplay(i, guess)}</div>
                                        <div className="text-slate-700 pl-6">{names.join(', ')}</div> 
                                    </div> 
                                ))}
                            </div>
                        </div>
                    </div>
                
                )} )}
            </div>
            <div className="container mx-auto px-2 mt-6 md:px-20 md:mt-10">
                <div className="text-4xl md:text-2xl font-bold text-primary-focus font-display">Check back when the baby is born to see who guessed best!</div>
            </div>
        </div>
    )
}

export default Scorecard