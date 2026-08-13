import type { TextStyle, ViewStyle } from 'react-native';
import type { EdsThemeValue } from '../../theme';

export type EdsFieldSize = 'sm' | 'md' | 'lg';

export const FIELD_HEIGHT: Record<EdsFieldSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

export const FIELD_PAD_H: Record<EdsFieldSize, number> = {
  sm: 10,
  md: 12,
  lg: 14,
};

export const FIELD_FONT: Record<EdsFieldSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

export function fieldRootStyle(theme: EdsThemeValue): ViewStyle {
  return {
    width: '100%',
    gap: theme.spacing[1],
  };
}

export function fieldLabelStyle(theme: EdsThemeValue): TextStyle {
  return {
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  };
}

export function fieldHintStyle(theme: EdsThemeValue): TextStyle {
  return {
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textMuted,
  };
}

export function fieldErrorStyle(theme: EdsThemeValue): TextStyle {
  return {
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.danger,
  };
}

export function fieldControlStyle(
  theme: EdsThemeValue,
  opts: {
    size?: EdsFieldSize;
    invalid?: boolean;
    disabled?: boolean;
  } = {},
): ViewStyle {
  const size = opts.size ?? 'md';
  return {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: FIELD_HEIGHT[size],
    paddingHorizontal: FIELD_PAD_H[size],
    gap: theme.spacing[2],
    backgroundColor: opts.disabled ? theme.colors.bg : theme.colors.surface,
    borderWidth: 1,
    borderColor: opts.invalid ? theme.colors.danger : theme.colors.border,
    borderRadius: theme.radius.md,
    opacity: opts.disabled ? 0.6 : 1,
  };
}

export function fieldInputTextStyle(
  theme: EdsThemeValue,
  size: EdsFieldSize = 'md',
): TextStyle {
  return {
    flex: 1,
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: FIELD_FONT[size],
    color: theme.colors.text,
    paddingVertical: 0,
    margin: 0,
  };
}
