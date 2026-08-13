import { Pressable, StyleSheet, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';

export type RatingProps = {
  value: number;
  onValueChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  style?: object;
};

export function Rating({
  value,
  onValueChange,
  max = 5,
  readOnly = false,
  style,
}: RatingProps) {
  const { colors, spacing } = useOptionalTheme();

  return (
    <View
      style={[styles.root, { gap: spacing[1] }, style]}
      accessibilityRole="adjustable"
      accessibilityLabel="Rating"
      accessibilityValue={{ min: 0, max, now: value }}
    >
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1;
        const filled = value >= starValue;
        return (
          <Pressable
            key={starValue}
            accessibilityLabel={`Rate ${starValue} of ${max}`}
            disabled={readOnly}
            onPress={() => {
              if (!readOnly) onValueChange?.(starValue);
            }}
          >
            <Icon
              name="star"
              size="md"
              color={filled ? colors.warning : colors.borderStrong}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center' },
});

export type EdsRating = typeof Rating;
export const EdsRating = Rating;
