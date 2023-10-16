import { doc, getDoc, updateDoc, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore"; 
import { firestore } from "../config";
import type { GroupEntity, ParticipantEntity } from "../types";


interface GroupDbModel {
    parents: string;
    participants: Array<{
        name: string;
        email: string;
        guesses: string[]
    }>;
    questions: Array<{
        question: string;
        answer: string;
       
    }>;
}
  

const groupConverter = {
    toFirestore(group: GroupEntity): GroupDbModel {
        return {
            parents: group.parents,
            participants: group.participants,
            questions: group.questions,
        }
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): GroupEntity {
        const data = snapshot.data(options) as GroupDbModel;

        return {
            id: snapshot.id,
            parents: data.parents, 
            participants: data.participants,
            questions: data.questions
        } as GroupEntity;
    }
}



async function fetchGroupById(id: string){
    const snapshot= await getDoc(
        doc(firestore, 'groups', id)
            .withConverter(groupConverter)
    );
    if(!snapshot.exists()){
        return undefined;
    }
    
    const group= snapshot.data();
    return group;
}


async function fetchOrCreateParticipant(id: string, name: string, email: string): Promise<ParticipantEntity | void> {
    try {
        console.log(`--> store new Participant ${name} in Group(${id})`);
        const group = await fetchGroupById(id);
        if(!group){
            console.log(`Group ${id} not found.`);
            return undefined;
        }

        const participant= group.participants.find((p)=> p.name === name && p.email === email);
        if(participant){
            console.log(`Participant already belongs to this group and has guesses:`);
            console.log(participant.guesses)
            
            return participant
        }

        group.participants.push({
            name,
            email,
            guesses: [],
            correctCount: 0,
        });

        await updateDoc( 
            doc(firestore, 'groups', id).withConverter(groupConverter), 
            group
        );

    }
    catch(e){
        console.log(`something failed in storeParticipant ${e}`)
    }
}

async function storeParticipantsGuesses(id: string, participantId: string, guesses: string[]): Promise<void> {
    try {
        
        console.log(`--> updateGroup(${id})`);
        const group = await fetchGroupById(id);
        if(!group){
            console.log(`Group ${id} not found.`);
            return undefined;
        }
    

        const participant= group.participants.find(participant => participant.name === participantId)
        if(!participant){
            console.log(`Participant ${participantId} not found.`);
            return undefined;
        }

        participant.guesses= guesses;
        
        console.log(group)
        
        await updateDoc( 
            doc(firestore, 'groups', id).withConverter(groupConverter), 
            group
        );
        

/*
        const q1 = query(collection(firestore, 'groups'), 
                // where("id", "==", id), 
                where("participant.name", "==", "Luke")
            ).withConverter(groupConverter);
        const docs= await getDocs(q1);
        console.log(docs)
        docs.forEach(doc => console.log(`   ${JSON.stringify(doc.data())}`))

        // const guess= group.questions[question]
                        // .guesses
                        // .find(guess => guess.participantId ===particpantId);
        
        // console.log(guess);

/*
        const dbGroup: Record<string, string | number>= {
            title: group.title,
        }
        if(group.quantity !== undefined){
            dbGroup['quantity'] = group.quantity;
        }
        if(group.units !== undefined){
            dbGroup['units'] = group.units;
        }
        
        const ref= doc(firestore, "groups", id).withConverter(groupConverterConverter)

        await updateDoc(ref, dbGroup);
        */

    } catch (e) {
        console.error("Error adding document: ", e);
        return undefined;
    }
}
/*

async function createItem(item: ItemDbModel): Promise<string | undefined> { 
    try {

        const dbItem: Record<string, string | number>= {
            title: item.title,
        }
        if(item.quantity !== undefined){
            dbItem['quantity'] = item.quantity;
        }
        if(item.units){
            dbItem['units'] = item.units;
        }

        const newId= slugify(item.title);
        await setDoc(doc(firestore, "items", newId), dbItem);

        return newId
    } catch (e) {
        console.error("Error adding document: ", e);
        return undefined;
    }
}


const createUser = async () => { 
    try {
    const docRef = await addDoc(collection(firestore, "users"), {
        first: "Luke",
        last: "Warner",
        born: 1981
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}
*/


export {
    fetchGroupById,
    fetchOrCreateParticipant,
    storeParticipantsGuesses,
}
