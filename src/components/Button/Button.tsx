import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import type { EdsIconName } from '../../icons/names';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';

export type EdsButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type EdsButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  variant?: EdsButtonVariant;
  size?: EdsButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: EdsIconName | '';
  iconTrailing?: EdsIconName | '';
  iconOnly?: boolean;
  accessibleLabel?: string;
  disabled?: boolean;
  onPress?: () => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const HEIGHT: Record<EdsButtonSize, number> = { sm: 32, md: 40, lg: 48 };
const PAD_H: Record<EdsButtonSize, number> = { sm: 12, md: 16, lg: 20 };
const FONT: Record<EdsButtonSize, number> = { sm: 14, md: 16, lg: 18 };

function iconSize(size: EdsButtonSize): 'sm' | 'md' {
  return size === 'sm' ? 'sm' : 'md';
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon = '',
  iconTrailing = '',
  iconOnly = false,
  accessibleLabel,
  disabled = false,
  onPress,
  children,
  style,
  testID,
}: ButtonProps) {
  const theme = useOptionalTheme();
  const { colors, radius, typography } = theme;
  const isDisabled = disabled || loading;

  const label =
    iconOnly
      ? accessibleLabel || (typeof children === 'string' ? children : undefined) || icon || 'Button'
      : accessibleLabel || (typeof children === 'string' ? children : undefined);

  const bg =
    variant === 'primary'
      ? colors.primary
      : variant === 'danger'
        ? colors.danger
        : variant === 'secondary'
          ? colors.surface
          : 'transparent';

  const borderColor =
    variant === 'secondary' ? colors.borderStrong : variant === 'tertiary' ? 'transparent' : bg;

  const textColor =
    variant === 'primary' || variant === 'danger' ? colors.textInverse : colors.text;

  const iconColor = textColor;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={() => {
        if (isDisabled) return;
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: HEIGHT[size],
          paddingHorizontal: iconOnly ? 0 : PAD_H[size],
          width: iconOnly ? HEIGHT[size] : fullWidth ? '100%' : undefined,
          height: iconOnly ? HEIGHT[size] : undefined,
          borderRadius: radius.md,
          backgroundColor: bg,
          borderColor,
          borderWidth: variant === 'secondary' ? 1 : 0,
          opacity: isDisabled ? 0.55 : pressed ? 0.88 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : icon ? (
        <Icon name={icon} size={iconSize(size)} color={iconColor} />
      ) : null}
      {!iconOnly && children != null ? (
        <Text
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: FONT[size],
            fontWeight: typography.fontWeight.semibold,
            color: textColor,
          }}
        >
          {children}
        </Text>
      ) : null}
      {!loading && !iconOnly && iconTrailing ? (
        <View>
          <Icon name={iconTrailing} size={iconSize(size)} color={iconColor} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});

export type EdsButton = typeof Button;
export const EdsButton = Button;
