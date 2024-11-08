const SignContent = [
  'crossword-answer-contract',
  'dontplaygames-socialstrike',
  'moo-deng',
  'ready-to-strike',
  'round-tech-guild-logo',
  'sad-AG',
  'scabby-inflatable',
  'scabby-the-rat-logo',
  'spelling-bee-answer-contract',
  'square-tech-guild-logo',
  'stand-with-the-guild',
  'tech-support',
  'tick-tock-rat',
  'union-fist',
  'union-made-guild-logo',
  'wordle-answer-cause',
] as const

export interface Card {
  id: string
  value: (typeof SignContent)[number]
  isFaceUp: boolean
  isMatched: boolean
  count: number
}

export function getInitialCards(countCardsInPlay: number): Card[] {
  const date = new Date().toISOString()
  let cardValues = [...SignContent]
  shuffleArray(cardValues)
  cardValues = cardValues.slice(0, countCardsInPlay)

  const cards = [...cardValues, ...cardValues].map((value, index) => ({
    value,
    id: date + index,
    isFaceUp: false,
    isMatched: false,
    count: 0,
  }))
  shuffleArray(cards)
  return cards
}

// note, sort(() => 0.5 - Math.random()) and similar are biased; see <https://stackoverflow.com/a/12646864>
function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
