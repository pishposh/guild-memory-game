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
  count: number;
}

export function getInitialCards(countCardsInPlay: number): Card[] {
  const date = new Date().toISOString();
  let cardValues = Object.values(SignContent);
  shuffleArray(cardValues);
  cardValues = cardValues.slice(0, countCardsInPlay);

  const cards = [...cardValues, ...cardValues].map((value, index) => ({
    value,
    id: date + index,
    isFaceUp: false,
    isMatched: false,
    count: 0
  }));
  shuffleArray(cards);
  return cards;
}

// note, sort(() => 0.5 - Math.random()) and similar are biased; see <https://stackoverflow.com/a/12646864>
function shuffleArray(array: unknown[]) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
