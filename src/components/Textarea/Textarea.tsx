import {
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useOptionalTheme } from '../../theme';
import {
  fieldControlStyle,
  fieldErrorStyle,
  fieldHintStyle,
  fieldInputTextStyle,
  fieldLabelStyle,
  fieldRootStyle,
} from '../_shared/field';

export type TextareaProps = {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  hint?: string;
  errorMessage?: string;
  invalid?: boolean;
  rows?: number;
  numberOfLines?: number;
  disabled?: boolean;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function Textarea({
  label,
  value,
  defaultValue,
  onChangeText,
  hint,
  errorMessage,
  invalid = false,
  rows = 4,
  numberOfLines,
  disabled = false,
  placeholder,
  style,
  testID,
}: TextareaProps) {
  const theme = useOptionalTheme();
  const lines = numberOfLines ?? rows;
  const showError = invalid && Boolean(errorMessage);

  return (
    <View style={[fieldRootStyle(theme), style]} testID={testID}>
      {label ? <Text style={fieldLabelStyle(theme)}>{label}</Text> : null}
      <View
        style={[
          fieldControlStyle(theme, { size: 'md', invalid, disabled }),
          { alignItems: 'flex-start', paddingVertical: theme.spacing[2], minHeight: lines * 22 + 16 },
        ]}
      >
        <TextInput
          style={[fieldInputTextStyle(theme, 'md'), { textAlignVertical: 'top', minHeight: lines * 22 }]}
          value={value}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSubtle}
          multiline
          numberOfLines={lines}
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
        />
      </View>
      {showError ? (
        <Text style={fieldErrorStyle(theme)}>{errorMessage}</Text>
      ) : hint ? (
        <Text style={fieldHintStyle(theme)}>{hint}</Text>
      ) : null}
    </View>
  );
}

export type EdsTextarea = typeof Textarea;
export const EdsTextarea = Textarea;
