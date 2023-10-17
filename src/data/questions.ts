
export interface TextQuestion {
    text: string;
    subtext?: string;
    type: `text`;
    instructions?: string;
    placeholder?: string;
}

export interface MultipleChoiceQuestion {
    text: string;
    subtext?: string;
    type: `multiple choice`;
    options: Array<{text:string, subtext?: string}>;
    instructions?: string;
}

export const questions: Array<TextQuestion | MultipleChoiceQuestion> = [
    {
        text: `What will her birthday be?`,
        subtext: `The due date is November 7`,
        type: `text`,
        instructions: ``,
        placeholder: `November 7`
    } as TextQuestion,
    {
        text: `What time of day will she be born?`,
        subtext: "All time are MST, obvs",
        type: `multiple choice`,
        options: [
            { text: `Morning: 7am - Noon`}, 
            { text: `Afternoon: Noon - 5pm`}, 
            { text: `Evening: 5pm- 10pm`}, 
            { text: `Late Night: 10pm - 2 am`}, 
            { text: `Early Morning: 2am - 7am`}
        ],
    } as MultipleChoiceQuestion,
    {
        text: `What style will her FIRST name be?`,
        type: `multiple choice`,
        options: [
            { text: `Traditional`, subtext: `ex: Eleanor, Elizabeth, Mary, Rosemary, Sarah` },
            { text: `Family`, subtext: `ex: Christina, Janet, Herta or Catherine` },
            { text: `Popular`, subtext: `ex: Olivia, Sophia, Hazel or Ivy` },
            { text: `80's & 90's Throwback`, subtext: `ex: Jennifer, Heather, Ashley, Michelle` },
            { text: `Nature-themed`, subtext: `ex: Autumn, Daisy, River, Violet` },
            { text: `Hipster`, subtext: `ex: Beatrix, Cleo, Nova, Luna, Pandora` },
            { text: `Gender Neutral`, subtext: `Avery, Morgan, Parker, Taylor` },
        ],
    } as MultipleChoiceQuestion,
    {
        text: `What style will her MIDDLE name be?`,
        type: `multiple choice`,
        options: [
            { text: `Traditional`, subtext: `ex: Eleanor, Elizabeth, Mary, Rosemary, Sarah` },
            { text: `Family`, subtext: `ex: Christina, Janet, Herta or Catherine` },
            { text: `Popular`, subtext: `ex: Olivia, Sophia, Hazel or Ivy` },
            { text: "80's & 90's Throwback", subtext: `ex: Jennifer, Heather, Ashley, Michelle` },
            { text: `Nature-themed`, subtext: `ex: Autumn, Daisy, River, Violet` },
            { text: `Hipster`, subtext: `ex: Beatrix, Cleo, Nova, Luna, Pandora` },
            { text: `Gender Neutral`, subtext: `Avery, Morgan, Parker, Taylor` },
        ],
    },
    {
        text: `Guess the baby's name (or make a suggestion)`,
        subtext: `Maybe we'll pick your choice! (seriously)`,
        type: `text`,
    } as TextQuestion,
    {
        text: `How tall will she be?`,
        subtext: `The average girl measures 19.4". Owen was tall 21.25" tall.`,
        type: `text`,
        instructions: `Please use inches or cm.`,
        placeholder: `19.4"`
    } as TextQuestion,
    {
        text: `What will she weigh?`,
        subtext: `The average girl weighs 7 lb, 1 oz. Owen weighed 7 lb, 5 oz.`,
        type: `text`,
        instructions: `Please use lbs, oz or kg.`,
        placeholder: `7 lb, 1 oz`,
    } as TextQuestion,
    {
        text: `How big will the bump get?`,
        subtext: `Hint: Christina normally has a 28" waist, but was at 42.75" on October 12.`,
        type: `text`,
        instructions: `Please use inches or cm.`,
        placeholder: `43.3"`
    } as TextQuestion
]