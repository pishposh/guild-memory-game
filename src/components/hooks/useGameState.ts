import { useContext } from 'react'
import { GameContext } from '../../contexts/gameContext'

export const useGameState = () => useContext(GameContext)
