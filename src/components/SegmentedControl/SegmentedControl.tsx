import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { EdsIconName } from '../../icons/names';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';

export type SegmentedControlOption = {
  value: string;
  label: string;
  icon?: EdsIconName;
};

export type SegmentedControlProps = {
  options: SegmentedControlOption[];
  value: string;
  onValueChange: (value: string) => void;
  style?: object;
};

export function SegmentedControl({
  options,
  value,
  onValueChange,
  style,
}: SegmentedControlProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors.bg,
          borderRadius: radius.lg,
          padding: spacing[1],
          gap: spacing[1],
        },
        style,
      ]}
      accessibilityRole="tablist"
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onValueChange(option.value)}
            style={[
              styles.segment,
              {
                paddingVertical: spacing[2],
                paddingHorizontal: spacing[3],
                borderRadius: radius.md,
                gap: spacing[1],
                backgroundColor: selected ? colors.surface : 'transparent',
                borderWidth: selected ? StyleSheet.hairlineWidth : 0,
                borderColor: colors.border,
              },
            ]}
          >
            {option.icon ? (
              <Icon
                name={option.icon}
                size="sm"
                color={selected ? colors.primary : colors.textMuted}
              />
            ) : null}
            <Text
              style={{
                color: selected ? colors.text : colors.textMuted,
                fontSize: typography.fontSize.sm,
                fontWeight: selected
                  ? typography.fontWeight.semibold
                  : typography.fontWeight.medium,
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignSelf: 'flex-start' },
  segment: { flexDirection: 'row', alignItems: 'center' },
});

export type EdsSegmentedControl = typeof SegmentedControl;
export const EdsSegmentedControl = SegmentedControl;
