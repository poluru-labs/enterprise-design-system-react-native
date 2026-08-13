import { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';
import {
  fieldControlStyle,
  fieldLabelStyle,
  fieldRootStyle,
  FIELD_FONT,
  type EdsFieldSize,
} from '../_shared/field';

export type EdsSelectOption = { label: string; value: string; disabled?: boolean };
export type EdsSelectSize = EdsFieldSize;

export type SelectProps = {
  label?: string;
  options?: EdsSelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  size?: EdsSelectSize;
  disabled?: boolean;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function Select({
  label,
  options = [],
  value,
  onValueChange,
  size = 'md',
  disabled = false,
  placeholder = 'Select…',
  style,
  testID,
}: SelectProps) {
  const theme = useOptionalTheme();
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  const close = () => setOpen(false);

  return (
    <View style={[fieldRootStyle(theme), style]} testID={testID}>
      {label ? <Text style={fieldLabelStyle(theme)}>{label}</Text> : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
        accessibilityState={{ disabled, expanded: open }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={fieldControlStyle(theme, { size, disabled })}
      >
        <Text
          style={{
            flex: 1,
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: FIELD_FONT[size],
            color: selected ? theme.colors.text : theme.colors.textSubtle,
          }}
        >
          {selected?.label ?? placeholder}
        </Text>
        <Icon name="chevron-down" size={size === 'sm' ? 'sm' : 'md'} color={theme.colors.textMuted} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: theme.colors.overlay,
            justifyContent: 'center',
            padding: theme.spacing[6],
          }}
          onPress={close}
        >
          <Pressable
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.lg,
              maxHeight: 360,
              overflow: 'hidden',
            }}
            onPress={(e) => e.stopPropagation?.()}
          >
            {label ? (
              <Text
                style={[
                  fieldLabelStyle(theme),
                  { padding: theme.spacing[4], borderBottomWidth: 1, borderBottomColor: theme.colors.border },
                ]}
              >
                {label}
              </Text>
            ) : null}
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected, disabled: item.disabled }}
                    disabled={item.disabled}
                    onPress={() => {
                      if (item.disabled) return;
                      onValueChange?.(item.value);
                      close();
                    }}
                    style={{
                      paddingHorizontal: theme.spacing[4],
                      paddingVertical: theme.spacing[3],
                      backgroundColor: isSelected ? theme.colors.brandSoft : 'transparent',
                      opacity: item.disabled ? 0.5 : 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
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
                    {isSelected ? (
                      <Icon name="check" size="sm" color={theme.colors.primary} />
                    ) : null}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

export type EdsSelect = typeof Select;
export const EdsSelect = Select;
