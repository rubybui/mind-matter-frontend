import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/app/theme';

interface Props {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  showArrow?: boolean;
  color?: 'primary' | 'error';
}

const ThemedMenuItem = ({ label, icon, onPress, showArrow = false, color = 'primary' }: Props) => {
  const iconBg = color === 'error' ? theme.colors.error : theme.colors.primary;
  const iconColor = color === 'error' ? theme.colors.surface : theme.colors.surface;
  const textColor = color === 'error' ? theme.colors.error : theme.colors.text;
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={[styles.iconCircle, { backgroundColor: iconBg }]}> 
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color={theme.colors.subtext} style={styles.arrow} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  label: {
    fontSize: theme.font.size.md,
    fontWeight: '600' as TextStyle['fontWeight'],
    flex: 1,
  },
  arrow: {
    marginLeft: theme.spacing.md,
  },
});

export default ThemedMenuItem; 