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
