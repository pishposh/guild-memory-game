enum SignContent {
    ContractSpellingBee = 'spelling-bee-answer-contract',
    GuildRound = 'round-tech-guild-logo',
    GuildSquare = 'square-tech-guild-logo',
    JustCauseWordle = 'wordle-answer-cause',
    MakerWeekGuild = 'scabby-the-rat',
    UnionMadeGithub = 'union-made-code',
    WuerkerCartoon = 'sad-AG',
    ContractCrossword = 'crossword-answer-contract'
}

export interface Card {
    id: string;
    value: SignContent;
    isFaceUp: boolean;
    isMatched: boolean;
}

const CARD_VALUES = Object.values(SignContent);

export function getInitialCards(): Card[] {
    const date = new Date().toISOString();

    return [...CARD_VALUES, ...CARD_VALUES]
        .map((value, index) => ({
            value,
            id: date + index,
            isFaceUp: false,
            isMatched: false
        }))
        // -1, 0, or 1: sorts randomly
        .sort(() => Math.floor(Math.random() * 3) - 1);
}