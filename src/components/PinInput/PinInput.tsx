import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInputKeyPressEventData,
  type ViewStyle,
} from 'react-native';
import { useOptionalTheme } from '../../theme';
import {
  fieldErrorStyle,
  fieldLabelStyle,
  fieldRootStyle,
} from '../_shared/field';

export type EdsPinInputType = 'text' | 'number' | 'password';

export type PinInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  length?: number;
  type?: EdsPinInputType;
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  onComplete?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function PinInput({
  value,
  onChange,
  length = 6,
  type = 'text',
  label,
  disabled = false,
  invalid = false,
  errorMessage,
  onComplete,
  style,
  testID,
}: PinInputProps) {
  const theme = useOptionalTheme();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState('');
  const current = isControlled ? value : internal;
  const refs = useRef<Array<TextInput | null>>([]);

  const chars = useMemo(
    () => Array.from({ length }, (_, index) => current[index] ?? ''),
    [current, length],
  );

  const updateValue = useCallback(
    (next: string) => {
      const trimmed = next.slice(0, length);
      if (!isControlled) setInternal(trimmed);
      onChange?.(trimmed);
      if (trimmed.length === length) onComplete?.(trimmed);
    },
    [isControlled, length, onChange, onComplete],
  );

  const focusCell = (index: number) => {
    refs.current[index]?.focus();
  };

  return (
    <View style={[fieldRootStyle(theme), style]} testID={testID}>
      {label ? <Text style={fieldLabelStyle(theme)}>{label}</Text> : null}
      <View
        accessibilityRole="none"
        style={{ flexDirection: 'row', gap: theme.spacing[2] }}
      >
        {chars.map((char, index) => (
          <TextInput
            key={index}
            ref={(node) => {
              refs.current[index] = node;
            }}
            value={char}
            editable={!disabled}
            maxLength={1}
            secureTextEntry={type === 'password'}
            keyboardType={type === 'number' ? 'number-pad' : 'default'}
            accessibilityLabel={`Digit ${index + 1} of ${length}`}
            style={{
              width: 44,
              height: 48,
              textAlign: 'center',
              fontFamily: theme.typography.fontFamily.mono,
              fontSize: theme.typography.fontSize.lg,
              color: theme.colors.text,
              backgroundColor: disabled ? theme.colors.bg : theme.colors.surface,
              borderWidth: 1,
              borderColor: invalid ? theme.colors.danger : theme.colors.border,
              borderRadius: theme.radius.md,
              opacity: disabled ? 0.6 : 1,
            }}
            onChangeText={(text) => {
              const nextChar = text.slice(-1);
              if (type === 'number' && nextChar && !/^\d$/.test(nextChar)) return;
              const next = chars.map((existing, i) => (i === index ? nextChar : existing)).join('');
              updateValue(next);
              if (nextChar && index < length - 1) focusCell(index + 1);
            }}
            onKeyPress={(event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
              if (event.nativeEvent.key === 'Backspace' && !chars[index] && index > 0) {
                focusCell(index - 1);
              }
            }}
          />
        ))}
      </View>
      {invalid && errorMessage ? (
        <Text style={fieldErrorStyle(theme)}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

export type EdsPinInput = typeof PinInput;
export const EdsPinInput = PinInput;
