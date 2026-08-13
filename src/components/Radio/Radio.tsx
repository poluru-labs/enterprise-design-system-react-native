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

export type RadioProps = {
  label?: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function Radio({
  label,
  value,
  checked = false,
  disabled = false,
  onValueChange,
  children,
  style,
  testID,
}: RadioProps) {
  const theme = useOptionalTheme();

  return (
    <Pressable
      testID={testID}
      accessibilityRole="radio"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={() => {
        if (disabled) return;
        onValueChange?.(value);
      }}
      style={[styles.root, { opacity: disabled ? 0.55 : 1 }, style]}
    >
      <View
        style={[
          styles.outer,
          {
            borderColor: checked ? theme.colors.primary : theme.colors.borderStrong,
          },
        ]}
      >
        {checked ? (
          <View style={[styles.inner, { backgroundColor: theme.colors.primary }]} />
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
  outer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export type EdsRadio = typeof Radio;
export const EdsRadio = Radio;
