import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useOptionalTheme } from '../../theme';

export type CircularProgressProps = {
  value?: number;
  size?: number;
  indeterminate?: boolean;
  strokeWidth?: number;
  showValue?: boolean;
  style?: object;
};

export function CircularProgress({
  value = 0,
  size = 48,
  indeterminate = false,
  strokeWidth = 4,
  showValue = false,
  style,
}: CircularProgressProps) {
  const { colors, typography } = useOptionalTheme();
  const clamped = Math.min(Math.max(value, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = indeterminate ? circumference * 0.75 : circumference * (1 - clamped / 100);

  return (
    <View
      style={[{ width: size, height: size }, styles.root, style]}
      accessibilityRole="progressbar"
      accessibilityValue={
        indeterminate ? { text: 'Loading' } : { min: 0, max: 100, now: clamped }
      }
      accessibilityLabel="Circular progress"
    >
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {showValue && !indeterminate ? (
        <Text
          style={[
            styles.value,
            { color: colors.text, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold },
          ]}
        >
          {Math.round(clamped)}%
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', justifyContent: 'center' },
  value: { position: 'absolute' },
});

export type EdsCircularProgress = typeof CircularProgress;
export const EdsCircularProgress = CircularProgress;
