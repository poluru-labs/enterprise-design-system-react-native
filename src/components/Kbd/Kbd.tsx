import { type ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type KbdProps = {
  children: ReactNode;
  style?: object;
};

export function Kbd({ children, style }: KbdProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();

  return (
    <Text
      accessibilityLabel={typeof children === 'string' ? `Keyboard ${children}` : 'Keyboard shortcut'}
      style={[
        styles.root,
        {
          backgroundColor: colors.bg,
          borderColor: colors.borderStrong,
          color: colors.text,
          paddingHorizontal: spacing[1],
          borderRadius: radius.sm,
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize.xs,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
});

export type EdsKbd = typeof Kbd;
export const EdsKbd = Kbd;
