// components/ThemedInput.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '@/app/theme';

const ThemedInput = (props: TextInputProps) => {
  return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 4,
    fontSize: theme.font.size.base,
    marginBottom: theme.spacing.md + 2,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default ThemedInput;
