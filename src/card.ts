export enum SignContent {
    ContractSpellingBee = 'contract-spelling-bee.webp',
    GuildRound = 'guild-logo-round.webp',
    GuildSquare = 'guild-logo-square.webp',
    JustCauseWordle = 'just-cause-wordle.webp',
    MakerWeekGuild = 'maker-week-guild.webp',
    UnionMadeGithub = 'union-made-github.webp',
    WuerkerCartoon = 'wuerker-cartoon.webp',
    ContractCrossword = 'contract-crossword.webp'
}

export interface Card {
    id: number;
    value: SignContent;
    isFaceUp: boolean;
    isMatched: boolean;
}

const CARD_VALUES = Object.values(SignContent);

export function getInitialCards() {
    const initialCards = [...CARD_VALUES, ...CARD_VALUES].map((value, id) => ({
        value,
        id,
        isFaceUp: false,
        isMatched: false
    }));

    // https://stackoverflow.com/questions/48083353/i-want-to-know-how-to-shuffle-an-array-in-typescript
    let currentIndex = initialCards.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [initialCards[currentIndex], initialCards[randomIndex]] = [
        initialCards[randomIndex],
        initialCards[currentIndex]
        ];
    }

    return initialCards;
}