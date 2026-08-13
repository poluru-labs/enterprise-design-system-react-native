import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useOptionalTheme } from '../../theme';

export type CheckboxProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function Checkbox({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
  indeterminate = false,
  children,
  style,
  testID,
}: CheckboxProps) {
  const theme = useOptionalTheme();
  const active = checked || indeterminate;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: indeterminate ? 'mixed' : checked, disabled }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={() => {
        if (disabled) return;
        onCheckedChange?.(!checked);
      }}
      style={[styles.root, { opacity: disabled ? 0.55 : 1 }, style]}
    >
      <View
        style={[
          styles.box,
          {
            borderColor: active ? theme.colors.primary : theme.colors.borderStrong,
            backgroundColor: active ? theme.colors.primary : theme.colors.surface,
            borderRadius: theme.radius.sm,
          },
        ]}
      >
        {indeterminate ? (
          <View style={[styles.indeterminate, { backgroundColor: theme.colors.textInverse }]} />
        ) : checked ? (
          <Text style={[styles.mark, { color: theme.colors.textInverse }]}>✓</Text>
        ) : null}
      </View>
      {label || children ? (
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.md,
            color: theme.colors.text,
            flexShrink: 1,
          }}
        >
          {label ?? children}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
  },
  indeterminate: {
    width: 10,
    height: 2,
    borderRadius: 1,
  },
});

export type EdsCheckbox = typeof Checkbox;
export const EdsCheckbox = Checkbox;
