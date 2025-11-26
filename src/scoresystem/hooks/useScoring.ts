import { useState, useCallback, useEffect } from 'react';
import { calculateScore } from '../utils/calculateScore';
import { gameStorage } from "../storage/gameStorage"; 
import { Rule, Bonus } from "../types/score"
import { Numeric } from "../types/baseValue";

export const useScoring = (initialScore: Numeric = 0) => {
  const [currentScore, setCurrentScore] = useState<Numeric>(initialScore);
  const [highScore, setHighScore] = useState<Numeric>(initialScore);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadHighScore();
  }, []);

  /**
   * Load high score using the storage service
   */
  const loadHighScore = async () => {
    try {
      const stored = await gameStorage.getHighScore();
      setHighScore(stored);
    } catch (error) {
      console.error("loadHighScore error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update score & save new high score if needed
   */
  const updateScore = useCallback(
    (rules: Rule[], bonuses: Bonus[] = []): Numeric => {
      const newScore = calculateScore(currentScore, rules, bonuses);
      setCurrentScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
        gameStorage.setHighScore(newScore);
      }

      return newScore;
    },
    [currentScore, highScore]
  );

  /**
   * Reset score
   */
  const resetScore = useCallback(() => {
    setCurrentScore(initialScore);
  }, [initialScore]);

  return {
    currentScore,
    highScore,
    updateScore,
    resetScore,
    isLoading,
  };
};
