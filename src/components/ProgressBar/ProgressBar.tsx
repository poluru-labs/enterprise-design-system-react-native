import { StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type ProgressBarProps = {
  value?: number;
  label?: string;
  indeterminate?: boolean;
  style?: object;
};

export function ProgressBar({
  value = 0,
  label,
  indeterminate = false,
  style,
}: ProgressBarProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const pct = Math.min(Math.max(value, 0), 100);

  return (
    <View style={[{ gap: spacing[1] }, style]}>
      {label && !indeterminate ? (
        <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.sm }}>{label}</Text>
      ) : null}
      <View
        accessibilityRole="progressbar"
        accessibilityValue={
          indeterminate ? { text: 'Loading' } : { min: 0, max: 100, now: pct }
        }
        accessibilityLabel={label || 'Progress'}
        style={[
          styles.track,
          {
            backgroundColor: colors.border,
            borderRadius: radius.full,
            height: spacing[2],
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              backgroundColor: colors.primary,
              borderRadius: radius.full,
              width: indeterminate ? '40%' : `${pct}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden' },
  fill: { height: '100%' },
});

export type EdsProgressBar = typeof ProgressBar;
export const EdsProgressBar = ProgressBar;
