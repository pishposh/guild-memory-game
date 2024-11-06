enum SignContent {
  ContractSpellingBee = 'contract-spelling-bee.webp',
  GuildRound = 'guild-logo-round.webp',
  GuildSquare = 'guild-logo-square.webp',
  JustCauseWordle = 'just-cause-wordle.webp',
  MakerWeekGuild = 'maker-week-guild.webp',
  UnionMadeGithub = 'union-made-github.webp',
  WuerkerCartoon = 'wuerker-cartoon.webp',
  ContractCrossword = 'contract-crossword.webp',
  DontPlayGames = 'dontplaygames-socialstrike.png',
  MooDeng = 'moo-deng.png',
  Scabby = 'scabby.jpg',
  StandWithGuild = 'stand-with-guild-avatar.png',
  TechSupport = 'tech-support-avatar.png',
  TickTock = 'tick-tock-avatar.png',
  UnionFist = 'union-fist.png',
}

export interface Card {
  id: string;
  value: SignContent;
  isFaceUp: boolean;
  isMatched: boolean;
  count: number;
}

const CARD_VALUES = Object.values(SignContent);

export function getInitialCards(): Card[] {
  const date = new Date().toISOString();

  const cards = [...CARD_VALUES, ...CARD_VALUES].map((value, index) => ({
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
