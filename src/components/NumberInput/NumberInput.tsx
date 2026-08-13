import { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { clamp } from '../../utils/format';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';
import {
  fieldControlStyle,
  fieldLabelStyle,
  fieldRootStyle,
  FIELD_FONT,
  type EdsFieldSize,
} from '../_shared/field';

export type EdsNumberInputSize = EdsFieldSize;

export type NumberInputProps = {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  size?: EdsNumberInputSize;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function roundToStep(value: number, min: number, step: number): number {
  if (step <= 0) return value;
  const precision = (String(step).split('.')[1] ?? '').length;
  const rounded = Math.round((value - min) / step) * step + min;
  return Number(rounded.toFixed(precision));
}

export function NumberInput({
  value,
  onValueChange,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  label,
  disabled = false,
  size = 'md',
  style,
  testID,
}: NumberInputProps) {
  const theme = useOptionalTheme();
  const [internal, setInternal] = useState(0);
  const current = value ?? internal;

  const emit = (next: number) => {
    const normalized = clamp(roundToStep(next, Number.isFinite(min) ? min : next, step), min, max);
    if (value === undefined) setInternal(normalized);
    onValueChange?.(normalized);
  };

  const canDecrement = !disabled && current - step >= min;
  const canIncrement = !disabled && current + step <= max;
  const iconSz = size === 'sm' ? 'sm' : 'md';

  return (
    <View style={[fieldRootStyle(theme), style]} testID={testID}>
      {label ? <Text style={fieldLabelStyle(theme)}>{label}</Text> : null}
      <View style={fieldControlStyle(theme, { size, disabled })}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Decrease value"
          disabled={!canDecrement}
          onPress={() => emit(current - step)}
          style={{ padding: 4, opacity: canDecrement ? 1 : 0.4 }}
        >
          <Icon name="minus" size={iconSz} color={theme.colors.text} />
        </Pressable>
        <TextInput
          style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: FIELD_FONT[size],
            color: theme.colors.text,
            paddingVertical: 0,
          }}
          value={String(current)}
          editable={!disabled}
          keyboardType="numeric"
          accessibilityLabel={label ?? 'Number input'}
          onChangeText={(text) => {
            const parsed = text === '' ? 0 : Number(text);
            if (Number.isNaN(parsed)) return;
            emit(parsed);
          }}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Increase value"
          disabled={!canIncrement}
          onPress={() => emit(current + step)}
          style={{ padding: 4, opacity: canIncrement ? 1 : 0.4 }}
        >
          <Icon name="plus" size={iconSz} color={theme.colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

export type EdsNumberInput = typeof NumberInput;
export const EdsNumberInput = NumberInput;
