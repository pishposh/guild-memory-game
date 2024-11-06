import { Card, getInitialCards } from './card';

export interface Game {
    handleEnd(): Game;
    handleClick(card: Card): Game;
    resetUnmatchedCards(): Game;
    getDuration(): string;
    getScore(): number;
    getAttempts(): number;
    getFaceUpCards(): Card[];
    getCards(): Card[];
    hasFlippedTwoCards(): boolean;
    hasFlippedTwoCardsWithoutMatch(): boolean;
}

interface GameData {
    start: Date | null;
    end: Date | null;
    score: number;
    attempts: number;
    cards: Card[];
}

const DefaultGameData = {
    start: null,
    end: null,
    score: 0,
    attempts: 0,
    cards: getInitialCards(),
}

export function NewGame(game: GameData = DefaultGameData): Game{
    function getFaceUpCards(cards = game.cards): Card[] {
        return cards.filter((c) => c.isFaceUp && !c.isMatched);
    }

    function hasFlippedTwoCards(cards = game.cards): boolean {
        return getFaceUpCards(cards).length >= 2
    }

    function hasTwoMatchingCards(cards = game.cards): boolean {
        const [one, two] = getFaceUpCards(cards);
        return one?.value === two?.value;
    }

    return {
        handleEnd(): Game {
            return NewGame({
                ...game,
                end: new Date(),
            });
        },
        handleClick(card: Card): Game {
            if (card.isFaceUp || card.isMatched || hasFlippedTwoCards()) {
                return this;
            }

            let cards = game.cards.map((c) =>
                c.id === card.id ? { ...c, isFaceUp: true } : c
            );

            let score = game.score;

            if (hasTwoMatchingCards(cards)) {
                score++

                cards = cards.map((c) => c.isFaceUp ? { ...c, isMatched: true } : c)
            }

            return NewGame({
                ...game,
                start: game.start === null ? new Date() : game.start,
                attempts: game.attempts + 1,
                cards,
                score,
            });
        },
        resetUnmatchedCards(): Game {
            return NewGame({
                ...game,
                cards: game.cards.map(c => c.isMatched ? c : ({ ...c, isFaceUp: false })),
            });
        },
        getDuration(): string {
            if (game.start === null) {
                return "0m 0s";
            }

            let end = new Date();

            if (game.end !== null) {
                end = game.end
            }

            const diff = end.getTime() - game.start.getTime();
            const totalSeconds = Math.floor(diff / 1000);
            
            // Calculate minutes and remaining seconds
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            return `${minutes}m ${seconds}s`;
        },
        getScore(): number {
            return game.score
        },
        getAttempts(): number {
            return game.attempts
        },
        getCards(): Card[] {
            return game.cards;
        },
        hasFlippedTwoCardsWithoutMatch(): boolean {
            if (!hasFlippedTwoCards()) {
                return false;
            }

            if (hasTwoMatchingCards()) {
                return false
            }

            return true;
        },
        getFaceUpCards,
        hasFlippedTwoCards,
    }
}