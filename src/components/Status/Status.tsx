import { StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type EdsStatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export type StatusProps = {
  variant?: EdsStatusVariant;
  label: string;
  style?: object;
};

export function Status({ variant = 'neutral', label, style }: StatusProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const tone =
    variant === 'success'
      ? colors.success
      : variant === 'warning'
        ? colors.warning
        : variant === 'danger'
          ? colors.danger
          : variant === 'info'
            ? colors.info
            : colors.textMuted;

  return (
    <View
      style={[styles.root, { gap: spacing[2] }, style]}
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: radius.full,
          backgroundColor: tone,
        }}
      />
      <Text style={{ color: colors.text, fontSize: typography.fontSize.sm }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center' },
});

export type EdsStatus = typeof Status;
export const EdsStatus = Status;
