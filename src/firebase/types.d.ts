interface EntityCollection<T> {
    ids: string[];
    entities: Record<string, T>;
}
interface QuestionEntity {
    id: string;
    question: string;
    answer: string;
}

interface ParticipantEntity {
    name: string;
    email: string;
    guesses: string[];
    correctCount: number;
}

interface GroupEntity {
    id: string;
    parents: string;
    questions: QuestionEntity[];
    participants: ParticipantEntity[];
}



export type {
    EntityCollection,
    GroupEntity,
    QuestionEntity,
    ParticipantEntity,
}