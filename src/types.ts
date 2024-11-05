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

export const emojis = {
  [SignContent.ContractSpellingBee]: '🐝',
  [SignContent.GuildRound]: '🔴',
  [SignContent.GuildSquare]: '🟥',
  [SignContent.JustCauseWordle]: '🟩',
  [SignContent.MakerWeekGuild]: '🐀',
  [SignContent.UnionMadeGithub]: '🧰',
  [SignContent.WuerkerCartoon]: '😦',
  [SignContent.ContractCrossword]: '🟦'
} as const;

export type Emoji = (typeof emojis)[keyof typeof emojis];

export interface Card {
  id: number;
  value: SignContent;
  isFaceUp: boolean;
  isMatched: boolean;
  emoji: Emoji;
}
