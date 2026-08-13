import {
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import type { EdsIconName } from '../../icons/names';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';
import {
  fieldControlStyle,
  fieldErrorStyle,
  fieldHintStyle,
  fieldInputTextStyle,
  fieldLabelStyle,
  fieldRootStyle,
  type EdsFieldSize,
} from '../_shared/field';

export type EdsInputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
export type EdsInputSize = EdsFieldSize;

export type InputProps = {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  type?: EdsInputType;
  size?: EdsInputSize;
  hint?: string;
  errorMessage?: string;
  invalid?: boolean;
  icon?: EdsIconName | '';
  iconTrailing?: EdsIconName | '';
  disabled?: boolean;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function keyboardTypeFor(type: EdsInputType): TextInputProps['keyboardType'] {
  switch (type) {
    case 'email':
      return 'email-address';
    case 'number':
      return 'numeric';
    case 'tel':
      return 'phone-pad';
    case 'url':
      return 'url';
    default:
      return 'default';
  }
}

function iconSize(size: EdsInputSize): 'sm' | 'md' {
  return size === 'sm' ? 'sm' : 'md';
}

export function Input({
  label,
  value,
  defaultValue,
  onChangeText,
  type = 'text',
  size = 'md',
  hint,
  errorMessage,
  invalid = false,
  icon = '',
  iconTrailing = '',
  disabled = false,
  placeholder,
  style,
  testID,
}: InputProps) {
  const theme = useOptionalTheme();
  const showError = invalid && Boolean(errorMessage);

  return (
    <View style={[fieldRootStyle(theme), style]} testID={testID}>
      {label ? <Text style={fieldLabelStyle(theme)}>{label}</Text> : null}
      <View style={fieldControlStyle(theme, { size, invalid, disabled })}>
        {icon ? (
          <Icon name={icon} size={iconSize(size)} color={theme.colors.textMuted} />
        ) : null}
        <TextInput
          style={fieldInputTextStyle(theme, size)}
          value={value}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSubtle}
          secureTextEntry={type === 'password'}
          keyboardType={keyboardTypeFor(type)}
          autoCapitalize={type === 'email' || type === 'url' ? 'none' : 'sentences'}
          autoCorrect={type === 'email' || type === 'password' ? false : true}
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
        />
        {iconTrailing ? (
          <Icon name={iconTrailing} size={iconSize(size)} color={theme.colors.textMuted} />
        ) : null}
      </View>
      {showError ? (
        <Text style={fieldErrorStyle(theme)}>{errorMessage}</Text>
      ) : hint ? (
        <Text style={fieldHintStyle(theme)}>{hint}</Text>
      ) : null}
    </View>
  );
}

export type EdsInput = typeof Input;
export const EdsInput = Input;
