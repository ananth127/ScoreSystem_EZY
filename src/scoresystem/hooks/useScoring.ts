import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateScore } from '../utils/calculateScore';

type Rule =
  | { type: 'add'; value: number }
  | { type: 'multiply'; value: number }
  | { type: 'timeBonus'; maxPoints: number; timeElapsed: number; penalty: number };

type Bonus = {
  value: number;
  condition?: (score: number) => boolean;
};

const STORAGE_KEYS = {
  HIGH_SCORE: '@scoring_high_score',
};

export const useScoring = (initialScore: number = 0) => {
  const [currentScore, setCurrentScore] = useState<number>(initialScore);
  const [highScore, setHighScore] = useState<number>(initialScore);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const storedHighScore = await AsyncStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
      if (storedHighScore !== null) {
        setHighScore(parseInt(storedHighScore, 10));
      }
    } catch (error) {
      console.error('Failed to load high score:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveHighScore = async (score: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
    } catch (error) {
      console.error('Failed to save high score:', error);
    }
  };

  const updateScore = useCallback(
    (rules: Rule[], bonuses: Bonus[] = []): number => {
      const newScore = calculateScore(currentScore, rules, bonuses);
      setCurrentScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
        saveHighScore(newScore);
      }

      return newScore;
    },
    [currentScore, highScore]
  );

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