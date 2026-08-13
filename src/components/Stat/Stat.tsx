import { Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type StatProps = {
  label: string;
  value: string | number;
  hint?: string;
  style?: object;
};

export function Stat({ label, value, hint, style }: StatProps) {
  const { colors, spacing, typography } = useOptionalTheme();

  return (
    <View style={[{ gap: spacing[1] }, style]} accessibilityLabel={`${label}: ${value}`}>
      <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.sm }}>{label}</Text>
      <Text
        style={{
          color: colors.text,
          fontSize: typography.fontSize['2xl'],
          fontWeight: typography.fontWeight.bold,
        }}
      >
        {value}
      </Text>
      {hint ? (
        <Text style={{ color: colors.textSubtle, fontSize: typography.fontSize.xs }}>{hint}</Text>
      ) : null}
    </View>
  );
}

export type EdsStat = typeof Stat;
export const EdsStat = Stat;
