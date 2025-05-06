import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '@/app/theme';

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const ThemedButton = ({ title, onPress, disabled = false }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

interface Style {
  button: ViewStyle;
  disabled: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    elevation: 3,
    marginTop: theme.spacing.sm + 4,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: theme.font.size.base,
    fontWeight: theme.font.weight.semiBold as TextStyle['fontWeight'],
  },
});

export default ThemedButton;
