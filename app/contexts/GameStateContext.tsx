import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transform } from '~/utils/modules';

interface GameStateProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const GameStateContext = createContext<GameStateProps | undefined>(undefined);

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>({
    backgroundColor: 0x000000,
    timeline: 0,
    judged: [],
    notelines: [],
    judgement: {
      id: 'judgement',
      transform: new Transform(),
      filters: {},
    },
    sprites: [],
    texts: [],
    camera: {
      id: 'camera',
      transform: new Transform(),
      filters: {},
    },
    combo: 0,
    score: 0,
    health: 100,
    maxCombo: 0,
    accuracy: 0,
  });

  return (
    <GameStateContext.Provider value={{gameState, setGameState}}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useScreen must be used within a ScreenProvider');
  }
  return context;
};