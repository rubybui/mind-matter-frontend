import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  progress: number; // between 0 and 1
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { flex: progress }]} />
      <View style={[styles.remaining, { flex: 1 - progress }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  fill: {
    backgroundColor: '#222',
  },
  remaining: {
    backgroundColor: '#EEE',
  },
});

export default ProgressBar;
