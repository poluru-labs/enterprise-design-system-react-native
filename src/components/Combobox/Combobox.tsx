import { useEffect, useMemo, useState } from 'react';
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
import { Icon } from '../Icon';
import {
  fieldControlStyle,
  fieldInputTextStyle,
  fieldLabelStyle,
  fieldRootStyle,
} from '../_shared/field';

export type EdsComboboxOption = { label: string; value: string; disabled?: boolean };

export type ComboboxProps = {
  options?: EdsComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  filterable?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function Combobox({
  options = [],
  value,
  onValueChange,
  label,
  disabled = false,
  placeholder = 'Select…',
  filterable = true,
  style,
  testID,
}: ComboboxProps) {
  const theme = useOptionalTheme();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState('');
  const current = isControlled ? value : internal;
  const selected = options.find((option) => option.value === current);

  const [filter, setFilter] = useState(selected?.label ?? '');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) setFilter(selected?.label ?? '');
  }, [selected?.label, open]);

  const filtered = useMemo(() => {
    if (!filterable) return options;
    const query = filter.trim().toLowerCase();
    if (!query) return options;
    return options.filter((option) => option.label.toLowerCase().includes(query));
  }, [filter, filterable, options]);

  const selectOption = (option: EdsComboboxOption) => {
    if (option.disabled) return;
    if (!isControlled) setInternal(option.value);
    setFilter(option.label);
    setOpen(false);
    onValueChange?.(option.value);
  };

  return (
    <View style={[fieldRootStyle(theme), style]} testID={testID}>
      {label ? <Text style={fieldLabelStyle(theme)}>{label}</Text> : null}
      <View style={fieldControlStyle(theme, { size: 'md', disabled })}>
        <TextInput
          style={fieldInputTextStyle(theme, 'md')}
          value={filter}
          editable={!disabled && filterable}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSubtle}
          accessibilityLabel={label ?? 'Combobox'}
          accessibilityState={{ disabled, expanded: open }}
          onFocus={() => {
            if (!disabled) setOpen(true);
          }}
          onChangeText={(text) => {
            setFilter(text);
            setOpen(true);
          }}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Toggle options"
          disabled={disabled}
          onPress={() => {
            if (!disabled) setOpen((prev) => !prev);
          }}
        >
          <Icon name="chevron-down" size="md" color={theme.colors.textMuted} />
        </Pressable>
      </View>
      {open ? (
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
            keyExtractor={(item) => item.value}
            ListEmptyComponent={
              <Text
                style={{
                  padding: theme.spacing[3],
                  color: theme.colors.textMuted,
                  fontFamily: theme.typography.fontFamily.sans,
                }}
              >
                No matches found
              </Text>
            }
            renderItem={({ item }) => {
              const isSelected = item.value === current;
              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected, disabled: item.disabled }}
                  disabled={item.disabled}
                  onPress={() => selectOption(item)}
                  style={{
                    paddingHorizontal: theme.spacing[3],
                    paddingVertical: theme.spacing[3],
                    backgroundColor: isSelected ? theme.colors.brandSoft : 'transparent',
                    opacity: item.disabled ? 0.5 : 1,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: theme.typography.fontFamily.sans,
                      fontSize: theme.typography.fontSize.md,
                      color: theme.colors.text,
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

export type EdsCombobox = typeof Combobox;
export const EdsCombobox = Combobox;
