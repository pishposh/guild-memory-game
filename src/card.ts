enum SignContent {
  ContractSpellingBee = 'contract-spelling-bee',
  GuildRound = 'guild-logo-round',
  GuildSquare = 'guild-logo-square',
  JustCauseWordle = 'just-cause-wordle',
  MakerWeekGuild = 'maker-week-guild',
  UnionMadeGithub = 'union-made-github',
  WuerkerCartoon = 'wuerker-cartoon',
  ContractCrossword = 'contract-crossword',
  DontPlayGames = 'dontplaygames-socialstrike',
  MooDeng = 'moo-deng',
  Scabby = 'scabby',
  StandWithGuild = 'stand-with-guild-avatar',
  TechSupport = 'tech-support-avatar',
  TickTock = 'tick-tock-avatar',
  UnionFist = 'union-fist',
  ReadyToStrike = 'ready-to-strike_text-only-avatar',
}

export interface Card {
  id: string
  value: SignContent
  isFaceUp: boolean
  isMatched: boolean
  count: number
}

export function getInitialCards(countCardsInPlay: number): Card[] {
  const date = new Date().toISOString()
  let cardValues = Object.values(SignContent)
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
