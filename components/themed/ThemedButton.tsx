import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { theme } from '@/app/theme';

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'transparent';
  textColor?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const ThemedButton = ({ 
  title, 
  onPress, 
  disabled = false,
  style,
  variant = 'primary',
  textColor,
  icon,
  iconPosition = 'right',
}: Props) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary':
        return theme.colors.surface;
      case 'destructive':
        return theme.colors.error;
      case 'outline':
        return 'transparent';
      case 'transparent':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (textColor) return textColor;
    if (variant === 'outline') return theme.colors.primary;
    return variant === 'secondary' ? theme.colors.primary : theme.colors.surface;
  };

  const getBorder = () => {
    if (variant === 'outline') {
      return {
        borderWidth: 2,
        borderColor: theme.colors.primary,
      };
    }
    return {};
  };

  // For outline variant, parent should pass icon with correct color (e.g., theme.colors.primary)
  const renderIcon = (position: 'left' | 'right') => {
    if (!icon) return null;
    if (iconPosition !== position) return null;
    const marginStyle = position === 'left'
      ? { marginRight: theme.spacing.sm }
      : { marginLeft: theme.spacing.sm };
    return <View style={marginStyle}>{icon}</View>;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        getBorder(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.contentContainer}>
        {renderIcon('left')}
        <Text style={[styles.buttonText, { color: getTextColor() }]}>{title}</Text>
        {renderIcon('right')}
      </View>
    </TouchableOpacity>
  );
};

interface Style {
  button: ViewStyle;
  disabled: ViewStyle;
  buttonText: TextStyle;
  contentContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  button: {
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
    fontSize: theme.font.size.base,
    fontWeight: theme.font.weight.semiBold as TextStyle['fontWeight'],
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ThemedButton;
