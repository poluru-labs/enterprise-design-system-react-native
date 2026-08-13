import {
  Pressable,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';
import {
  fieldControlStyle,
  fieldInputTextStyle,
  fieldRootStyle,
  type EdsFieldSize,
} from '../_shared/field';

export type EdsSearchSize = EdsFieldSize;

export type SearchProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  size?: EdsSearchSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function iconSize(size: EdsSearchSize): 'sm' | 'md' {
  return size === 'sm' ? 'sm' : 'md';
}

export function Search({
  value = '',
  onChangeText,
  onClear,
  placeholder = 'Search…',
  size = 'md',
  disabled = false,
  style,
  testID,
}: SearchProps) {
  const theme = useOptionalTheme();
  const showClear = String(value).length > 0;

  return (
    <View style={[fieldRootStyle(theme), style]} testID={testID}>
      <View style={fieldControlStyle(theme, { size, disabled })}>
        <Icon name="search" size={iconSize(size)} color={theme.colors.textMuted} />
        <TextInput
          style={fieldInputTextStyle(theme, size)}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSubtle}
          accessibilityLabel={placeholder}
          accessibilityState={{ disabled }}
          returnKeyType="search"
          autoCorrect={false}
        />
        {showClear ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            disabled={disabled}
            onPress={() => {
              if (disabled) return;
              onClear?.();
              onChangeText?.('');
            }}
            hitSlop={8}
          >
            <Icon name="x" size={iconSize(size)} color={theme.colors.textMuted} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export type EdsSearch = typeof Search;
export const EdsSearch = Search;
