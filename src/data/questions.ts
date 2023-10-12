
export interface Question {
    text: string;
    subtext?: string;
    type: `text` | `multiple choice`;
    options?: Array<{text:string, subtext?: string}>;
    instructions?: string;
    placeholder?: string;
}

export const questions: Array<Question> = [
    {
        text: `What will her birthday be?`,
        subtext: `The due date is November 7`,
        type: `text`,
        instructions: `Enter your answer with the full month written out`,
        placeholder: `November 7`
    },
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
    },
    {
        text: `What style will her FIRST name be?`,
        type: `multiple choice`,
        options: [
            { text: `Traditional`, subtext: `ex: Eleanor, Elizabeth, Mary, Rosemary, Sarah` },
            { text: `Family`, subtext: `ex: Christina, Janet, Herta or Catherine` },
            { text: `Popular`, subtext: `ex: Olivia, Sophia, Hazel or Ivy` },
            { text: `80's & 90's Throwback`, subtext: `ex: Jennifer, Heather, Ashley, Michelle` },
            { text: `Nature-theme`, subtext: `ex: Autumn, Daisy, River, Violet` },
            { text: `Hipster`, subtext: `ex: Beatrix, Cleo, Nova, Luna, Pandora` },
            { text: `Gender Neutral`, subtext: `Avery, Morgan, Parker, Taylor` },
        ],
    },
    {
        text: `What style will her MIDDLE name be?`,
        type: `multiple choice`,
        options: [
            { text: `Traditional`, subtext: `ex: Eleanor, Elizabeth, Mary, Rosemary, Sarah` },
            { text: `Family`, subtext: `ex: Christina, Janet, Herta or Catherine` },
            { text: `Popular`, subtext: `ex: Olivia, Sophia, Hazel or Ivy` },
            { text: "80's & 90's Throwback", subtext: `ex: Jennifer, Heather, Ashley, Michelle` },
            { text: `Nature-theme`, subtext: `ex: Autumn, Daisy, River, Violet` },
            { text: `Hipster`, subtext: `ex: Beatrix, Cleo, Nova, Luna, Pandora` },
            { text: `Gender Neutral`, subtext: `Avery, Morgan, Parker, Taylor` },
        ],
    },
    {
        text: `Guess the baby's full name (or make a suggestion)`,
        subtext: `Maybe we'll pick your choice! (seriously)`,
        type: `text`,
    },
    {
        text: `How tall will she be?`,
        subtext: `The average girl measures 19.4". Owen was tall.`,
        type: `text`,
        instructions: `Please use inches ("). This is an American app and it does not know metric.`,
        placeholder: `19.4"`
    },
    {
        text: `What will she weight?`,
        subtext: `The average girl weighs 7 lb, 1 oz. Owen weighed 7 lb, 5 oz.`,
        type: `text`,
        instructions: `Please use lbs and oz. Again, no hablo metric.`,
        placeholder: `7 lb, 1 oz`,
    },
    {
        text: `How big will the bump get?`,
        subtext: ``,
        type: `text`,
        instructions: `Please inches (") people.`,
        placeholder: ``
    }
]