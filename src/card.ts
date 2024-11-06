enum SignContent {
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
  id: string;
  value: SignContent;
  isFaceUp: boolean;
  isMatched: boolean;
  count: number;
}

const CARD_VALUES = Object.values(SignContent);

export function getInitialCards(): Card[] {
  const date = new Date().toISOString();

  return (
    [...CARD_VALUES, ...CARD_VALUES]
      .map((value, index) => ({
        value,
        id: date + index,
        isFaceUp: false,
        isMatched: false,
        count: 0
      }))
      // -1, 0, or 1: sorts randomly
      .sort(() => Math.floor(Math.random() * 3) - 1)
  );
}
