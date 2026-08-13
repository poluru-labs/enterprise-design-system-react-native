import { StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type MeterProps = {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  style?: object;
};

export function Meter({ value, min = 0, max = 100, label, style }: MeterProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const clamped = Math.min(Math.max(value, min), max);
  const range = max - min || 1;
  const pct = ((clamped - min) / range) * 100;

  return (
    <View style={[{ gap: spacing[1] }, style]}>
      {label ? (
        <View style={styles.header}>
          <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.sm }}>{label}</Text>
          <Text style={{ color: colors.text, fontSize: typography.fontSize.sm }}>
            {clamped} / {max}
          </Text>
        </View>
      ) : null}
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={label || 'Meter'}
        accessibilityValue={{ min, max, now: clamped }}
        style={[
          styles.track,
          {
            backgroundColor: colors.border,
            borderRadius: radius.full,
            height: spacing[3],
          },
        ]}
      >
        <View
          style={{
            width: `${pct}%`,
            height: '100%',
            backgroundColor: colors.primary,
            borderRadius: radius.full,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  track: { width: '100%', overflow: 'hidden' },
});

export type EdsMeter = typeof Meter;
export const EdsMeter = Meter;
