import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  style?: object;
};

export function Skeleton({
  width = '100%',
  height = 16,
  circle = false,
  style,
}: SkeletonProps) {
  const { colors, radius } = useOptionalTheme();
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: false }),
        Animated.timing(opacity, { toValue: 0.45, duration: 700, useNativeDriver: false }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  const sizeStyle = circle
    ? {
        width: typeof width === 'number' ? width : 40,
        height: typeof width === 'number' ? width : 40,
        borderRadius: 9999,
      }
    : {
        width: width as number | `${number}%`,
        height: height as number,
        borderRadius: radius.md,
      };

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          backgroundColor: colors.border,
          opacity,
          ...(circle
            ? {
                width: typeof width === 'number' ? width : 40,
                height: typeof width === 'number' ? width : 40,
                borderRadius: 9999,
              }
            : {
                width,
                height,
                borderRadius: radius.md,
              }),
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({});

export type EdsSkeleton = typeof Skeleton;
export const EdsSkeleton = Skeleton;
