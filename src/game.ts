export interface Game {
  handleEnd(): Game
  handleClick(): Game
  getDuration(): string
  getScore(): number
  getAttempts(): number
}

interface GameData {
  start: Date | null
  end: Date | null
  score: number
  attempts: number
}

const DefaultGameData = {
  start: new Date(),
  end: null,
  score: 0,
  attempts: 0,
}

export function NewGame(game: GameData = DefaultGameData): Game {
  return {
    handleEnd(): Game {
      return NewGame({
        ...game,
        end: new Date(),
      })
    },
    handleClick(): Game {
      return NewGame({
        ...game,
        attempts: game.attempts + 1,
      })
    },
    getDuration(): string {
      if (game.start === null) {
        return '0m 0s'
      }

      let end = new Date()

      if (game.end !== null) {
        end = game.end
      }

      const diff = end.getTime() - game.start.getTime()
      const totalSeconds = Math.floor(diff / 1000)

      // Calculate minutes and remaining seconds
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60

      return `${minutes}m ${seconds}s`
    },
    getScore(): number {
      return game.score
    },
    getAttempts(): number {
      return game.attempts
    },
  }
}
