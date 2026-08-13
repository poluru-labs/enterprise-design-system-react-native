import type { ReactNode } from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useOptionalTheme } from '../../theme';
import { fieldLabelStyle } from '../_shared/field';
import { Radio } from './Radio';

export type EdsRadioGroupOrientation = 'horizontal' | 'vertical';
export type EdsRadioGroupOption = { label: string; value: string; disabled?: boolean };

export type RadioGroupProps = {
  label?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: EdsRadioGroupOrientation;
  options?: EdsRadioGroupOption[];
  disabled?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function RadioGroup({
  label,
  value,
  onValueChange,
  orientation = 'vertical',
  options,
  disabled = false,
  children,
  style,
  testID,
}: RadioGroupProps) {
  const theme = useOptionalTheme();

  return (
    <View
      testID={testID}
      accessibilityRole="radiogroup"
      style={[{ gap: theme.spacing[2] }, style]}
    >
      {label ? <Text style={fieldLabelStyle(theme)}>{label}</Text> : null}
      <View
        style={{
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
          gap: theme.spacing[3],
        }}
      >
        {options
          ? options.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                label={option.label}
                checked={value === option.value}
                disabled={disabled || option.disabled}
                onValueChange={onValueChange}
              />
            ))
          : children}
      </View>
    </View>
  );
}

export type EdsRadioGroup = typeof RadioGroup;
export const EdsRadioGroup = RadioGroup;
