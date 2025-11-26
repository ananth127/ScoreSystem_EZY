import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../constants/storageKeys";

export const gameStorage = {
  async getHighScore(): Promise<number> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
      return value ? parseInt(value, 10) : 0;
    } catch (error) {
      console.error("getHighScore error:", error);
      return 0;
    }
  },

  async setHighScore(score: number): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.HIGH_SCORE,
        score.toString()
      );
    } catch (error) {
      console.error("setHighScore error:", error);
    }
  },
};
