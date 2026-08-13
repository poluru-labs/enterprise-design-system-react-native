import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type EdsSpinnerSize = 'sm' | 'md' | 'lg';

export type SpinnerProps = {
  size?: EdsSpinnerSize;
  label?: string;
  showLabel?: boolean;
  style?: object;
};

const SIZE_PX: Record<EdsSpinnerSize, number> = { sm: 16, md: 24, lg: 36 };

export function Spinner({
  size = 'md',
  label = 'Loading',
  showLabel = false,
  style,
}: SpinnerProps) {
  const { colors, spacing, typography } = useOptionalTheme();
  const spin = useRef(new Animated.Value(0)).current;
  const px = SIZE_PX[size];

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={[styles.root, { gap: spacing[2] }, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityState={{ busy: true }}
    >
      <Animated.View
        style={{
          width: px,
          height: px,
          borderRadius: px / 2,
          borderWidth: Math.max(2, px / 8),
          borderColor: colors.border,
          borderTopColor: colors.primary,
          transform: [{ rotate }],
        }}
      />
      {showLabel ? (
        <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.sm }}>{label}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center' },
});

export type EdsSpinner = typeof Spinner;
export const EdsSpinner = Spinner;
