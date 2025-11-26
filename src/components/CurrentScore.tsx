import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Score, HighScore } from '../types/scoreUi'

interface CurrentScoreProps {
  score: Score;
  highScore: HighScore;
}

export const CurrentScore: React.FC<CurrentScoreProps> = ({ score, highScore }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Score</Text>
      <Text style={styles.score}>{score}</Text>
      
      <View style={styles.divider} />
      
      <Text style={styles.highScoreLabel}>High Score</Text>
      <Text style={styles.highScore}>{highScore}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  label: {
    fontSize: 16,
    color: '#95a5a6',
    fontWeight: '600',
    marginBottom: 8,
  },
  score: {
    fontSize: 64,
    color: '#ffffffff',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#34495e',
    marginVertical: 16,
  },
  highScoreLabel: {
    fontSize: 14,
    color: '#95a5a6',
    fontWeight: '500',
    marginBottom: 4,
  },
  highScore: {
    fontSize: 32,
    color: '#f39c12',
    fontWeight: '700',
  },
});