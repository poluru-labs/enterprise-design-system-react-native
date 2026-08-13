import type { ReactNode } from 'react';
import {
  Switch as RNSwitch,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useOptionalTheme } from '../../theme';

export type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function Switch({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
  children,
  style,
  testID,
}: SwitchProps) {
  const theme = useOptionalTheme();

  return (
    <View
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing[3],
          opacity: disabled ? 0.55 : 1,
        },
        style,
      ]}
    >
      <RNSwitch
        value={checked}
        disabled={disabled}
        onValueChange={(next) => {
          if (disabled) return;
          onCheckedChange?.(next);
        }}
        trackColor={{
          false: theme.colors.borderStrong,
          true: theme.colors.primary,
        }}
        thumbColor={theme.colors.surface}
        ios_backgroundColor={theme.colors.borderStrong}
        accessibilityLabel={label}
        accessibilityRole="switch"
        accessibilityState={{ checked, disabled }}
      />
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
    </View>
  );
}

export type EdsSwitch = typeof Switch;
export const EdsSwitch = Switch;
