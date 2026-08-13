import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useOptionalTheme } from '../../theme';
import {
  fieldControlStyle,
  fieldInputTextStyle,
  fieldLabelStyle,
  fieldRootStyle,
} from '../_shared/field';

export type AutocompleteProps = {
  suggestions?: string[];
  value?: string;
  onChangeText?: (value: string) => void;
  onSelect?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  minChars?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function Autocomplete({
  suggestions = [],
  value,
  onChangeText,
  onSelect,
  label,
  disabled = false,
  placeholder,
  minChars = 1,
  style,
  testID,
}: AutocompleteProps) {
  const theme = useOptionalTheme();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState('');
  const current = isControlled ? value : internal;
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const query = current.trim().toLowerCase();
    if (query.length < minChars) return [];
    return suggestions.filter((item) => item.toLowerCase().includes(query));
  }, [current, minChars, suggestions]);

  const update = (next: string) => {
    if (!isControlled) setInternal(next);
    onChangeText?.(next);
    if (next.trim().length >= minChars) {
      const hasMatches = suggestions.some((item) =>
        item.toLowerCase().includes(next.trim().toLowerCase()),
      );
      setOpen(hasMatches);
    } else {
      setOpen(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    if (!isControlled) setInternal(suggestion);
    onChangeText?.(suggestion);
    onSelect?.(suggestion);
    setOpen(false);
  };

  return (
    <View style={[fieldRootStyle(theme), style]} testID={testID}>
      {label ? <Text style={fieldLabelStyle(theme)}>{label}</Text> : null}
      <View style={fieldControlStyle(theme, { size: 'md', disabled })}>
        <TextInput
          style={fieldInputTextStyle(theme, 'md')}
          value={current}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSubtle}
          accessibilityLabel={label ?? 'Autocomplete'}
          accessibilityState={{ disabled, expanded: open }}
          autoCorrect={false}
          onChangeText={update}
          onFocus={() => {
            if (!disabled && filtered.length > 0) setOpen(true);
          }}
        />
      </View>
      {open && filtered.length > 0 ? (
        <View
          style={{
            marginTop: theme.spacing[1],
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.md,
            maxHeight: 220,
            overflow: 'hidden',
          }}
        >
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={filtered}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                accessibilityRole="button"
                onPress={() => selectSuggestion(item)}
                style={{
                  paddingHorizontal: theme.spacing[3],
                  paddingVertical: theme.spacing[3],
                }}
              >
                <Text
                  style={{
                    fontFamily: theme.typography.fontFamily.sans,
                    fontSize: theme.typography.fontSize.md,
                    color: theme.colors.text,
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>
      ) : null}
    </View>
  );
}

export type EdsAutocomplete = typeof Autocomplete;
export const EdsAutocomplete = Autocomplete;
