import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../app/theme';

interface ProgressBarProps {
  progress: number; // between 0 and 1
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const safeProgress = Math.min(Math.max(progress, 0), 1);
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { flex: safeProgress }]} />
      <View style={[styles.remaining, { flex: 1 - safeProgress }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 4,
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  fill: {
    backgroundColor: theme.colors.primary,
  },
  remaining: {
    backgroundColor: theme.colors.border,
  },
});

export default ProgressBar;
