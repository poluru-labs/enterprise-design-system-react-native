import { useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { clamp } from '../../utils/format';
import { useOptionalTheme } from '../../theme';
import { fieldLabelStyle, fieldRootStyle } from '../_shared/field';

export type SliderProps = {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  showValue?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function snapToStep(value: number, min: number, step: number): number {
  if (step <= 0) return value;
  const precision = (String(step).split('.')[1] ?? '').length;
  const snapped = Math.round((value - min) / step) * step + min;
  return Number(snapped.toFixed(precision));
}

export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  disabled = false,
  showValue = false,
  style,
  testID,
}: SliderProps) {
  const theme = useOptionalTheme();
  const [internal, setInternal] = useState(50);
  const [trackWidth, setTrackWidth] = useState(0);
  const current = value ?? internal;

  const ratio = useMemo(() => {
    const range = max - min || 1;
    return clamp((current - min) / range, 0, 1);
  }, [current, min, max]);

  const updateFromX = (x: number) => {
    if (disabled || trackWidth <= 0) return;
    const nextRatio = clamp(x / trackWidth, 0, 1);
    const raw = min + nextRatio * (max - min);
    const next = clamp(snapToStep(raw, min, step), min, max);
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  const onPress = (event: GestureResponderEvent) => {
    updateFromX(event.nativeEvent.locationX);
  };

  return (
    <View style={[fieldRootStyle(theme), style]} testID={testID}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {label ? <Text style={fieldLabelStyle(theme)}>{label}</Text> : <View />}
        {showValue ? (
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textMuted,
            }}
          >
            {current}
          </Text>
        ) : null}
      </View>
      <Pressable
        accessibilityRole="adjustable"
        accessibilityLabel={label ?? 'Slider'}
        accessibilityValue={{ min, max, now: current }}
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        onLayout={onLayout}
        style={{
          height: 28,
          justifyContent: 'center',
          opacity: disabled ? 0.55 : 1,
        }}
      >
        <View
          style={{
            height: 6,
            borderRadius: theme.radius.full,
            backgroundColor: theme.colors.border,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${ratio * 100}%`,
              height: '100%',
              backgroundColor: theme.colors.primary,
            }}
          />
        </View>
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: Math.max(0, ratio * trackWidth - 10),
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: theme.colors.surface,
            borderWidth: 2,
            borderColor: theme.colors.primary,
          }}
        />
      </Pressable>
    </View>
  );
}

export type EdsSlider = typeof Slider;
export const EdsSlider = Slider;
