import { StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  style?: object;
};

export function Divider({ orientation = 'horizontal', label, style }: DividerProps) {
  const { colors, spacing, typography } = useOptionalTheme();

  if (orientation === 'vertical') {
    return (
      <View
        accessibilityRole="none"
        style={[
          {
            width: StyleSheet.hairlineWidth,
            alignSelf: 'stretch',
            backgroundColor: colors.border,
            marginHorizontal: spacing[2],
          },
          style,
        ]}
      />
    );
  }

  if (label) {
    return (
      <View style={[styles.labeled, { gap: spacing[2] }, style]}>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
        <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.sm }}>{label}</Text>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
      </View>
    );
  }

  return (
    <View
      style={[
        {
          height: StyleSheet.hairlineWidth,
          backgroundColor: colors.border,
          marginVertical: spacing[3],
          width: '100%',
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  labeled: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  line: { flex: 1, height: StyleSheet.hairlineWidth },
});

export type EdsDivider = typeof Divider;
export const EdsDivider = Divider;
